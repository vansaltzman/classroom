const firebase = require('firebase');
const config = require('../server/config.js');
const dummyStudentData=require('../db/dummyStudentsData');
const studentQuizObjConverter = require('../src/utils/studentQuizObjConverter.js');
const moment = require('moment')
// const migrate = require('../server/migrationWorker.js')


firebase.initializeApp(config.fbConfig);
const fb = firebase.database();

fb.ref('/').once('value')
.then(snap=> console.log(JSON.parse(JSON.stringify(snap.val()))))

const selectClass = function(classId) {
  return migrate.migrateClassToFB(classId)
  .then(classObj => classObj)
}

const fetchClassData = function(classId) {
	return fb.ref('/classes/' + classId).once('value')
		.then(snap => {
			return snap.toJSON()
		})
}

const remvoeClass = function(classId) {
	return fb.ref('/classes/').child(classId).remove()
}

// this function appears to not be called anywhere
const startClass = function(classObj) {
	console.log('are we calling start class')
	const classList = fb.ref('/classes/' + classObj.id) 
	classObj.isLive = true
	console.log('class obj when starting class ', classObj);
  return classList.child(classObj.id).set(classObj)
  .then(()=> console.log('Launched claass ' + classObj.name))
  .catch((err)=> console.log('Issue starting class' + err))
}

const endClass = function(classId) {
	const classToEnd = fb.ref('/classes/' + classId)
	return classToEnd.child('isLive').set(false)
}

const studentJoins = function(studentId, classId) {
  var studentStatus = fb.ref('classes/' + classId + '/students/' + studentId + '/isInClassroom')
  studentStatus.on('value', (snap)=> {
    return snap.val()
  })
}

const launchQuiz = function (classId, quizObj, quizTime, quizWeight) {
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
const toggleStudentHandRaiseStatus = function (classId, studentId) {
	const studentHandRaiseStatus = fb.ref('/classes/' + classId +'/students/'+studentId+'/handRaised');
		return studentHandRaiseStatus.once('value', (snap) => {
			let currentHandRaiseStatus = snap.val();
			studentHandRaiseStatus.set( !currentHandRaiseStatus);
		})
	}

const updateHandRaiseQueue = function(classId, studentId) {
	const currentClass = fb.ref('/classes/' + classId);
	const nowInSeconds = new Date().getTime()/1000;
	const studentInQueue = {
		[studentId]: {
			studentId: studentId,
			time: nowInSeconds}
	}
	return currentClass.once('value', (snap) => {
		let activeClass = snap.val();
		if (activeClass.hasOwnProperty('handRaisedQueue')) {
			if (activeClass.handRaisedQueue[studentId]) {
				delete activeClass.handRaisedQueue[studentId]
			} else {
				activeClass.handRaisedQueue[studentId] = studentInQueue
			}
			currentClass.set(activeClass);
		} else {
			currentClass.child('handRaisedQueue').set(studentInQueue)
		}
	})
}

module.exports = {  
  fb,
  startClass,
	launchQuiz,
	endClass,
	fetchClassData,
  updateActiveView,
  insertStudentAnswers,
	stopFetchingClassData,
	toggleStudentHandRaiseStatus,
	updateHandRaiseQueue
}