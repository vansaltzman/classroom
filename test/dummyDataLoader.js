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

// !--- Uncomment bellow to remove everything except the teacher

// loaders.removeDummyData()
// .then(() => process.exit())

.then(() => process.exit())
