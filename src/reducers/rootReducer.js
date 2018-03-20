import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import { teacherClassViewReducer } from './teacherClassViewReducer';
import authReducer from './authReducers';
// note: reducers should be pure!
// no side effects
const RootReducer = combineReducers({
	teachersClassView: teacherClassViewReducer,
	auth: authReducer,
	form: formReducer
})

export default RootReducer;
