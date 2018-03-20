const fb = require('../db/liveClassroom')
const db = require('../db/mainDb')

const psqlClassToFb = function(sqlClass) {
  
}

const migrateClassToFB = function(classId){
  db.fetchClass(classId)
  .then(classRow => {
    console.log(classRow[0])
  })
}