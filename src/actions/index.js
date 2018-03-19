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
        dispatch({ type: actionTypes.AUTH_USER });
        // to reconfigure how to redirect user
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
export function getClasses() {
	return function(dispatch) {
		dispatch(getClassesAction()); 
	}
}

function getClassesAction() {
	//console.log(classes);
  return {
		type: actionTypes.GET_TEACHERS_CLASSES,
		//later the pay load shoud be the credentials of the teacher
		//right now the payload would be just the dummy data
		classes
	}
}