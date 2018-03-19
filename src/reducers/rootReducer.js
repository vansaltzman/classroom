import { combineReducers } from 'redux'
import { teachersClassView } from './teacherClassViewReducer';

const RootReducer = combineReducers({
	teachersClassView: teachersClassView
})

export default RootReducer;