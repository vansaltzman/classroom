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

return loaders.addDummyData()
.then(()=> {
  console.log('Added Teacher, Class and Students')
  return loaders.addQuestions()
})
.then(returnObj => {
  console.log('Added Questions')
  return loaders.addQuiz(returnObj)
})
.then(()=> {
  console.log('Added Quiz')
})

db.query(`INSERT INTO draft_questions (question, subject_id, teacher_id) 
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, (SELECT id FROM subjects WHERE name='Magic'));`, )

.then(() => process.exit())
