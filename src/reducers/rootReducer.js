import { combineReducers } from 'redux'
import { teacherClassViewReducer } from './teacherClassViewReducer.js';
import {reducer as formReducer} from 'redux-form';
import authReducer from './auth_reducers';

const RootReducer = combineReducers({
	teachersClassView: teacherClassViewReducer,
	auth: authReducer,
	form: formReducer
})

export default RootReducer;
