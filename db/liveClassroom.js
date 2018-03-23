const firebase = require('firebase');
const config = require('../server/config.js');
const dummyStudentData=require('../db/dummyStudentsData');

firebase.initializeApp(config.fbConfig);
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

const selectClass = function(classId) {
  return migrate.migrateClassToFB(classId)
  .then(classObj => classObj)
}

const startClass = function(classObj) {
  const classList = fb.ref('/classes/' + classObj.id) 
  return classList.push(classObj)
  .then(()=> console.log('Launched claass ' + classObj.name))
  .catch((err)=> console.log('Issue starting class' + err))
}

const studentJoins = function(studentId, classId) { // Conncect this to actions. And create a set isInClassroom function
  var studentStatus = fb.ref('classes/' + classId + '/students/' + studentId + '/isInClassroom')
  studentStatus.on('value', (snap)=> {
    return snap.val()
  })
}

const startQuiz = function(classId, quizId) {

}

const answerQuestion = function(studentId, classId, quizId, questionId, responseValue) {

}

const changeQuestion = function(studentId, classId, quizId, prevQuestionId, newQuestionId) {

}

// const studentFinishedQuiz = function(studentId, classId, quizId) {

// }

const endQuiz = function(classId, quizId) {

}

const endClass = function(classId) {
  // get snapshot
  // remove class from fb
  // run migration worker on snapshot 
}

// Database helpers

module.exports = {  
  fb,
  startClass
}