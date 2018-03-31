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


const submitQuiz = function(quizObj, studentResponses, classId) {
  const teacherId = quizObj.authorId;
  const questions = quizObj.quiz.questions;
  const quizName = quizObj.quiz.name;
  const prevQuizId = quizObj.quiz.id;
  const quizWeight = quizObj.quiz.weight;
  const subjectId = quizObj.quiz.subject.sub.id;
  const subjectName = quizObj.quiz.subject.sub.name;
  let quizId

  return db.query(`INSERT INTO submitted_quizzes (name, subject_id, teacher_id, weight, previous_id, class_id) VALUES ('${quizName}', '${subjectId}', '${teacherId}', '${weight}', ${prevQuizId}, ${classId}) RETURNING id;`)
  .then((submittedQuiz) => {
    quizId = submitQuiz.rows[0].id
    return Promise.all(questions.map((each, index) => {
      //console.log('each question', each)
      return db.query(`INSERT INTO submitted_questions (question, teacher_id, previous_id, subject_id) VALUES ('${each.question}', '${teacherId}', '${question.id}', '${subjectId}' RETURNING id);`)
      .catch((err) => {
        if (err) throw err
      })
    }))
  })
  .then((submittedQuestions) => {
    return Promise.all(submittedQuestions.map((question, index) => {
      //console.log('each questions to join table', each)
      return db.query(`INSERT INTO submitted_quizzes_submitted_questions (submitted_quiz_id, submitted_question_id, position) 
                VALUES ('${quizId}', '${question.rows[0]}', '${index}')`)
      .catch((err) => {
        if (err) throw err
      })   
    }))
  })
  .then((submittedQuestions) => {
    console.log(questions )
    return Promise.all((questions.map((q, i) => {
      return Promise.all(q.answers.map((answer, j) => {
        return db.query(`INSERT INTO draft_answers (answer, question_id, correct) VALUES
                ('${answer.text}', (SELECT id FROM draft_questions WHERE question='${q.question}'), '${answer.isCorrect}');`) 
      }))
    })))
  })
  // .then(() => {
  //   console.log('teacherId, subjectId for refetching quizzes', teacherId, subjectId)
  //   return getQuizzes(teacherId, subjectId)
  // })
  .catch((err) => {
    if (err) throw err;
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