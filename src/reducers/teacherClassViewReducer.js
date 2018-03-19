import actionTypes from '../actions/types.js';

export function teacherClassViewReducer(state={}, action) {
  switch(action.type) {
		case actionTypes.GET_TEACHERS_CLASSES:
			console.log(action.classes);
			return {...state, classes: action.classes}
		default: return state
	}
}