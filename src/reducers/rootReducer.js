import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import { teacherClassViewReducer } from './teacherClassViewReducer';
import { teacherQuizViewReducer } from './teacherQuizViewReducer';
import { studentViewQuizReducer } from './studentViewQuizReducer'
import authReducer from './authReducers';
import { routerReducer } from 'react-router-redux';
import {liveClassReducer} from './liveClassReducers'
// note: reducers should be pure!
// no side effects
const RootReducer = combineReducers({
	studentViewQuiz: studentViewQuizReducer,
	teachersClassView: teacherClassViewReducer,
	// teachersQuizView: teacherQuizViewReducer,
	auth: authReducer,
	form: formReducer,
	routing: routerReducer,
	liveClass: liveClassReducer
})

export default RootReducer;
