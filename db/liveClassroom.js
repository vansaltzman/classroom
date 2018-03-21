const firebase = require('firebase');
const config = require('../server/config.js');
const dummyStudentData=require('../db/dummyStudentsData');
// Add config
<<<<<<< HEAD


=======
const config = require('../server/config.js')
>>>>>>> Rebase commit

firebase.initializeApp(config);
const fb = firebase.database();

/*

JSON Tree
db: {
  classes: {
    1: {
      id: 1
      name: English 101
      teacher: {id: , email: , name: }
      subject: English
      students: {
        id: { 
          name: 'Carlos Ramon',
          isInClassroom: false,
          activeView: 'lobby',
          email: 'cramo@magic.bus',
          quizzes: {} 
        },
      }
    }
  }
}
*/

const endClass = function(classId) {
 
}

// Database helpers

<<<<<<< HEAD
module.exports = {  
  fb
=======
module.exports = {
  fb,
>>>>>>> Rebase commit
}