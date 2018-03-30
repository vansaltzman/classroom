const fb = require('../db/liveClassroom')
const { db } = require('../db/mainDb')
const main = require('../db/mainDb')

const fbClassToPgObj = function(classObj) {
  const classId = classObj.id
  const { name, quizzes, students, teacher_id, subject_id } = classObj

  Object.keys(quizzes).forEach(quizId => {

    responsesObj = {}

    students.forEach(student => {
      studentObj = {}
      studentObj.id = student.id
      studentObj.responses = student.quizzes[quizId].responses
      responsesObj[student.id] = studentObj
    })

    submitQuiz(quizzes[quizId], responsesObj, classId)
    // submitParticipation()
  })
}

// Need to create studentResponsens obj for each quiz that includes studentId and responses
// removed teacherID for reasons
const submitQuiz = function(quizObj, studentResponses, classId) {

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
      `INSERT INTO submitted_quizzes (name, subject_id, weight, previous_id, class_id, time, duration) 
      VALUES ('${quizName}', '${subjectId}', '${quizWeight}', ${prevQuizId}, ${classId}, ${quizDuration}, ${quizTime}) RETURNING id;`)
    .then((submittedQuiz) => {
      submittedQuizId = submittedQuiz.rows[0].id
      return Promise.all(Object.values(questions).map((each, index) => {
        return db.query(
          `INSERT INTO submitted_questions (question, previous_id, subject_id, quiz_id, position) 
          VALUES ('${each.question}', '${each.id}', '${subjectId}', '${submittedQuizId}', '${each.position}') RETURNING id, previous_id;`)
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
  })
}

fb.fb.ref('/classes/1').once('value')
.then(snap=> {
  console.log('snap.val() ------> ', snap.val())
  return fbClassToPgObj(snap.val())
})
.then(()=> {
  console.log('done')
})