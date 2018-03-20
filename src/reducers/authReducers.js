// import { AUTH_USER,  
//     UNAUTH_USER,
//     AUTH_ERROR,
//     PROTECTED_TEST } from '../actions/types';
import actionTypes from '../actions/types';

const initialState = { error: '', message: '', content: '', authenticated: false}
// note: reducers should be pure!
// no side effects
export default function(state=initialState, action) {
    switch(action.type) {
        case actionTypes.AUTH_USER:
            return {...state, error:'', message:'', authenticated: true};
        case actionTypes.UNAUTH_USER:
            return {...state, authenticated: false};
        case actionTypes.AUTH_ERROR:
            return {...state, error: action.payload};
        case actionTypes.PROTECTED_TEST:
            return {...state, content: action.payload};
    }
    return state;
}