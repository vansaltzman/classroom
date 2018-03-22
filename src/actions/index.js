import axios from 'axios';  
import { browserHistory } from 'react-router';  
import actionTypes from './types';
import classes from '../../data/teacherClassViewData.js';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwt from 'jsonwebtoken';
import fb from '../../db/liveClassroom.js'

const serverURL = 'http://localhost:3000';

export function setCurrentUser (user) {
    //console.log('user in set user ', user);
    return {
        type: actionTypes.SET_CURRENT_USER,
        user: user
    }
}

export function loginUser({ email, password }) {  
    return function(dispatch) {
      axios.post(`${serverURL}/auth/login`, { email, password })
      .then((res) => {
        console.log('res from server upon login ', res )
        const token = res.data.token;
        localStorage.setItem('jwtToken ', token);
        // to check: are we storing the token correctly in local storage?
        setAuthorizationToken(token);
        var decoded = jwt.decode(token)
        dispatch(setCurrentUser(jwt.decode(token)))
      })
      .catch((error) => {
          console.log('error in console logging ', error)
        //errorHandler(dispatch, error.res, actionTypes.AUTH_ERROR)
      });
      }
    }


/********************************** GET CLASSES TO DISPLAY ON TEACHERS MAIN VIEW ***********************************/
function getTeacherEmail(state) {
	return {
		email: state().auth.user.email
	}
}

export function getClasses(emailObj) {
	//console.log('emailobj', emailObj)
	return (dispatch) => {
		axios.post('/allClasses', emailObj)
		.then((res) => {
			//console.log('got here');
			dispatch(getClassesAction(res.data))
			//console.log('Data received by client', res.data);
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

// function addNewClassAction() {
// 	return {
// 		type: actionTypes.ADD_NEW_CLASS_ACTION
// 	}
// }

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
		const classes = fb.fb.ref('/');
		classes.push(classObj)
		.then(() => {
			dispatch(classGoLiveAction());
		})
	}
}
function classGoLiveAction() {
	return {
		type: actionTypes.CLASS_GO_LIVE_ACTION
	}
}

/******************************* GET ALL CLASSES THAT BELONGS TO A STUDENT **********************************/

export function getClassesBelongToAStudent(studentIdObj) {
	return (dispatch) => {
		axios.post('/getStudentsClasses', studentIdObj)
		.then((res) => {
			console.log('students classes', res.data)
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
// export function teacherAddStudentsToClass(studentId) {
// 	return (dispatch) => {
// 		axios.post('/addStudentToClass', {id: studentId})
// 	}
// }

// function teacherAddStudentsToClassAction(studentId) {
// 	return {
// 		type: actionTypes.TEACHER_ADD_STUDENT_TO_CLASS_ACTION,
// 		studentId
// 	}
// }

