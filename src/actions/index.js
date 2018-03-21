import axios from 'axios';  
import { browserHistory } from 'react-router';  
import cookie from 'react-cookie';  
import actionTypes from './types';
import classes from '../../data/teacherClassViewData.js';
// import { AUTH_USER,  
//          AUTH_ERROR,
//          UNAUTH_USER,
//          PROTECTED_TEST } from './types';

const loginUrl = 'http://localhost:3000';

export function errorHandler(dispatch, error, type) {  
let errorMessage = '';

    if(error.data.error) {
        errorMessage = error.data.error;
    } else if(error.data){
        errorMessage = error.data;
    } else {
        errorMessage = error;
    }

    if(error.status === 401) {
        dispatch({
        type: type,
        payload: 'You are not authorized to do this. Please login and try again.'
        });
        logoutUser();
    } else {
        dispatch({
        type: type,
        payload: errorMessage
        });
    }
}

export function loginUser({ email, password }) {  
    return function(dispatch) {
      axios.post(`${API_URL}/auth/login`, { email, password })
      .then(response => {
        cookie.save('token', response.data.token, { path: '/' });
        dispatch({ type: AUTH_USER });
        window.location.href = CLIENT_ROOT_URL + '/dashboard';
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, AUTH_ERROR)
      });
      }
    }

export function protectedTest() {  
    return function(dispatch) {
        axios.get(`${API_URL}/protected`, {
        headers: { 'Authorization': cookie.load('token') }
        })
        .then(response => {
        dispatch({
            type: actionTypes.PROTECTED_TEST,
            payload: response.data.content
        });
        })
        .catch((error) => {
        errorHandler(dispatch, error.response, AUTH_ERROR)
        });
    }
}


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

