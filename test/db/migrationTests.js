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

    let students = [
      ['Arnold', 'Perlstein', 'aperl@magic.bus', 'ap'],
      ['Carlos', 'Ramon', 'cramo@magic.bus', 'cr'],
      ['Dorothy', 'Rourke', 'drour@magic.bus', 'dr'],
      ['Keesha,', 'Franklin', 'kfrank@magic.bus', 'kf']
    ]

    return Promise.all(students.map(student => {
      return hashUser(student)
      .then(hashedStudent => {

        // Add students
        db.query('INSERT INTO students (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)', hashedStudent)
        return hashedStudent
      })
      .then(hashedStudent => {
        console.log(hashedStudent)

        // Assign students to class
        return db.query(
          `INSERT INTO classes_students (class_id, student_id) 
          VALUES ((SELECT id FROM classes WHERE name='Magic Class'), (SELECT id FROM students WHERE email=$1));`, 
          [hashedStudent[2]])
      })
    }))
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

        xit('should update the active view for students and teacher', function(done) {

        })
      })
    })
  })
}

exports.addDummyData = addStudentsAndClass;
exports.removeDummyData = removeStudentsAndClass;