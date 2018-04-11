import actionTypes from '../actions/types';
import isEmpty from 'lodash.isempty';

const initialState = { authenticated: false, user: {} }
// const initialState = {}

export default ( state = initialState, action = {} ) => {
    switch(action.type) {
        case actionTypes.SET_CURRENT_USER: 
        return {...state, authenticated: !isEmpty(action.user), user: action.user}
        return {
            authenticated: !isEmpty(action.user),
            user: action.user
        }
        case actionTypes.LOGOUT_USER:
            return initialState
        case actionTypes.PROFILE_PIC:
            console.log('profile pic', action.pic)
            //let updatedUser = Object.assign({}, state.user)
            //console.log('updatedUser', updatedUser)
            //updatedUser.pic = action.pic
            //return {...state, user: updatedUser}
            return {
                ...state,
                user: {...state.user, pic: action.pic}

            }
        default: return state;
    }
}