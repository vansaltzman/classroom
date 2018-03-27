import axios from 'axios';  
import { browserHistory } from 'react-router';  
import actionTypes from './types';
import classes from '../../data/teacherClassViewData.js';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwt from 'jsonwebtoken';
import { fb, updateActiveView, stopFetchingClassData  } from '../../db/liveClassroom.js';
import studentQuizObjConverter from '../utils/studentQuizObjConverter.js';
import dummyStudentsData from '../../db/dummyStudentsData';


const serverURL = 'http://localhost:3000';


export function loginUser({ email, password }) {  
    return function(dispatch) {
      axios.post(`${serverURL}/auth/login`, { email, password })
      .then((res) => {
		const token = res.data.token
		localStorage.setItem('jwtToken', token);
		setAuthorizationToken(token);
		const decoded = jwt.decode(token)
        dispatch(setCurrentUser(jwt.decode(token)))
      })
      .catch((error) => {
          console.log('error in loggin in ', error)
      });
      }
	}

export function setCurrentUser (user) {
    return {
        type: actionTypes.SET_CURRENT_USER,
		user: user
    }
}

export function logoutUser () {
	return (dispatch) => {
		// localStorage.removeItem('jwtToken');
		localStorage.clear();
		setAuthorizationToken(false);
		dispatch(setCurrentUser({}));
	}
}
 

/********************************** GET CLASSES TO DISPLAY ON TEACHERS MAIN VIEW ***********************************/
function getTeacherEmail(state) {
	return {
		email: state().auth.user.email
	}
}

export function getClasses(emailObj) {
	return (dispatch) => {
		axios.post('/allClasses', emailObj)
		.then((res) => {
			dispatch(getClassesAction(res.data))
		})
	}
}

function getClassesAction(classes) {
  return {
		type: actionTypes.GET_TEACHERS_CLASSES,
		classes
	}
}

//show class builder modal
export function toggleModalAction() {
	return {
		type: actionTypes.TOGGLE_CLASS_BUILDER_MODAL
	}
}


/************************** CLASS BUILDER MODAL *************************/
export function updateNewClassName(event) {
	return (dispatch) => {
		dispatch(updateNewClassNameAction(event))
	}
}
function updateNewClassNameAction(event) {
	return {
		type: actionTypes.UPDATE_NEW_CLASS_NAME_ACTION,
		event
	}
}

export function updateNewClassSubject(event) {
	return (dispatch) => {
		dispatch(updateNewClassSubjectAction(event))
	}
}
function updateNewClassSubjectAction(event) {
	return {
		type: actionTypes.UPDATE_NEW_CLASS_SUBJECT_ACTION,
		event
	}
}

export function updateNewClassQuarter(quarter) {
	return (dispatch) => {
		dispatch(updateNewClassQuarterAction(quarter))
	}
}
function updateNewClassQuarterAction(quarter) {
	return {
		type: actionTypes.UPDATE_NEW_CLASS_QUARTER_ACTION,
		quarter
	}
}

export function updateNewClassYear(year) {
	return (dispatch) => {
		dispatch(updateNewClassYearAction(year));
	}
}
function updateNewClassYearAction(year) {
	return {
		type: actionTypes.UPDATE_NEW_CLASS_YEAR_ACTION,
		year
	}
}

/******************** LIVE CLASS VIEW ********************/
//this should make a call to db to get the target information including 
//students belongs to that class & quizzes that belong to the teacher (quizzes later)
export function teacherEnterClass() {
	return (dispatch) => {
		axios.get('/getTargetClass')
		.then((res) => {
			dispatch(teacherEnterClassAction(res.data))
		})	
	}
}

//when a teacher enter a class, add to the store a target class obj
export function updateTargetClass(targetClass) {
	return (dispatch) => {
		dispatch(updateTargetClassAction(targetClass))
	}
}
function updateTargetClassAction(targetClass) {
	return {
		type: actionTypes.UPDATE_TARGET_CLASS_ACTION,
		targetClass
	}
}

export function getAllStudents() {
	return (dispatch) => {
		axios.get('/getAllStudents')
		.then((res) => {
			//console.log('all students', res.data);
			dispatch(getAllStudentsAction(res.data));
		})
	}
}
function getAllStudentsAction(students) {
	return {
		type: actionTypes.GET_ALL_STUDENTS_ACTION,
		students
	}
}

export function getStudentsBelongToAClass(idObj) {
	return (dispatch) => {
		axios.post('/getAllStudentsInAClass', idObj)
		.then((res) => {
			console.log('dataaaaaa', res.data);
			dispatch(getStudentsBelongToAClassAction(res.data))
		})
	}
}
function getStudentsBelongToAClassAction(students) {
	return {
		type: actionTypes.GET_STUDENTS_BELONGS_TO_A_CLASS_ACTION,
		students
	}
}

export function classGoLive(classId, classObj) {
	return (dispatch) => {
		classObj.isLive = true;
		const classes = fb.ref('/classes');
		classes.child(classId).set(classObj)
		.then(() => {
			dispatch(changeClassLabelColorWhenLive());
			dispatch(fetchClassData(classId, 'teacher'))
			dispatch(fetchClassData(classId, 'student'))
		})
		.then(() => {
			dispatch(classGoLiveAction(classId));
		})
	}
}
function classGoLiveAction(classes) {
	return {
		type: actionTypes.CLASS_GO_LIVE_ACTION,
		classes
	}
}

//student's main view to see which class is currently live
export function watchClassGoLive() {
	return (dispatch) => {
		fb.ref('/classes').on('value', (snap) => {
			dispatch(watchClassGoLiveAction(snap.val()));
		})
	}
}
function watchClassGoLiveAction(classId) {
	return {
		type: actionTypes.WATCH_CLASS_GO_LIVE_ACTION,
		classId
	}
}

export function changeClassLabelColorWhenLive () {
	return (dispatch) => {
		dispatch(changeClassLabelColorWhenLiveAction())
	}
}
function changeClassLabelColorWhenLiveAction() {
	return {
		type: actionTypes.CHANGE_CLASS_LABEL_WHEN_LIVE,
	}
}

/******************************* GET ALL CLASSES THAT BELONGS TO A STUDENT **********************************/

export function getClassesBelongToAStudent(studentIdObj) {
	return (dispatch) => {
		axios.post('/getStudentsClasses', studentIdObj)
		.then((res) => {
			dispatch(getClassesBelongToAStudentAction(res.data))
		})
	}
}
function getClassesBelongToAStudentAction(classes) {
	return {
		type: actionTypes.GET_CLASSES_BELONG_TO_A_STUDENT_ACTION,
		classes
	}
}

export function updateStudentTargetClass(targetClass) {
	return (dispatch) => {
		return dispatch(updateStudentTargetClassAction(targetClass))
	}
}
function updateStudentTargetClassAction(targetClass) {
	return {
		type: actionTypes.UPDATE_STUDENT_TARGET_CLASS_ACTION,
		targetClass
	}
}


// join/exit live class from student pov
// export function toggleStudentLiveClassStatus (classId, studentId) {
// 	console.log('/' + classId + '/students/' + studentId);
// 	return (dispatch) => {
// 		const currentStudentStatus = fb.ref('/' + classId + '/students/' + studentId)
// 		currentStudentStatus.set({isHere: true})
// 		.then(() => {
// 			dispatch(toggleStudentLiveClassStatusAction())
// 		})
// 	}
// }
// function toggleStudentLiveClassStatusAction () {
// 	return {
// 		type: actionTypes.TOGGLE_STUDENT_LIVE_STATUS
// 	}
// }


// join/exit live class from student pov
export function toggleStudentLiveClassStatus (classId, studentId) {
	console.log('Toggle Student Class Status' , classId, studentId)
	const currentStudentStatus = fb.ref('/classes/' + classId + '/students/' + studentId + '/isHere')
	return (dispatch) => {
		currentStudentStatus.set(true)
		.then(()=> {
			dispatch(toggleStudentLiveClassStatusAction())
			return currentStudentStatus.once('value')
		})
		.then((snap) => {
			const status = snap.val();
			// if (status) {
				dispatch(fetchClassData(classId, 'student'))
			// } else {
			// 	dispatch(stopFetchingClassData(classId))
			// }
		})
	}
}
function toggleStudentLiveClassStatusAction () {
		return {
			type: actionTypes.TOGGLE_STUDENT_LIVE_STATUS
		}
	}


// // submit a student's responses to a quiz every time they check an answer
// export function insertStudentAnswers(quizObj, studentId, quizId, classId) {
// 	const currentStudent = fb.ref('classes/' + classId + '/students/' + studentId + '/quizzes/' + quizId );
// 	return (dispatch) => {
// 		currentStudent.set(quizObj);
// 	}
// }
 
// get all class data for a live class
export function fetchClassData (classId, type) {
	const currentClass = fb.ref('/classes/' + classId )
	return (dispatch) => {
		currentClass.on('value', function(snap) {
			console.log('snap val on fetch class data', snap.val())
			if(type === 'teacher') {
				dispatch(updateClassDataTeacher(snap.val()))
			} 
			if (type === 'student') {
				dispatch(updateClassDataStudent(snap.val()))
			}
		})
	}
}
// function fetchClassDataAction () {
// 	return {
// 		type: actionTypes.FETCH_CLASS_DATA,
// 	}
// }

// update global state with updated live class data
export function updateClassDataStudent(classData) {
	return {
		type: actionTypes.UPDATE_CLASS_DATA_STUDENT,
		classData
	}
}

export function updateClassDataTeacher(classData) {
	return {
		type: actionTypes.UPDATE_CLASS_DATA_TEACHER,
		classData
	}
}
//**************** STUDENT VIEW QUIZ *******************

export function getQuiz() {
	return {
		type: actionTypes.GET_QUIZ
	}
}

export function nextQuestion() {
	return {
		type: actionTypes.NEXT_QUESTION
	}
}

export function previousQuestion() {
	return {
		type: actionTypes.PREVIOUS_QUESTION
	}
}
