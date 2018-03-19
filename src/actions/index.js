import axios from 'axios';  
import { browserHistory } from 'react-router';  
import cookie from 'react-cookie';  
import { AUTH_USER,  
         AUTH_ERROR,
         UNAUTH_USER,
         PROTECTED_TEST } from './types';

const loginUrl = 'http://localhost:3000/login';

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