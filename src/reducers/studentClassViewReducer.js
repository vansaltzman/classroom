import actionTypes from '../actions/types.js';
import axios from 'axios';

export function studentClassViewReducer(state={
  classes: []
} , action) {
	switch(action.type) {
		case actionTypes.GET_CLASSES_BELONG_TO_A_STUDENT_ACTION:
		console.log('action.classes at reducers', action.classes);
		return {...state, classes: action.classes}
		default: return state
	}
}