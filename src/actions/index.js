import axios from 'axios';  
import { browserHistory } from 'react-router';  
import cookie from 'react-cookie';  
import actionTypes from './types';
import classes from '../../data/teacherClassViewData.js';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwt from 'jsonwebtoken';

const serverURL = 'http://localhost:3000';

export function setCurrentUser (user) {
    console.log('user in set user ', user);
    return {
        type: actionTypes.SET_CURRENT_USER,
        user: user
    }
}

export function loginUser({ email, password }) {  
    return function(dispatch) {
      axios.post(`${serverURL}/auth/login`, { email, password })
      .then((res) => {
        const token = res.data.token;
        localStorage.setItem('jwtToken ', token);
        setAuthorizationToken(token);
        var decoded = jwt.decode(token)
        dispatch(setCurrentUser(jwt.decode(token)))
      })
      .catch((error) => {
          console.log('error in console logging ', error)
        errorHandler(dispatch, error.res, actionTypes.AUTH_ERROR)
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