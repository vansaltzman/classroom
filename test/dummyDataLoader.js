var loaders = require('./db/migrationTests.js')
var db = require('../db/mainDb.js').db

/*

Teacher:
  ['Valerie', 'Frizzle', 'mfrizz@magic.bus', 'TheFriz']

Students:
  ['Arnold', 'Perlstein', 'aperl@magic.bus', 'ap'],
  ['Carlos', 'Ramon', 'cramo@magic.bus', 'cr'],
  ['Dorothy', 'Rourke', 'drour@magic.bus', 'dr'],
  ['Keesha,', 'Franklin', 'kfrank@magic.bus', 'kf']
*/


// !--- Uncomment bellow to remove everything except the teacher

// loaders.removeDummyData()
// .then(() => process.exit())

const questions = [
  ['what is 1 + 1?', ]
]

loaders.addDummyData()

db.query(`INSERT INTO draft_questions (question, subject_id, teacher_id) 
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, (SELECT id FROM subjects WHERE name='Magic'));`, )

.then(() => process.exit())
