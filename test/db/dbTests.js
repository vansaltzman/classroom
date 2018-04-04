var assert = require('assert')
var bcrypt = require('bcrypt')
var { db, addUser, verifyUser } = require('../../db/mainDb.js')

var testTeacher = ['Valerie', 'Frizzle', 'mfrizz@magic.bus', 'TheFriz']
//var testTeacher = ['Joe', 'Joe', 'joejoe@hackreactor.edu', 'joejoe']

const addFrizzle = function(){

  let hashedTeacher = testTeacher.slice()

  const salt = 10;
  return bcrypt.hash(hashedTeacher[3], salt)
    .then(hash => {
      hashedTeacher[3] = hash

      db.query('INSERT INTO teachers (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)', hashedTeacher)
    })
    .catch(err => console.log('issue with add Frizzle', err))
}
addFrizzle();

const removeFrizzle = function(){
  return db.query('DELETE FROM teachers WHERE email=$1', [testTeacher[2]])
}

exports.signUp = function() {
  describe('Sign Up', function() {
    describe('teacher', function() {


      it('should add a new teacher to the database', function(done) {
        var client

        addUser(...testTeacher, 'teacher')
        .then(()=> {
          return db.connect()
        })
        .then(newClient => {
          client = newClient
          return client.query(`SELECT * FROM teachers WHERE email=$1`, [testTeacher[2]])
        })
        .then(res => {
          if (res.rowCount) {
            done()
            // return client.query(`DELETE FROM teachers WHERE email=$1`, [testTeacher[2]])
          }
          else done('New teacher was not added to db')
        })
        .then(()=> {
          client.release()
        })
        .catch(err => {
          if (client) client.release()
          done(err)
        })
      });

      it('should should not add a teacher that already exists', function(done) {
        addUser(...testTeacher, 'teacher')
        .then(res => {
          if (res === 'User already exists') {
            done()
          } else {
            done('Did not return expected response')
          }
        })
        .catch(err => {
          done(err)
        })
        .then(()=> {
          return db.connect().then(client => client.query(`DELETE FROM teachers WHERE email=$1`, [testTeacher[2]]))
        })
      })
    });
  })
}

exports.verifyUser = function() {
  describe('Verify User', function() {
    describe('teacher', function() {

      it('should verify a user if correct credentials', function(done) {
        addFrizzle()
        .then(()=> {
          return verifyUser(testTeacher[2], testTeacher[3])
        })
        .then((res)=> {
          if (!!res === true) {
            done()
          } else {
            done('Failed to match credentials, did not return true')
          }
        })
        .catch(err=> {
          done(err)
        })
      })

      it('should not verify a user if wrong credentails', function(done) {
        verifyUser(testTeacher[2], 'bad pass')
        .then((res)=> {
          if (res === false) {
            done()
          } else {
            done('Did not return false')
          }
        })
        .catch(err=> {
          done(err)
        })
      })

      it('should not verify a user if user does not exist', function(done) {
        verifyUser('bad user', testTeacher[3])
        .then((res)=> {
          if (res === false) {
            done()
            removeFrizzle()
          } else {
            done('Did not return false')
            removeFrizzle()
          }
        })
        .catch(err=> {
          done(err)
          removeFrizzle()
        })
      })
    });
  })
}


/******** Students *******/
let Ara = ['Ara', 'Nguyen', 'pnn2104@columbia.edu', '123456'];
let Jae = ['Jae', 'Jang', 'jj2837@columbia.edu', '123456'];
let Adam = ['Adam', 'Mateo', 'adam@mateo.edu', '123456'];
let Jerry = ['Jerry', 'Chen', 'jerry@chen.edu', '123456'];
let Artem = ['Artem', 'Ipatev', 'artem@ipatev.edu', '123456'];
let Riley = ['Riley', 'Alsman', 'riley@alsman.edu', '123456'];
let Juan = ['Juan', 'Galan', 'juan@galan.edu', '123456'];
let AlexL = ['Alex', 'Levine', 'alex@levine.edu', '123456'];
let AlexC = ['Alex', 'Chojnacki', 'alex@chojnacki.edu', '123456'];
let EricSin = ['Eric', 'Sin', 'eric@sin.edu', '123456'];
let Rory = ['Rory', 'Reagan', 'rory@reagan.edu', '123456'];
let Brent = ['Brent', 'Hagen', 'brent@hagen.edu', '123456'];
let Aloralyn = ['Aloralyn', 'Ayran', 'aloralyn@ayran.edu', '123456'];
let Allegra = ['Allegra', 'Bernt', 'allegra@bernt.edu', '123456'];
let Michael = ['Michael', 'Vasio', 'michael@vasio.edu', '123456'];
let Xixi = ['Xixi', 'Chen', 'xixi@chen.edu', '123456'];
let Manos = ['Manos', 'Manos', 'manos@manose.edu', '123456'];
let Marcus = ['Marcus', 'Hausler', 'marcus@hausler.edu', '123456'];
let Danny = ['Danny', 'Schradder', 'danny@schradder.edu', '123456'];
let Quentin = ['Quentin', 'Quentin', 'quentin@quentin.edu', '123456'];
let Chris = ['Chris', 'Rigoli', 'chris@rigoli.edu', '123456'];

const addStudents = function(student) {
  hashStudent = student.slice();
  let salt = 10;
  return bcrypt.hash(student[3], salt)
  .then((hashedPassword) => {
    //console.log(hashedPassword);
    hashStudent[3] = hashedPassword;
    db.query('INSERT INTO students (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)', hashStudent);
  })
  .catch((err) => {
    if (err) {
      console.log('can not add student');
    }
  })
}
addStudents(Chris);


//let JoeJoe = ['Joe', 'Joe', 'joejoe@hackreactor.edu', 'joejoe']
// const addTeachers = function(teacher) {
//   hashTeacher = teacher.slice();
//   let salt = 10;
//   return bcrypt.hash(teacher[3], salt)
//   .then((hashedPassword) => {
//     //console.log(hashedPassword);
//     hashedTeacher[3] = hashedPassword;
//     db.query('INSERT INTO teachers (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)', hashTeacher);
//   })
//   .catch((err) => {
//     if (err) {
//       console.log('can not add teacher');
//     }
//   })
// }

// addTeachers(JoeJoe)

// addStudents(Adam);
// addStudents(Jerry);
// addStudents(Artem);
// addStudents(Riley);
// addStudents(Juan);
// addStudents(AlexL);
// addStudents(AlexC);


// `INSERT INTO draft_quizzes (name, subject_id, teacher_id) VALUES ('Schrodinger Cat', '1', '1');`
// `INSERT INTO draft_questions (question, teacher_id, subject_id) VALUES ('Which physicist below devised the paradox of Schrodinger Cat?', '1', '1');`
// `INSERT INTO draft_quizzes_draft_questions (draft_quiz_id, draft_question_id, position) VALUES (1, 1, 1);`
// `INSERT INTO draft_answers (answer, question_id, correct) VALUES ('Erwin Schrödinger', '1', 'true')`


// // for getting all the quizzes belong to a teacher and the subject
// `SELECT * FROM draft_quizzes WHERE teacher_id='1' AND subject_id='1';`
// //get the quiz_id 
