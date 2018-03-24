const firebase = require('firebase');
const config = require('../server/config.js');
const dummyStudentData=require('../db/dummyStudentsData');
const studentQuizObjConverter = require('../src/utils/studentQuizObjConverter.js');

firebase.initializeApp(config.fbConfig);
const fb = firebase.database();

const selectClass = function(classId) {
  return migrate.migrateClassToFB(classId)
  .then(classObj => classObj)
}

const startClass = function(classObj) {
  const classList = fb.ref('/classes/' + classObj.id) 
  return classList.child(classObj.id).set(classObj)
  .then(()=> console.log('Launched claass ' + classObj.name))
  .catch((err)=> console.log('Issue starting class' + err))
}

const studentJoins = function(studentId, classId) { // Conncect this to actions. And create a set isInClassroom function
  var studentStatus = fb.ref('classes/' + classId + '/students/' + studentId + '/isInClassroom')
  studentStatus.on('value', (snap)=> {
    return snap.val()
  })
}

const launchQuiz = function (classId, quizObj) {
	console.log('LAUNCH QUIZ')
	console.log('classId----', classId)
	console.log('quizObj----', quizObj)
	// store postgres quiz id to active view property in the
	const currentClass = fb.ref('/classes/ ' + classId )
		updateActiveView(quizObj.id, classId)
		.then(()=> {
			fb.ref('classes/'+ classId +'/quizzes').child(quizObj.id).set(quizObj)
		})
		.then(() => {
			// create a copy of quiz object for each student in that class (with answers defaulted to false)
			const studentQuizObj = studentQuizObjConverter(quizObj);
			console.log('student anwers obj ', studentQuizObj);
			// get all student Ids from current class in fb
			// const studentIdsArray = Object.keys(fb.ref('/classes/' + classId + '/students').val());
			fb.ref('/classes/' + classId + '/students').once('value', (snap)=>{
				var students = snap.val()
				students.forEach( student => {
					console.log('student ', student);
					console.log('classId ', classId )
					console.log('student id ', student.id);
					console.log('______________________')
					let studentRef = fb.ref('/classes/' + classId + '/students/' + student.id +'/quizzes');
					studentRef.child(quizObj.id).set(studentQuizObj)
				})
				// snap.forEach((student) => {
				// 	console.log('student',student.val())
				
				// 	// student.child(quizObj.id).val().set(studentQuizObj)
				// })
			})
			
			// console.log('studen ids array ', fb.ref('/classes/' + classId + '/students'))
			// studentIdsArray.forEach( studentId => {
			// 	// iterate through all student ID array
			// 	// create ref to that students quizzes
			// 	let studentRef = fb.ref('/classes/' + classId + '/students' + studentId);
			// 	// push studentQuizObj to each of those 
			// 	studentRef.child(quizObj.id).set(studentQuizObj)
			// })
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


module.exports = {  
  fb,
  startClass,
  launchQuiz,
  updateActiveView,
  insertStudentAnswers,
  stopFetchingClassData
}