const firebase = require('firebase')
// Add config

const config = {
	apiKey: '',
	authDomain: '',
	databaseURL: ''
}

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

module.exports = {
  fb,
  startClass,
}