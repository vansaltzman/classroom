var loaders = require('./db/migrationTests.js')

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

loaders.addDummyData()
.then(() => process.exit())