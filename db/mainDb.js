const { Pool } = require('pg')
const schema = require('./classroom.js')
const bcrypt = require('bcrypt')

const connectionString = process.env.DATABASE_URL || 'postgres:postgress//localhost:5432/classroom';

const db = new Pool({
  user: process.env.USER,
  database: 'classroom',
  host: 'localhost',
  password: null,
  port: 5432,
})

db.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
})

db.connect().then((client)=> {
  return client.query(schema)
  .then(res => {
    client.release()
    console.log('created classroom database')
  })
  .catch(err => {
    client.release()
    console.log(err.stack)
  })
})

// Database helpers

const addUser = function(firstName, lastName, email, password, userClass) {
  let userTable = userClass === 'teacher' ? 'teachers' : 'students'

  const salt = 10;
  return bcrypt.hash(password, salt)
    .then((hash)=> {

      var client
      
      return db.connect().then(newClient => {
        client = newClient

        return client.query(`SELECT * FROM ${userTable} WHERE email=$1`, [email])
        .then(res => {
          if (res.rowCount) {
            return 'User already exists'
          } else {
            return client.query(
              `INSERT INTO ${userTable} (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)`, 
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
  
}

module.exports = {
  addUser,
  verifyUser,
  db
}


