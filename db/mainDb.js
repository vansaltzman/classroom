const { Pool } = require('pg')

const db = new Pool()

db.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
})

// Database helpers



module.exports = {
  db,
}


