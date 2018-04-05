const { Pool, Client } = require('pg');
const pg = require('pg');
const schema = require('./classroom.js')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv');
const {error} = dotenv.config();
//const migrate = require('../data/studentsQuizDataMigratedFromFB.js')

// const connectionString = process.env.DATABASE_URL || 'postgres:postgress//localhost:5432/classroom';
// console.log('process db ',process.env.PG_USER)
// const db = new Pool({
  //   // user: process.env.PG_USER,
  //   database: process.env.PG_DB,
  //   host: 'localhost',
  //   password: null,
  //   port: 5432,
  // })
// const connectionString = 'jaqen-rds-postgres.cw0klusijyxh.us-east-2.rds.amazonaws.com';

const db = new Pool({
  user: process.env.PG_USER,
  database: process.env.database,
  host: process.env.host,
  password: process.env.password,
  port: process.env.port,
})

db.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
})

db.connect().then((client)=> {
  return client.query(schema)
  .then(res => {
    client.release()
    console.log('created classroom tables')
  })
  .catch(err => {
    client.release()
    console.log('oops!', err.stack)
  })
})
.catch((error)=> {
  console.log('error connecting to db ', error)
})


const addUser = function(firstName, lastName, email, password, userClass) {
  let userclass = userClass === 'teacher' ? 'teachers' : 'students'

  const salt = 10;
  return bcrypt.hash(password, salt)
    .then((hash)=> {
      
      var client
      
      return db.connect().then(newClient => {
        client = newClient

        return client.query(`SELECT * FROM ${userclass} WHERE email=$1`, [email])
        .then(res => {
          if (res.rowCount) {
            return 'User already exists'
          } else {
            return client.query(
              `INSERT INTO ${userclass} (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)`, 
              [firstName, lastName, email, hash]
            )
          }
        })
      })
      .then(output => {
        client.release()
        return output
      })
    })
    .catch((err) => {
      console.log('Issue with password hashing', err)
    })
}

const verifyUser = function(email, password) {

  // Check if user is a teacher
  return db.query(`SELECT * FROM teachers WHERE email=$1`, [email])
  .then((teacherSearch) => {
    if (teacherSearch.rowCount > 0) {
      return {class: 'teacher', user: teacherSearch}
    } else {

  // Check if user is a student
     return db.query(`SELECT * FROM students WHERE email=$1`, [email])
      .then((studentSearch) => {
        if (studentSearch.rowCount > 0) {
          return {class: 'student', user: studentSearch}
        } else {
          return null
        }
      })
    }
  })
  .then((res)=> {
    if (res) {
      let user = res.user.rows[0]
      
    return bcrypt.compare(password, user.password)
      .then(auth => {
        if (auth) {
          return {class: res.class, id: user.id, pic: user.thumbnail_url}
        } else {
          return false
        }
      })
    } else {
      return false
    }
  })
}

const fetchClass = function(classId) {
  return db.query(`
  SELECT classes.id, classes.name, teachers.first_name, teachers.last_name, teachers.email, teachers.id as teacher_id, subjects.name as subject 
  FROM classes, teachers, subjects WHERE classes.id=$1;`, [classId])
  .then(res => {
    return res.rows
  })
  .catch(err => {
    console.log('Issue fetching class from MainDb', err)
  })
}

const fetchQuizTemplates = function(teacherId) {
  return db.query(
    `SELECT * FROM draft_quizzes WHERE teacher_id=$1`, [teacherId]
  )
  .then(quizzes => {
    return Promise.all(quizzes.rows.map(quiz => {
      db.query(`SELECT * FROM draft_quizzes_draft_questions INNER JOIN draft_questions .id ON draft_quizzes_draft_questions.draft_question_id WHERE draft_quizzes_draft_questions.draft_quiz_id=$1`, [quiz.id])
    }))
  })
}

/**************** INSERTING CLASS INTO POSTGRESQL ****************/
const addNewClass = function(classObj) {
  //console.log('database side', classObj)
  //const params = []
  const checkSubjectQuery = `SELECT * FROM subjects WHERE name='${classObj.subject}';`
  return db.query(checkSubjectQuery)
  .then((count) => {
    console.log('count', count);
    if (count.rowCount === 0) {
      return db.query(`INSERT INTO subjects (name) VALUES ('${classObj.subject}')`)
    }
  })
  .then(() => {
    const queryString = `INSERT INTO classes (name, teacher_id, subject_id, year, quarter, thunmbnail)
                       VALUES ('${classObj.classname}', (SELECT id FROM teachers WHERE email='${classObj.email}'),
                       (SELECT id FROM subjects WHERE name='${classObj.subject}'), '${classObj.year}', '${classObj.quarter}', '${classObj.thumbnail}')`
    //console.log(queryString);
    return db.query(queryString)
  })
  .then(() => {
    return getClassesForTeacherMainView(classObj.email)
  })
  .catch((err)=> console.log(err))
  
}

const getNewAddedClass = function(email, classname) {
  console.log('email', email, 'classname', classname)
  const teacherIdqueryString = `SELECT id FROM teachers WHERE email='${email}'`;
  return db.query(teacherIdqueryString)
  .then((data) => {
    const teacherId = data.rows[0].id;
    const queryStringForClasses = `SELECT * FROM classes WHERE teacher_id='${teacherId}' AND name='${classname}';`
    return db.query(queryStringForClasses)
    console.log('teacher id data', data.rows[0].id);
  })
}

const getClassesForTeacherMainView = function(email) {
  const teacherIdqueryString = `SELECT id FROM teachers WHERE email='${email}'`;
  return db.query(teacherIdqueryString)
  .then((data) => {
    const teacherId = data.rows[0].id;
    const queryStringForClasses = 
    `SELECT classes.id as id, subjects.id as subject_id, teachers.id as teacher_id, classes.name, 
    teachers.first_name, teachers.last_name, classes.thunmbnail, classes.year, classes.quarter 
    FROM classes INNER JOIN teachers ON classes.teacher_id = teachers.id 
    INNER JOIN subjects ON subjects.id = classes.subject_id WHERE teacher_id='${teacherId}';`
    return db.query(queryStringForClasses)
    .then(classes => {
      return classes.rows.map(eachClass => {
        eachClass.teacher = eachClass.first_name + ' ' + eachClass.last_name
        return eachClass
      })
    })
  })
}

const getAllStudents = function() {
  const queryString= `SELECT * FROM students`;
  return db.query(queryString)
}

const getAllStudentsBelongToAClass = function(classId) {
  const queryString = `SELECT students.id, students.first_name, students.last_name, students.email, students.thumbnail_url
                       FROM students INNER JOIN classes_students ON students.id = classes_students.student_id
                       WHERE classes_students.class_id='${classId}'`
  return db.query(queryString);
}

const addStudentToAClass= function(classId, studentId) {
  const queryString = 
  `INSERT INTO classes_students (class_id, student_id) VALUES ('${classId}', '${studentId}');`
  return db.query(queryString)
  .then(() => {
    console.log('class Id to fetch student', classId)
    return getAllStudentsBelongToAClass(classId)
  })
}

const getClassesBelongToAStudent = function(studentEmail) {
  const studentIdQueryString = `SELECT id FROM students WHERE email='${studentEmail}';`
  return db.query(studentIdQueryString)
  .then((data) => {
    const studentId = data.rows[0].id;
    const queryStringForClasses = `SELECT * FROM classes INNER JOIN classes_students 
                                   ON classes.id = classes_students.class_id 
                                   WHERE classes_students.student_id='${studentId}';`
    return db.query(queryStringForClasses);
  })
}

const getAllExistingSubjects = function() {
  const queryString = `SELECT * FROM subjects`;
  return db.query(queryString);
}

const addQuiz = function(quizObj) {
  const teacherId = quizObj.authorId;
  const questions = quizObj.quiz.questions;
  const quizName = quizObj.quiz.name;
  const subjectId = quizObj.quiz.subject.sub.id;
  const subjectName = quizObj.quiz.subject.sub.name;
  let quizId 
  return db.query(`INSERT INTO draft_quizzes (name, subject_id, teacher_id) VALUES ('${quizName}', '${subjectId}', '${teacherId}') RETURNING *;`)
  .then((data) => {
    quizId = data.rows[0].id
    return quizId
  })
  .then((data) => {
    return Promise.all(questions.map((each, index) => {
      if (each.id) {
        return db.query(`UPDATE draft_questions SET question='${each.question}' WHERE id='${each.id}' RETURNING *;`)
        .then((data) => {
          each.id = data.rows[0].id
          return each
        })
      } else {
        return db.query(`INSERT INTO draft_questions (question, teacher_id, subject_id) VALUES ('${each.text}', '${teacherId}', '${subjectId}') RETURNING *;`)
        .then((data) => {
          each.id = data.rows[0].id
          return each
        })
      }
    }))
  })
  .then(() => {
    console.log('Did we get here ai all???')
    return Promise.all(questions.map((each, index) => {
      // console.log('each questions with id to join table', each) //at this point we have the questions with id
      return db.query(`INSERT INTO draft_quizzes_draft_questions (draft_quiz_id, draft_question_id, position) 
                VALUES ('${quizId}', '${each.id}', '${index}');`) 
      .then(() => {
        return each
      })
    }))
  })
  .then((data) => {
    // console.log('dataaaaaa after draft_quizzes_draft_questions', data)
    return Promise.all((data.map((q, i) => {
      return Promise.all(q.answers.map((answer, j) => {
        if (answer.id) {
          return db.query(`UPDATE draft_answers SET answer='${answer.answer}', correct='${answer.correct}' WHERE id='${answer.id}' AND question_id='${answer.question_id}'`)
        } else {
          return db.query(`INSERT INTO draft_answers (answer, question_id, correct) VALUES
                ('${answer.text}', '${q.id}', '${answer.isCorrect}');`) 
        }
      }))
    })))
  })
  .then(() => {
    return getQuizzes(teacherId, subjectId)
  })
  .catch((err) => {
    if (err) throw err;
  })
}

const getQuizzes = function(teacherId, subjectId) {
  // console.log('teacherId, subjectId ------> ', teacherId, subjectId)
  return db.query(`SELECT draft_quizzes.name, draft_quizzes.id, subjects.name as subject FROM draft_quizzes INNER JOIN subjects ON draft_quizzes.subject_id = subjects.id WHERE teacher_id='${teacherId}' AND subject_id='${subjectId}'`)
  .then((data) => {
    const quizzes = data.rows.map((quiz) => {
      return {
        name: quiz.name,
        id: quiz.id,
        subject: quiz.subject
      }
    })
    return quizzes;
  })
  .then((data) => {
    return Promise.all(data.map((eachQuiz, index) => {
        return db.query(`SELECT * FROM draft_questions INNER JOIN draft_quizzes_draft_questions
                       ON draft_questions.id = draft_quizzes_draft_questions.draft_question_id 
                       AND draft_quizzes_draft_questions.draft_quiz_id = '${eachQuiz.id}'`)
        .then((questions) => {
          eachQuiz.questions = {}

          questions.rows.forEach(question=> {
            let formattedQuestion = {}
            formattedQuestion.id = question.draft_question_id
            formattedQuestion.text = question.question
            formattedQuestion.position = question.position
            formattedQuestion.draft_question_id = question.draft_question_id
           
            eachQuiz.questions[question.draft_question_id] = formattedQuestion
          })
          return eachQuiz
        })
      }))
  })
  .then((data) => {
    return Promise.all(data.map((eachQuiz) => {
      return Promise.all(Object.keys(eachQuiz.questions).map((eachQuestionId) => {
        let eachQuestion = eachQuiz.questions[eachQuestionId]
        return db.query(`SELECT * FROM draft_answers WHERE question_id = '${eachQuestion.draft_question_id}'`)
        .then((answers) => {
          eachQuestion.answers = {}

          answers.rows.forEach(answer=> {
            let formattedAnswer = {}
            formattedAnswer.id = answer.id
            formattedAnswer.text = answer.answer
            formattedAnswer.isCorrect = answer.correct

            eachQuestion.answers[answer.id] = formattedAnswer
          })
          return eachQuestion
        })
      }))
      .then((questions) => {
        eachQuiz.questions = questions
        return eachQuiz
      })
    }))
  })
}
const addProfilePictureForStudent = function (studentId, url) {
  const queryString = `UPDATE students SET thumbnail_url = '${url}' WHERE id=${studentId}`
  return db.query(queryString)
}

const getProfilePic = function (userId) {
  const queryString = `SELECT thumbnail_url FROM students WHERE id=${userId}`
  return db.query(queryString)
}

const GetAllQuestionsBelongToTeacher = function(teacherId, subjectId) {
  return db.query(`SELECT * FROM draft_questions WHERE teacher_id='${teacherId}' AND subject_id='${subjectId}'`)
  .then((data) => {
    return Promise.all(data.rows.map((eachQuestion) => {
      return db.query(`SELECT * FROM draft_answers WHERE question_id='${eachQuestion.id}'`)
      .then((eachAnswer) => {
        eachQuestion.answers = eachAnswer.rows
        return eachQuestion
      })
    }))
  })
}
// const calculateAverageTimeForQuestions = function(classFromFB) {
//   const studentsAndTheirResponses = classFromFB[1].students.slice(1);
//   for (var i = 0; i < studentsAndTheirResponses.length; i++) {
//     const eachStudentQuiz = Object.values(studentsAndTheirResponses[i].quizzes)[0];
//     const questionsFromEachQuiz = eachStudentQuiz.questions.slice(1) //array of question objs...each question has
  

//   }
// }

const getQuizDataForStudentInClass = function(studentId, classId) {
  return db.query(`SELECT * FROM submitted_quizzes WHERE class_id='${classId}'`)
  //getting all submitted quizzes for a given class
  .then((quizzes) => {

    const constructedQuizzes = quizzes.rows.map((quiz) => {
      return {
        name: quiz.name,
        id: quiz.id,
        previousId: quiz.previous_id, 
        weight: quiz.weight,
        time: quiz.time,
        duration: quiz.duration,
        subjectId: quiz.subject_id,
        classId: quiz.class_id
      }
    })
    return constructedQuizzes;
    //returning formatted array of quizzes (ie, no longer has 'anonymous' in data)
  })
  .then((constructedQuizzes) => {
    return Promise.all(constructedQuizzes.map((eachQuiz) => {
      return db.query(`SELECT * FROM submitted_questions WHERE quiz_id = '${eachQuiz.id}'`)
      // for each submitted quiz, get all of its questions
      .then((questions) => {
        eachQuiz.questions = {}
          questions.rows.forEach(question=> {
            let formattedQuestion = {}
            formattedQuestion.id = question.id
            formattedQuestion.text = question.question
            formattedQuestion.position = question.position
            formattedQuestion.previousId = question.previous_id
            formattedQuestion.subjectedId = question.subject_id
            formattedQuestion.quizId = question.quiz_id
            eachQuiz.questions[question.id] = formattedQuestion
          })
          return eachQuiz
      })
    }))
  })
  .then((quizzesWithQuestions) => {
    return Promise.all(quizzesWithQuestions.map((eachQuiz) => {
      return Promise.all(Object.keys(eachQuiz.questions).map((eachQuestionId) => {
        // for each question of the quiz, get all of its associated answers (without student responses yet)
        let eachQuestion = eachQuiz.questions[eachQuestionId]
        return db.query(`SELECT * FROM submitted_answers WHERE question_id = '${eachQuestion.id}'`)
        .then((answers) => {
          eachQuestion.answers = {}
          answers.rows.forEach(answer=> {
            let formattedAnswer = {}
            formattedAnswer.id = answer.id
            formattedAnswer.text = answer.answer
            formattedAnswer.isCorrect = answer.correct
            eachQuestion.answers[answer.id] = formattedAnswer
          })
          //return array of questions with their associated answers as a key
          return eachQuestion
        })
      }))
      .then((questions) => {
        eachQuiz.questions = questions
        // put the questions object into each quiz's object
        return eachQuiz
      })
      .then((eachQuiz)=> {
        return db.query(`SELECT * FROM students_responses WHERE student_id='${studentId}'`)
        // get all responses for a given student
        .then((submittedQuestions) => {
          eachQuiz.responses = {};
          submittedQuestions.rows.forEach((eachSubmittedQuestion) => {
            // iterate through all students submitted answers
            eachQuiz.questions.forEach((quizQuestion) => {
              //then iterate through all of our questions
              if (quizQuestion.id === eachSubmittedQuestion.question_id) {
                // if a student's answer's question ID matches one of ones in our quizzes
                  // created a formatted responses object
                let submittedResponse = {}
                submittedResponse.studentQuestionSubmissionId = eachSubmittedQuestion.id;
                submittedResponse.studentId = studentId;
                submittedResponse.responseId = eachSubmittedQuestion.response_id;
                submittedResponse.questionId = eachSubmittedQuestion.question_id;
                submittedResponse.draftQuestionId = eachSubmittedQuestion.draft_question_id;
                submittedResponse.timeSpent = eachSubmittedQuestion.time_spent;
                submittedResponse.correct = eachSubmittedQuestion.correct;
                // add the formatted response object to each quiz, in the responses propery
                // with the question's id as its key
                eachQuiz.responses[eachSubmittedQuestion.question_id] = submittedResponse
              }
            })
          })
          return eachQuiz
        })
      })
    }))
    .then((allQuizzes)=> {
      return allQuizzes;
    })
  })
}

const getParticipationDataForClass = function (classId) {
  return db.query(`SELECT student_id, participation FROM classes_students WHERE class_id='${classId}'`)
  .then((classParticipationData)=> {
    return classParticipationData.rows
  })
}

module.exports = {
  addUser,
  verifyUser,
  fetchClass,
  db,
  addNewClass,
  getClassesForTeacherMainView,
  getAllStudents,
  getAllStudentsBelongToAClass,
  addStudentToAClass,
  getClassesBelongToAStudent,
  getAllExistingSubjects,
  addQuiz,
  getQuizzes,
  getNewAddedClass,
  GetAllQuestionsBelongToTeacher,
  // calculateAverageTimeForQuestions
  addProfilePictureForStudent,
  getProfilePic,
  getQuizDataForStudentInClass,
  getParticipationDataForClass
}

