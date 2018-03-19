import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import authReducer from './auth_reducers';
import { teacherClassViewReducer } from './teacherClassViewReducer.js';

const RootReducer = combineReducers({
	teacherClassView: teacherClassViewReducer,
	auth: authReducer,
	form: formReducer
})

export default RootReducer;
