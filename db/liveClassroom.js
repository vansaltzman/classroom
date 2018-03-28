const firebase = require('firebase');
const config = require('../server/config.js');
const dummyStudentData=require('../db/dummyStudentsData');
const studentQuizObjConverter = require('../src/utils/studentQuizObjConverter.js');
const moment = require('moment')
// const migrate = require('../server/migrationWorker.js')


firebase.initializeApp(config.fbConfig);
const fb = firebase.database();

const selectClass = function(classId) {
  return migrate.migrateClassToFB(classId)
  .then(classObj => classObj)
}

const startClass = function(classObj) {
	const classList = fb.ref('/classes/' + classObj.id) 
	classObj.isLive = true
  return classList.child(classObj.id).set(classObj)
  .then(()=> console.log('Launched claass ' + classObj.name))
  .catch((err)=> console.log('Issue starting class' + err))
}

const endClass = function(classId) {
	const classToEnd = fb.ref('/classes/' + classId)

	return classToEnd.child('isLive').set(false)
}

const studentJoins = function(studentId, classId) { // Conncect this to actions. And create a set isInClassroom function
  var studentStatus = fb.ref('classes/' + classId + '/students/' + studentId + '/isInClassroom')
  studentStatus.on('value', (snap)=> {
    return snap.val()
  })
}

const launchQuiz = function (classId, quizObj, quizTime) {
	const timeValues = quizTime.split(':');
	let quizDuration = moment.duration({minutes: parseInt(timeValues[0]), seconds: parseInt(timeValues[1])}).as('seconds');
	quizObj.time = moment().unix() + quizDuration;
	quizObj.quizDuration = quizDuration;
	quizObj.weight = quizWeight

	return fb.ref('classes/' + classId + '/quizzes').child(quizObj.id).set(quizObj)
	.then(() => {
			const studentQuizObj = studentQuizObjConverter(quizObj);
			return fb.ref('/classes/' + classId + '/students').once('value', (snap)=> {
					var students = snap.val()
					console.log('students ------> ' + students + ' <------ ')
					Object.values(students).forEach( student => {
							let studentRef = fb.ref('/classes/' + classId + '/students/' + student.id + '/quizzes');
							studentRef.child(quizObj.id).set(studentQuizObj)
					})
			})
	})
	.then(()=> {
			return updateActiveView(quizObj.id, classId)
	})
}

// change newView to be quiz id or false
const updateActiveView = function (newView, classId) {
  const currentClassActiveView = fb.ref('/classes/' + classId + '/activeView')
      return currentClassActiveView.set(newView)

}

// submit a student's responses to a quiz every time they check an answer
const insertStudentAnswers = function (quizObj, studentId, quizId, classId) {
	const currentStudent = fb.ref('classes/' + classId + '/students/' + studentId + '/quizzes/' + quizId );
		return currentStudent.set(quizObj);
}

// turns off a student/teacher's listener for a live class 
const stopFetchingClassData = function (classId) {
	const currentClass = fb.ref('/classes/' + classId )
		return currentClass.off('value')
}

// const endClass = function(classId) {
// 	// create variable of snapshot of the ending class object
// 	return fb.ref('/classes/' + classId).once('value')
// 		.then(snap => {
// 			// migrate class to postgress
// 			return migrate.classToPg(snap.val())
// 		})	
// 		// when migrated, set isLive to false
// 			// then remove class from firebase
// 	// if error, exit function
// }

module.exports = {  
  fb,
  startClass,
	launchQuiz,
	endClass,
  updateActiveView,
  insertStudentAnswers,
  stopFetchingClassData
}