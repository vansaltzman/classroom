var assert = require('assert')
var bcrypt = require('bcrypt')
var { db, addUser, verifyUser } = require('../../db/mainDb.js')

var testTeacher = ['Valerie', 'Frizzle', 'mfrizz@magic.bus', 'TheFriz']

var Ian = ['Ian', 'Culleton', 'ian@culleton.edu', 'ic', 'https://ca.slack-edge.com/T2SUXDE72-U2T8G8EBG-g1f6514741e4-1024']

const hashUser = function(user) {
  var hashedUser = user.slice()
  return bcrypt.hash(hashedUser[3], 10)
    .then(hash => {
      hashedUser[3] = hash
      return hashedUser
    })
}

const addFrizzle = function(){
  return db.query(`SELECT * FROM teachers WHERE email=$1`, [testTeacher[2]])
  .then(count => {
    if (!count.rowCount) {
      return hashUser(testTeacher)
    } else {
      return null
    }
  })
  .then(hashedTeacher=> {
    if (hashedTeacher) {
      return db.query('INSERT INTO teachers (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)', hashedTeacher)
    }
  })
  .catch(err => console.log('issue with add Frizzle', err))
}


const removeFrizzle = function(){
  return db.query('DELETE FROM teachers WHERE email=$1', [testTeacher[2]])
}

const addMagicSubj = function() {
  return db.query(`SELECT * FROM subjects WHERE name='Magic';`)
  .then(count => {
    if (!count.rowCount) {
      return db.query(`INSERT INTO subjects (name) VALUES ('Magic');`)
    }
  })
}

const addStudentsAndClass = function() {
  // create frizzle
  // return addFrizzle()
  // .then(()=> {
  //   // create subj
  //   console.log('create subj')
  //   return addMagicSubj()
  // })
  // .then(()=> {
  //   // create class
  //  console.log('create class')
  //  return db.query(
  //     `INSERT INTO classes (name, teacher_id, subject_id, year, quarter, thunmbnail) 
  //     VALUES ('Magic Class', (SELECT id FROM teachers WHERE email='mfrizz@magic.bus'), 
  //     (SELECT id FROM subjects WHERE name='Magic'), '2018', 'Second', 'https://pbs.twimg.com/media/Bp94a-sCYAAkzD2.jpg');`
  //   )
  // })
  // .then(()=> {
  //   console.log('create students')
    let students = [
      ['Alex', 'Chojnacki', 'alex@chojnacki.edu', '123456', 'https://ca.slack-edge.com/T2SUXDE72-U8T2T768J-ff19ab38e761-1024'],
  ['Adam', 'Mateo', 'adam@mateo.edu', '123456', 'https://ca.slack-edge.com/T2SUXDE72-U8RQ7MGE5-70a1dd9355d4-72'],
  ['Ara', 'Nguyen', 'pnn2104@columbia.edu', '123456', 'https://ca.slack-edge.com/T2SUXDE72-U8S8BEYRH-6e758aec7185-1024'],
  ['Alex', 'Levine', 'alex@levine.edu', '123456', 'https://ca.slack-edge.com/T2SUXDE72-U8U95JANT-d3bca22851de-1024'],
  ['Allegra', 'Bernt', 'allegra@bernt.edu', '123456', 'https://ca.slack-edge.com/T2SUXDE72-U8TARMP46-84a181a93cb8-1024'],
  ['Aloralyn', 'Ayran', 'aloralyn@ayran.edu', '123456', 'https://ca.slack-edge.com/T2SUXDE72-U8S8P4G0L-76e0fd21e9af-1024'],
  ['Artem', 'Ipatev', 'artem@ipatev.edu', '123456', 'https://ca.slack-edge.com/T2SUXDE72-U8SASLVU2-34e6dd2047b0-1024'],
  ['Brent', 'Hagen', 'brent@hagen.edu', '123456', 'https://ca.slack-edge.com/T2SUXDE72-U8S7EJTS5-51d2b1ca9e9c-1024'],
  ['Chris', 'Rigoli', 'chris@rigoli.edu', '123456', 'https://ca.slack-edge.com/T2SUXDE72-U8S8LAG3E-08b422a398bb-1024'],
  ['Danny', 'Schradder', 'danny@schradder.edu', '123456', 'https://ca.slack-edge.com/T2SUXDE72-U8TJ3S17H-263246e479e9-1024'],
  ['Eric', 'Shum', 'eric@shum.edu', '123456', 'https://ca.slack-edge.com/T2SUXDE72-U8SDYCA4V-g2eb5d2954d3-1024'],
  ['Eric', 'Sin', 'eric@sin.edu', '123456', 'https://ca.slack-edge.com/T2SUXDE72-U8SHLSSDA-fda524858669-72'],
  ['Jason', 'McCutchan', 'jason@mccutchan.edu', '123456', 'https://ca.slack-edge.com/T2SUXDE72-U80PX1BP0-be4c7667aeac-1024'],
  ['Jerry', 'Chen', 'jerry@chen.edu', '123456', 'https://ca.slack-edge.com/T2SUXDE72-U8T4BBVNX-9253ca8523c7-1024'],
  ['Jessica', 'Wolvington', 'jessica@wolvington.edu', '123456', 'https://ca.slack-edge.com/T2SUXDE72-U7YJFP31S-af78cf4945e0-1024'],
  ['Jonathan', 'Yuen', 'jonathan@yuen.edu', '123456', 'https://ca.slack-edge.com/T2SUXDE72-U6NJ6NK4N-b49a2c03419b-1024'],
  ['Joseph', 'Martin', 'joseph@martin.edu', '123456', 'https://ca.slack-edge.com/T2SUXDE72-U2T3QALT0-3821c198d16d-1024'],
  ['Juan', 'Galan', 'juan@galan.edu', '123456', 'https://ca.slack-edge.com/T2SUXDE72-U8SAGQ1E0-8fa5cea28518-1024'],
  ['Manos', 'Kourkoulakos', 'manos@kourkoulakos.edu', '123456', 'https://ca.slack-edge.com/T2SUXDE72-U8THWNSK0-21544b6b1142-1024'],
  ['Marcus', 'Hausler', 'marcus@hausler.edu', '123456', 'https://ca.slack-edge.com/T2SUXDE72-U8TB3KFU7-9e84b983487b-48'],
  ['Michael', 'Vasio', 'michael@vasio.edu', '123456', 'https://ca.slack-edge.com/T2SUXDE72-U8SE70G03-7663474c7ceb-1024'],
  ['Quentin', 'Vidal', 'quentin@vidal.edu', '123456', 'https://ca.slack-edge.com/T2SUXDE72-U8T1LQLJ1-1285c5e1534d-1024'],
  ['Riley', 'Alsman', 'riley@alsman.edu', '123456', 'https://ca.slack-edge.com/T2SUXDE72-U8SDC58Q5-f208966f2b35-1024'],
  ['Rory', 'Reagan', 'rory@reagan.edu', '123456', 'https://ca.slack-edge.com/T2SUXDE72-U8SLG0FJ5-3006f612815c-1024'],
  ['Xixi', 'Chen', 'xixi@chen.edu', '123456', 'https://ca.slack-edge.com/T2SUXDE72-U8T793GBC-fac7de6ce4d0-1024'],
  ['Yu Qing', 'Dong', 'yuqing@dong.edu', '123456', 'https://ca.slack-edge.com/T2SUXDE72-U8RNB3CGY-f5099ef9c3ed-1024']
]

    return Promise.all(students.map(student => {
      return hashUser(student)
      .then(hashedStudent => {
        // Add students
        return db.query('INSERT INTO students (first_name, last_name, email, password, thumbnail_url) VALUES ($1, $2, $3, $4, $5)', hashedStudent)
        .then(()=> {
          return hashedStudent
        })
        .catch(err => console.log(err))
      })
      .then(hashedStudent => {
        console.log('hashedStudent ------> ', hashedStudent)
        // Assign students to class
        return db.query(
          `INSERT INTO classes_students (class_id, student_id) 
          VALUES (2, (SELECT id FROM students WHERE email=$1));`, 
          [hashedStudent[2]])
      })
    }))
}



// const questions = [
//   ['What does CSS Stand for?', teacherId, subjId], 
//   ['What is the correct HTML for referring to an external stylesheet?', teacherId, subjId], 
//   ['What year did The Magic School Bus first air?', teacherId, subjId], 
//   ['How many flies are currently in the office?', teacherId, subjId], 
//   ['Who is the best house in GoT?', teacherId, subjId], 
// ]

// const answers = [
//   [['Function objects', false],
//     ['Scope where function’s variables are resolved', false],
//     ['Both Function objects and Scope where function’s variables are resolved', true],
//     ['None of the above', false],
//   ],
//   [['2010', false],['2012', true],['2014', false]],
//   [['1980', false],['1998', false],['1994', true],['1977', false],['1990', false]],
//   [['0', false],['Too many', true],],
//   [['Grey Joy', false],['Lanister', false],['Tyrell', false],['Stark', true],],
// ]
const addQuestions = function(questions, answers){
  // [text, teacherId, subjectId, avgTime = 0]
  let teacherId = 4;
  let subjId = 2;

  
      return Promise.all(questions.map((questionArr, questionIndx) => {
         return db.query(
          `INSERT INTO draft_questions (question, teacher_id, subject_id) 
          VALUES ($1, ${teacherId}, ${subjId}) RETURNING id;`, questionArr)
          .then(questionId=> {
            questionId = questionId.rows[0].id
            // add answers
            return Promise.all(answers[questionIndx].map(answer => {
              return db.query(`INSERT INTO draft_answers (answer, question_id, correct) VALUES
              ($1, ${questionId}, $2);`, answer)
            }))
            .then(()=> questionId)
          })
      }))
      .then(questionIds => {
        var returnObj = {questionIdArr: questionIds, teacherId: teacherId, subjId: subjId}
        return returnObj
      })
    }

const addQuiz = function({questionIdArr, teacherId, subjId}) {
  return db.query(
    `INSERT INTO draft_quizzes (name, subject_id, teacher_id) 
    VALUES ($1, $2, $3) RETURNING id`, ['Dummy Quiz', subjId, teacherId])
    .then(quizData=> {
      if (questionIdArr) {
       return Promise.all(questionIdArr.map((questionId, index) => {
         return db.query(
            `INSERT INTO draft_quizzes_draft_questions (draft_quiz_id, draft_question_id, position) 
            VALUES (${quizData.rows[0].id}, ${questionId}, '${index}');`, )
       }))
      }
    })
  }

const removeStudentsAndClass = function() {

  // Delete test items in reverse order so as to avoid foreign key errors

  return db.query(`DELETE FROM classes_students WHERE class_id=(SELECT id FROM classes WHERE name='Magic Class');`)
  .then(() => {
    return db.query(`DELETE FROM classes WHERE name='Magic Class';`)
  })
  .then(() => {
    return db.query(`DELETE FROM subjects WHERE name='Magic';`)
  })
  .then(() => {
    return db.query(`DELETE FROM students WHERE email LIKE '%magic.bus';`)
  })
}

//exports.removeData = removeStudentsAndClass;


exports.classMigration = function() {
  addStudentsAndClass().then(()=> {
    describe('Class Migration', function() {
      describe('from postgress', function() {
        it('should add a new teacher to the database', function(done) {

        })

        it('should the correct students to the database', function(done) {

        })

        it('should update the active view for students and teacher', function(done) {

        })
      })
    })
  })
}

exports.students = addStudentsAndClass
exports.addDummyData = addStudentsAndClass;
exports.addQuestions = addQuestions;
exports.addQuiz = addQuiz;
exports.removeDummyData = removeStudentsAndClass;