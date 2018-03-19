import { combineReducers } from 'redux'
import { teachersClassView } from './teacherClassViewReducer';
import {reducer as formReducer} from 'redux-form';
import authReducer from './auth_reducers';

const RootReducer = combineReducers({
	teachersClassView: teachersClassView,
	auth: authReducer,
	form: formReducer
})

export default RootReducer;