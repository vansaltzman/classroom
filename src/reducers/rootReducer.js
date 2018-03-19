import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import authReducer from './authReducers';

const RootReducer = combineReducers({
	teacherClassView: teacherClassViewReducer,
	auth: authReducer,
	form: formReducer
})

export default RootReducer;
