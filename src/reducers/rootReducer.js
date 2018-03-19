import { combineReducers } from 'redux'
import { teacherClassViewReducer } from './teacherClassViewReducer.js';

const RootReducer = combineReducers({
	teachersClassView: teacherClassViewReducer
})

export default RootReducer;