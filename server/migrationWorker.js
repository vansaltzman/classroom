const fb = require('../db/liveClassroom')
const { db } = require('../db/mainDb')
const main = require('../db/mainDb')

const fbClassToPgObj = function(classObj) {
  const classId = classObj.id
  const { name, quizzes, students, teacher_id, subject_id } = classObj
  return submitParticipation(classId, students)
  .then(()=> {
    if (quizzes) {
      return Promise.all(Object.keys(quizzes).map(quizId => {
    
        responsesObj = {}
        
        Object.values(students).forEach(student => {
            studentObj = {}
            studentObj.id = student.id   
            studentObj.responses = student.quizzes[quizId].responses
            responsesObj[student.id] = studentObj
        })
    
      
        return submitQuiz(quizzes[quizId], responsesObj, classId)
      }))
    }
  })
  // .then(()=> {
  //   return updateQuestionTimes()
  // })
}

const submitParticipation = function(classId, students) {
  return Promise.all(Object.values(students).map(student=> {
    let newParticipation = student.participation || 0
    return db.query(
      `UPDATE classes_students SET participation = participation + $1 WHERE class_id = $2 AND student_id = $3 RETURNING participation`, 
      [newParticipation, classId, student.id])
  }))
}


const submitQuiz = function(quizObj, studentResponses, classId) {
  console.log('Submit Quiz for: ', quizObj.name)

  const prevQuizId = quizObj.id;
  const quizName = quizObj.name;
  const questions = quizObj.questions;
  const quizDuration = quizObj.quizDuration
  const quizSubject = quizObj.subject
  const quizTime = quizObj.time
  const quizWeight = quizObj.weight;
  
  let subjectId
  let submittedQuizId

  return db.query(`SELECT id FROM subjects WHERE name=$1`, [quizObj.subject])
  .then((subjectData)=> {
    subjectId = subjectData.rows[0].id
    return db.query(
      `INSERT INTO submitted_quizzes (name, subject_id, weight, previous_id, class_id, duration, time) 
      VALUES ('${quizName}', '${subjectId}', '${quizWeight}', ${prevQuizId}, ${classId}, ${quizDuration}, ${quizTime}) RETURNING id;`)
    .then((submittedQuiz) => {
      submittedQuizId = submittedQuiz.rows[0].id
      return Promise.all(Object.values(questions).map((each, index) => {
        console.log('each ------> ', each)
        return db.query(
          `INSERT INTO submitted_questions (question, previous_id, subject_id, quiz_id, position) 
          VALUES ('${each.text}', '${each.id}', '${subjectId}', '${submittedQuizId}', '${each.position}') RETURNING id, previous_id;`)
      }))
    })
    .then((submittedQuestions) => {
      return Promise.all(Object.values(submittedQuestions).map((question, index) => {
        question = question.rows[0]
          return Promise.all(Object.values(questions[question.previous_id].answers).map(answer => {
            return db.query(
              `INSERT INTO submitted_answers (answer, question_id, correct) 
              VALUES ($1, $2, $3) RETURNING id, question_id, correct`, [answer.text, question.id, answer.isCorrect])
              .then(queryResponse=> {
                let subAnswer = queryResponse.rows[0]
                subAnswer.previousAnswerId = answer.id
                return subAnswer
              }) 
          }))
        .then(submittedAnswers => {
          let answerMapper = {}
  
          submittedAnswers.forEach(submittedAnswer => {
            answerMapper[submittedAnswer.previousAnswerId] = {newId: submittedAnswer.id, isCorrect: submittedAnswer.correct}
          })

          return Promise.all(Object.values(studentResponses).map(student => {
            let responseForThisQuestion = student.responses[question.previous_id]
            let studentsAnswer = answerMapper[Object.keys(responseForThisQuestion.answers).find(key => responseForThisQuestion.answers[key] === true)] || {newId: null, isCorrect: false}
            responseForThisQuestion.time = responseForThisQuestion.time || null
            return db.query(
            `INSERT INTO students_responses (student_id, response_id, question_id, draft_question_id, time_spent, correct) 
            VALUES ($1, $2, $3, $4, $5, $6)`, [student.id, studentsAnswer.newId, question.id, question.previous_id, responseForThisQuestion.time, studentsAnswer.isCorrect])
          }))
        })
      }))
    })
  })
}

// Converts a class in postgress to a sql obj
const psqlClassToFbObj = function(sqlClass) {
  var classObj = {[sqlClass.id]: {
    id: sqlClass.id,
    name: sqlClass.name, 
    subject: sqlClass.subject,
    teacher: {
        id: sqlClass.teacher_id,
        name: `${sqlClass.first_name} ${sqlClass.last_name}`,
        email: sqlClass.email
      }, 
    students: {}
    }
  }


  // FIX: Consider doing this outise of this function

  // Gets student information for this class from db
  return db.query(`
    SELECT students.id, students.first_name, students.last_name, students.email, students.thumbnail_url 
    FROM students INNER JOIN classes_students 
    ON students .id = classes_students.student_id 
    WHERE classes_students.class_id=$1;`, [sqlClass.id]
  ).then((students => {

    students.rows.forEach(student => {
      classObj[sqlClass.id].students[student.id.toString()] = {
        name: `${student.first_name} ${student.last_name}`,
        isInClassroom: false,
        activeView: 'lobby',
        email: student.email,
        thumbnail: student.thumbnail_url,
        quizzes: {}
      }
    })
    return classObj
  }))
}

const migrateClassToFB = function(classId){
  main.fetchClass(classId)
  .then(classRow => {
    return psqlClassToFbObj(classRow[0])
  })
  .then(fbObj => {
    const classId = sqlClass.id
    const classList = fb.ref('/classes/' + classId) 
    return classList.push(fbObj)
  })
  .then(()=> console.log('Launched claass ' + sqlClass.name))
  .catch((err)=> console.log('Issue starting class' + err))
}

module.exports = {
  migrateClassToFB, 
  fbClassToPgObj,
}