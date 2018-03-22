import actionTypes from '../actions/types';
import isEmpty from 'lodash.isempty';

const initialState = { authenticated: false, user: {} }
// const initialState = {}

export default ( state = initialState, action = {} ) => {
    switch(action.type) {
        case actionTypes.SET_CURRENT_USER: 
        return {
            authenticated: !isEmpty(action.user),
            user: action.user
        }
        case actionTypes.LOGOUT_USER:
            return initialState;

        default: return state;
    }
}