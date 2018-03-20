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
      `INSERT INTO classes (name, teacher_id, subject_id) 
      VALUES ('Magic Class', (SELECT id FROM teachers WHERE email='mfrizz@magic.bus'), 
      (SELECT id FROM subjects WHERE name='Magic'));`
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
        db.query('INSERT INTO students (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)', hashedStudent)
        return hashedStudent
      })
      .then(hashedStudent => {
        console.log(hashedStudent)
        return db.query(
          `INSERT INTO classes_students (class_id, student_id) 
          VALUES ((SELECT id FROM classes WHERE name='Magic Class'), (SELECT id FROM students WHERE email=$1));`, 
          [hashedStudent[2]])
      })
    }))
  })
}

const removeStudentsAndClass = function() {
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


exports.signUp = function() {
  describe('Class Migration', function() {
    describe('from postgress', function() {


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