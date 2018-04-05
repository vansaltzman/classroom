const firebase = require('firebase');
const config = require('../server/config.js');
const dummyStudentData=require('../db/dummyStudentsData');
const studentQuizObjConverter = require('../src/utils/studentQuizObjConverter.js');
const moment = require('moment');
const fs = require('fs');
// const migrate = require('../server/migrationWorker.js')
const dotenv = require('dotenv');
const {error} = dotenv.config();
if (error) {
  console.log('error in dotenv ', error)
}

firebase.initializeApp(config.fbConfig);

const fb = firebase.database();

fb.ref('/').once('value')
.then(snap=> {
	// if (snap.toJSON().classes) console.log('Classes live on app launch: ', Object.values(snap.toJSON().classes).map(each => each.name))
})

const selectClass = function(classId) {
  return migrate.migrateClassToFB(classId)
  .then(classObj => classObj)
}

const toggleStudentLiveClassStatus = function(classId, studentId, newStatus) {
	const currentStudentStatus = fb.ref('/classes/' + classId + '/students/' + studentId + '/isHere')
	currentStudentStatus.once('value')
	.then(snap => {
		if (newStatus !== undefined) {
			currentStudentStatus.set(newStatus)
		} else {
			currentStudentStatus.set(snap.toJSON() === 'true' ? true : false)
		}
	})
}

const fetchClassData = function(classId) {
	return fb.ref('/classes/' + classId).once('value')
		.then(snap => {
			return snap.toJSON()
		})
}

const stopFetchClassData = function(classId) {
	return fb.ref('/classes/' + classId).off('value')
}

const removeClass = function(classId) {
	return fb.ref('/classes/').child(classId).remove()
}

// this function appears to not be called anywhere
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
				activeClass.handRaisedQueue[studentId] = studentInQueue[studentId]
			}
			currentClass.set(activeClass);
		} else {
			currentClass.child('handRaisedQueue').set(studentInQueue)
		}
	})
}

const updateHandRaiseAcknowledgement = function (classId, studentId, type) {
	const currentClass = fb.ref('/classes/' + classId);
	const communicationMethod = {
		[studentId]: {
			studentId: studentId,
			method: type}
	}
	return currentClass.once('value', snap => {
		let activeClass = snap.val();
		if( activeClass.hasOwnProperty('communication') ) {
			if (activeClass.communication[studentId]) {
				delete activeClass.communication[studentId]
			} else {
				activeClass.communication[studentId] = communicationMethod[studentId]
			}
			currentClass.set(activeClass);
		} else {
			currentClass.child('communication').set(communicationMethod)
		}
	})
}

const incrementThumbTotal = function (classId, studentId, difference) {
	console.log('liveclassroom fired increment', classId)
	const thumbTotal= fb.ref('/classes/' + classId + '/students/' + studentId + '/thumb');
		return thumbTotal.once('value', (snap) => {
			let currentTotal = snap.val();
					currentTotal += difference
			console.log('current total',currentTotal)
			thumbTotal.set(currentTotal);
		})
	}

const decrementThumbTotal = function (classId, studentId, difference) {
	console.log('liveclassroom fired decrement', classId)
	const thumbTotal= fb.ref('/classes/' + classId + '/students/' + studentId + '/thumb');
		return thumbTotal.once('value', (snap) => {
			let currentTotal = snap.val();
			currentTotal -= difference
			thumbTotal.set(currentTotal);
			console.log('currentTotal in live classroom.js students thumb call', currentTotal)
		})		
	}

const getThumbTotal = function (classId, studentId) {
	const thumbTotal= fb.ref('/classes/' + classId + '/students/' + studentId + '/thumb');
	thumbTotal.on('value', (snap) => {
		console.log('snap.val----', snap.val())
		let currentTotal = snap.val();
		return currentTotal
	})
}

const setStudentsThumbsNeutral = function (classId) {
	let count = -90
	const studentsObj = fb.ref('/classes/' + classId + '/students')
	studentsObj.once('value', (snap) => {
		let students = snap.val()
	
		students.forEach( student => {
			let studentRef = fb.ref('/classes/' + classId + '/students/' + student.id + '/thumb');
			studentRef.set(count)
			})
	})
}

const setThumbPollLiveForStudents = function (classId, bool) {
	console.log('fb bool-------', typeof bool, bool)
	const classRoom = fb.ref('/classes/' + classId + '/thumbPoll')
	classRoom.set(bool)
}

const incrementParticipation = function (classId, studentId) {
	const studentParticipation = fb.ref('/classes/' + classId + '/students/'+studentId +'/participation');
	return studentParticipation.once('value', (snap) => {
		let currentParticipation = snap.val();
		studentParticipation.set(currentParticipation + 1);

	}) 
}

module.exports = {  
  fb,
  startClass,
	launchQuiz,
	endClass,
	removeClass,
	fetchClassData,
	stopFetchClassData,
	toggleStudentLiveClassStatus,
  updateActiveView,
  insertStudentAnswers,
	stopFetchingClassData,
	toggleStudentHandRaiseStatus,
	updateHandRaiseQueue,
	updateHandRaiseAcknowledgement,
	incrementThumbTotal,
	decrementThumbTotal,
	getThumbTotal,
	setThumbPollLiveForStudents,
	setStudentsThumbsNeutral,
	incrementParticipation
}