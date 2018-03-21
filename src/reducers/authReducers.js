import actionTypes from '../actions/types';
import isEmpty from 'lodash.isempty';

const initialState = { authenticated: false, user: {} }

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