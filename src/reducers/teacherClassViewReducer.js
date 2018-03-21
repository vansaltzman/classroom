import actionTypes from '../actions/types.js';
import classes from '../../data/teacherClassViewData';

export function teacherClassViewReducer(state={
	classes: classes,
	showClassBuilderModal: false,
	newClassName: '',
	newClassSubject: '',
	newClassQuarter: '',
	newClassYear: ''
	// newClass: {
	// 	className: '',
	// 	thumbnail: "https://regmedia.co.uk/2016/10/17/javascript_photo_via_shutterstock.jpg?x=442&y=293&crop=1",
	// 	subject: '',
	// 	quarter: '',
	// 	year: ''
	// }
}, action) {
  switch(action.type) {
		case actionTypes.GET_TEACHERS_CLASSES:
			//console.log('action', action);
			return {...state, classes: action.classes}
		case actionTypes.TOGGLE_CLASS_BUILDER_MODAL:
			return {...state, showClassBuilderModal: !state.showClassBuilderModal}
		case actionTypes.UPDATE_NEW_CLASS_NAME_ACTION:
			//console.log('changeName action', action.event.target.value)
			return {...state, newClassName: action.event.target.value}
		case actionTypes.UPDATE_NEW_CLASS_SUBJECT_ACTION:
			return {...state, newClassSubject: action.event.target.value}
		case actionTypes.UPDATE_NEW_CLASS_QUARTER_ACTION:
			return {...state, newClassQuarter: action.quarter.option}
		case actionTypes.UPDATE_NEW_CLASS_YEAR_ACTION:
			return {...state, newClassYear: action.year.option}
		case actionTypes.ADD_NEW_CLASS_ACTION:
			const newClass = {
				className: state.newClassName,
				subject: state.newClassSubject,
				year: state.newClassYear,
				quarter: state.newClassQuarter
			}
			console.log('new Class', newClass);
			return {...state, newClass: newClass}
		default: return state
	}
}