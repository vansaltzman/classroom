var assert = require('assert')
var { db, addUser } = require('../../db/mainDb.js')

exports.signUp = function() {
  describe('Sign Up', function() {
    describe('teacher', function() {

      var testTeacher = ['Valerie', 'Frizzle', 'mfrizz@magic.bus', 'TheFriz']

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
          console.log(res.rowCount)
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