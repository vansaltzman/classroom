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

export function setCurrentUser (user) {
    return {
        type: actionTypes.SET_CURRENT_USER,
		user: user
    }
}

export function loginUser({ email, password }) {  
    return function(dispatch) {
      axios.post(`${serverURL}/auth/login`, { email, password })
      .then((res) => {
		const token = res.data.token
		localStorage.setItem('jwtToken ', token);
		setAuthorizationToken(token);
		const decoded = jwt.decode(token)
        dispatch(setCurrentUser(jwt.decode(token)))
      })
      .catch((error) => {
          console.log('error in console logging ', error)
        errorHandler(dispatch, error.res, actionTypes.AUTH_ERROR)
      });
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
// function updateLogout () {
// 	return {
// 		type: actionTypes.LOGOUT_USER
// 	}
// }
 

/********************************** GET CLASSES TO DISPLAY ON TEACHERS MAIN VIEW ***********************************/
//RIGHT NOW JUST USING DUMMY DATA, BUT LATER WILL INVOLVE FETCHING DATA FROM POSTGRESQL
// export function getClasses() {
// 	return (dispatch) => {
// 		dispatch(getClassesAction());
// 	}
// }

export function getClassesAction() {
	//console.log(classes);
  return {
		type: actionTypes.GET_TEACHERS_CLASSES,
		//later the pay load shoud be the credentials of the teacher
		//right now the payload would be just the dummy data
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



//Adding basic info of a new class into postgress db
// export function addClass() {

// }
export function addClassAction() {
	return {
		type: actionTypes.ADD_NEW_CLASS_ACTION
	}
}

//making request to postgres
function getUpdatedClassList() {
	return {
		type: actionTypes.GET_UPDATED_CLASS_LIST
	}
}

// make class live - > from teacher pov
export function launchLiveClass(classObj) {
	const classes = fb.ref('/classes');
	return (dispatch) => {
		classes.child(classObj.id).set(classObj)
		.then(() => {
			dispatch(fetchClassData(classObj.id));
		})
	}
}

// join/exit live class from student pov
export function toggleStudentLiveClassStatus (classId, studentId) {
	const currentStudentStatus = fb.ref('/classes' + classId + '/students' + studentId + '/isHere')
	return (dispatch) => {
		currentStudentStatus.set(!currentStudentStatus)
		.then(()=> {
			return currentStudentStatus.once('value')
		})
		.then((snap) => {
			const status = snap.val();
			if (status) {
				dispatch(fetchClassData(classId))
			} else {
				dispatch(stopFetchingClassData(classId))
			}
		})
	}
}

// get all class data for a live class
export function fetchClassData (classId) {
	const currentClass = fb.ref('/classes/' + classId )
	return (dispatch) => {
		currentClass.on('value', function(snap) {
			dispatch(updateClassData(snap.val()))
		})
	}
}

// update global state with updated live class data
export function updateClassData(classData) {
	return {
		type: actionTypes.UPDATE_CLASS_DATA,
		classData
	}
}