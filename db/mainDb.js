const { Pool } = require('pg')
const schema = require('./classroom.js')

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



module.exports = {
  db
}


