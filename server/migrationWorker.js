const fb = require('../db/liveClassroom')
const { db } = require('../db/mainDb')
const main = require('../db/mainDb')

const fbClassToPgObj = function(classObj) {
  const classId = classObj.id
  const { name, quizzes, students, teacher_id, subject_id } = classObj

  // save quizzes into submitted quizzes
  
    // for each quiz, associate student responses with questions and answers
        // save questions into submitted questions
            // save answers into submitted answers
               // save responses into students_responses



}

// Need to create studentResponsens obj for each quiz that includes studentId and responses
// removed teacherID for reasons
const submitQuiz = function(quizObj, studentResponses, classId) {

  console.log(quizObj)

  const questions = quizObj.questions;
  const quizName = quizObj.name;
  const prevQuizId = quizObj.id;
  const quizWeight = quizObj.weight;
  const quizSubject = quizObj.subject
  const quizDuration = quizObj.duration
  const quizTime = quizObj.time
  const subjectId = 1

  let submittedQuizId

  // Add back TIME AND DURATION !!!
  return db.query(
    `INSERT INTO submitted_quizzes (name, subject_id, weight, previous_id, class_id) 
    VALUES ('${quizName}', '${subjectId}', '${quizWeight}', ${prevQuizId}, ${classId}) RETURNING id;`)
  .then((submittedQuiz) => {
    submittedQuizId = submittedQuiz.rows[0].id
    return Promise.all(Object.values(questions).map((each, index) => {
      // ADD QUIZ ID w/ SUBMITTED QUIZ ID '${submittedQuizId}', position w/ '${each.position}'
      return db.query(
        `INSERT INTO submitted_questions (question, previous_id, subject_id) 
        VALUES ('${each.question}', '${each.id}', '${subjectId}' ) RETURNING id, previous_id;`)
      .catch((err) => {
        if (err) throw err
      })
    }))
  })
  .then((submittedQuestions) => {
    return Promise.all(submittedQuestions.map((question, index) => {
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
        console.log(' ------> GOT THERE!')

        let answerMapper = {}

        submittedAnswers.forEach(submittedAnswer => {
          answerMapper[submittedAnswer.previousAnswerId] = {newId: submittedAnswer.id, isCorrect: submittedAnswer.correct}
        })
        return Promise.all(Object.values(studentResponses).map(student => {
          let responseForThisQuestion = student.responses[question.previous_id]
          let studentsAnswer = answerMapper[Object.keys(responseForThisQuestion.answers).find(key => responseForThisQuestion.answers[key] === true)]

          return db.query(
          `INSERT INTO students_responses (student_id, response_id, question_id, draft_question_id, time_spent, correct) 
          VALUES ($1, $2, $3, $4, $5, $6)`, [student.studentId, studentsAnswer.newId, question.previous_id, responseForThisQuestion.time, studentsAnswer.isCorrect])
        }))
      })
    })
  )})
}

var QUIZOBJ = {  
  "id":8,
  "name":"Test",
  "weight":10,
  "duration": 900000,
  "time": 12345,
  "questions": {
    9: {
      answers: {
        16: {
          id: 16,
          isCorrect: true,
          text: '1'
        },
        17: {
          "id" : 17,
          "isCorrect" : false,
          "text" : "2"
        }
      },
      draft_question_id: 9,
      id: 9,
      position: 0,
      text: 'test'
    },
    10: {
      answers: {
        "18" : {
          "id" : 18,
          "isCorrect" : false,
          "text" : "3"
        },
        "19" : {
          "id" : 19,
          "isCorrect" : true,
          "text" : "1"
        }
      },
      draft_question_id: 9,
      id: 9,
      position: 0,
      text: 'test'
      }
    }
  }

var RESPONSES = {
    1: {
      "studentId": 1,
      "responses" : {
        "9" : {
          "answers" : {
            "16" : true,
            "17" : false
          },
          "id" : "9",
          "time" : 100
        },
        "10" : {
          "answers" : {
            "18" : false,
            "19" : true
          },
          "id" : "10",
          "time" : 100
        }
      }
    }
  }

// submitQuiz(QUIZOBJ, RESPONSES, 1, 1)

  // .then(() => {
  //   console.log('teacherId, subjectId for refetching quizzes', teacherId, subjectId)
  //   return getQuizzes(teacherId, subjectId)
  // })



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
    SELECT students.id, students.first_name, students.last_name, students.email 
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
        quizzes: {}
      }
    })
    return classObj
  }))
}

const migrateClassToFB = function(classId){
  main.fetchClass(classId)
  .then(classRow => {
    console.log(classRow[0])
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
}