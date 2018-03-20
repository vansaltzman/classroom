import actionTypes from '../actions/types.js';
import classes from '../../data/teacherClassViewData';

export function teacherClassViewReducer(state={
	classes: classes
}, action) {
  switch(action.type) {
		case actionTypes.GET_TEACHERS_CLASSES:
			console.log('action', action);
			return {...state, classes: action.classes}
		default: return state
	}
}