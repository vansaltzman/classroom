import axios from 'axios';  
import { browserHistory } from 'react-router';  
import cookie from 'react-cookie';  
import actionTypes from './types';
import classes from '../../data/teacherClassViewData.js';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwt from 'jsonwebtoken';
// import { AUTH_USER,  
//          AUTH_ERROR,
//          UNAUTH_USER,
//          PROTECTED_TEST } from './types';

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
        console.log('response in actions ', res)
        
        // cookie.save('token', res.data, { path: '/' });
        const token = res.data.token;
        // console.log('token ', token)
        localStorage.setItem('jwtToken ', token);
        setAuthorizationToken(token);
        dispatch(setCurrentUser(jwt.decode(token)))
        // console.log('decode ', jwt.decode(token));
        // dispatch({ type: actionTypes.AUTH_USER });
        // to reconfigure how to redirect user
        // window.location.href = CLIENT_ROOT_URL + '/dashboard';
      })
      .catch((error) => {
          console.log('error in console logging ', error)
        errorHandler(dispatch, error.res, actionTypes.AUTH_ERROR)
      });
      }
    }

export function protectedTest() {  
    console.log('are we running protected test')
    return function(dispatch) {
        axios.get(`${serverURL}/protected`, {
        headers: { 'Authorization': cookie.load('token') }
        })
        
        .then(res => {
        dispatch({
            type: actionTypes.PROTECTED_TEST,
            payload: res.data.content
        });
        })
        .catch((error) => {
                console.log('err in protected test ', error)
        // errorHandler(dispatch, error.res, AUTH_ERROR)
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