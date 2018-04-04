var assert = require('assert')
var bcrypt = require('bcrypt')
var { db, addUser, verifyUser } = require('../../db/mainDb.js')

var testTeacher = ['Valerie', 'Frizzle', 'mfrizz@magic.bus', 'TheFriz']

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
  return addFrizzle()
  .then(()=> {
    // create subj
    console.log('create subj')
    return addMagicSubj()
  })
  .then(()=> {
    // create class
   console.log('create class')
   return db.query(
      `INSERT INTO classes (name, teacher_id, subject_id, year, quarter, thunmbnail) 
      VALUES ('Magic Class', (SELECT id FROM teachers WHERE email='mfrizz@magic.bus'), 
      (SELECT id FROM subjects WHERE name='Magic'), '2018', 'Second', 'https://pbs.twimg.com/media/Bp94a-sCYAAkzD2.jpg');`
    )
  })
  .then(()=> {
    console.log('create students')
    let students = [
      ['Arnold', 'Perlstein', 'aperl@magic.bus', 'ap', 'https://vignette.wikia.nocookie.net/magicschoolbus/images/7/70/MSB_S1_E9_021.jpg/revision/latest/scale-to-width-down/260?cb=20170603223817'],
      ['Carlos', 'Ramon', 'cramo@magic.bus', 'cr', 'http://i0.kym-cdn.com/entries/icons/facebook/000/012/528/Naamloos-2.jpg'],
      ['Dorothy', 'Rourke', 'drour@magic.bus', 'dr', 'https://vignette.wikia.nocookie.net/magicschoolbus/images/7/7e/Da_pickle01.jpg/revision/latest?cb=20140604124745'],
      ['Keesha', 'Franklin', 'kfrank@magic.bus', 'kf', 'https://vignette.wikia.nocookie.net/magicschoolbus/images/a/a6/MSB_S1_E4_072.jpg/revision/latest?cb=20170703233927']
    ]

    return Promise.all(students.map(student => {
      return hashUser(student)
      .then(hashedStudent => {
        // Add students
        return db.query('INSERT INTO students (first_name, last_name, email, password, thumbnail_url) VALUES ($1, $2, $3, $4, $5)', hashedStudent)
        .then(()=> {
          return hashedStudent
        })
      })
      .then(hashedStudent => {
        console.log('hashedStudent ------> ', hashedStudent)
        // Assign students to class
        return db.query(
          `INSERT INTO classes_students (class_id, student_id) 
          VALUES ((SELECT id FROM classes WHERE name='Magic Class'), (SELECT id FROM students WHERE email=$1));`, 
          [hashedStudent[2]])
      })
    }))
  })
}

const addQuestions = function(){
  // [text, teacherId, subjectId, avgTime = 0]
  let teacherId
  let subjId

  return db.query(`SELECT id FROM teachers WHERE email='mfrizz@magic.bus'`)
    .then(teacherData => {
      teacherId = teacherData.rows[0].id
      return db.query(`SELECT id FROM subjects WHERE name='Magic'`)
    })
    .then(subjData=> {
      subjId = subjData.rows[0].id
    })
    .then(()=> {
      const questions = [
        ['What is a closure?', teacherId, subjId], 
        ['How old is Hack Reactor?', teacherId, subjId], 
        ['What year did The Magic School Bus first air?', teacherId, subjId], 
        ['How many flies are currently in the office?', teacherId, subjId], 
        ['Who is the best house in GoT?', teacherId, subjId], 
      ]

      const answers = [
        [['Function objects', false],
          ['Scope where function’s variables are resolved', false],
          ['Both Function objects and Scope where function’s variables are resolved', true],
          ['None of the above', false],
        ],
        [['2010', false],['2012', true],['2014', false]],
        [['1980', false],['1998', false],['1994', true],['1977', false],['1990', false]],
        [['0', false],['Too many', true],],
        [['Grey Joy', false],['Lanister', false],['Tyrell', false],['Stark', true],],
      ]
      return Promise.all(questions.map((questionArr, questionIndx) => {
         return db.query(
          `INSERT INTO draft_questions (question, teacher_id, subject_id) 
          VALUES ($1, $2, $3) RETURNING id;`, questionArr)
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

exports.addDummyData = addStudentsAndClass;
exports.addQuestions = addQuestions;
exports.addQuiz = addQuiz;
exports.removeDummyData = removeStudentsAndClass;