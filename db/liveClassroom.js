const firebase = require('firebase');
const config = require('../server/config.js');
// Add config



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
const updateQuizResponses = function (responseObj, studentId, quizId, classId) {
  
}


module.exports = {
  updateQuizResponses,
  fb
}