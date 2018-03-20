import actionTypes from '../actions/types';
import isEmpty from 'lodash/isEmpty';

const initialState = { authenticated: false, user: {} }
// note: reducers should be pure!
// no side effects
// export default function(state=initialState, action) {
//     switch(action.type) {
//         case actionTypes.AUTH_USER:
//             return {...state, error:'', message:'', authenticated: true};
//         case actionTypes.UNAUTH_USER:
//             return {...state, authenticated: false};
//         case actionTypes.AUTH_ERROR:
//             return {...state, error: action.payload};
//         case actionTypes.PROTECTED_TEST:
//             return {...state, content: action.payload};
//     }
//     return state;
// }

export default ( state = initialState, action = {} ) => {
    switch(action.type) {
        case actionTypes.SET_CURRENT_USER: 
        return {
            authenticated: !isEmpty(action.user),
            user: action.user
        }
        default: return state;
    }
}