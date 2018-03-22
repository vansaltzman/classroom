import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import { teacherClassViewReducer } from './teacherClassViewReducer';
import authReducer from './authReducers';
import { routerReducer } from 'react-router-redux';
import {liveClassReducer} from './liveClassReducers'
// note: reducers should be pure!
// no side effects
const RootReducer = combineReducers({
	teachersClassView: teacherClassViewReducer,
	auth: authReducer,
	form: formReducer,
	routing: routerReducer,
	liveClass: liveClassReducer
})

export default RootReducer;
