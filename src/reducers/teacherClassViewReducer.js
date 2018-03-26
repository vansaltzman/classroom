import actionTypes from '../actions/types.js';
import classes from '../../data/teacherClassViewData';
import axios from 'axios';

export function teacherClassViewReducer(state={
	classes: [],
	showClassBuilderModal: false,
	showQuizLauncherModal: false,
	quizTime: '15:00',
	newClassName: '',
	newClassSubject: '',
	newClassQuarter: '',
	newClassYear: '',
	allStudents: [],
	targetClass: {}
}, action) {
  switch(action.type) {
		case actionTypes.GET_TEACHERS_CLASSES:
			//console.log('action at reducer', action.classes);
			return {...state, classes: action.classes}
		case actionTypes.TOGGLE_CLASS_BUILDER_MODAL:
			return {...state, showClassBuilderModal: !state.showClassBuilderModal}
		case actionTypes.TOGGLE_QUIZ_LAUNCHER:
			return {...state, showQuizLauncherModal: !state.showQuizLauncherModal}
		case actionTypes.SET_QUIZ_TIME:
			return {...state, quizTime: action.newTime}
		case actionTypes.UPDATE_NEW_CLASS_NAME_ACTION:
			//console.log('changeName action', action.event.target.value)
			return {...state, newClassName: action.event.target.value}
		case actionTypes.UPDATE_NEW_CLASS_SUBJECT_ACTION:
			return {...state, newClassSubject: action.event.target.value}
		case actionTypes.UPDATE_NEW_CLASS_QUARTER_ACTION:
			return {...state, newClassQuarter: action.quarter.option}
		case actionTypes.UPDATE_NEW_CLASS_YEAR_ACTION:
			//console.log('reducer action.year', action.year.option)
			return {...state, newClassYear: action.year.option}
		case actionTypes.GET_ALL_STUDENTS_ACTION:
			const studentNames = action.students.map((each) => {
				return each.first_name
			}) 
			return {...state, students: action.students, studentNames: studentNames}
		case actionTypes.UPDATE_TARGET_CLASS_ACTION:
			//console.log('reducer', action.targetClass)
			const targetClass = action.targetClass;
			targetClass.quizzes = {};
			targetClass.isLive = false;
			targetClass.activeView = false;
			return {...state, targetClass: targetClass}
		case actionTypes.GET_STUDENTS_BELONGS_TO_A_CLASS_ACTION:
			//console.log('action.students in a class at reducers', action.students)
			const studentsObj = {};
			for (var i = 0; i < action.students.length; i++) {
				let student_id = action.students[i].id;
				studentsObj[student_id] = {
					id: student_id,
					name: action.students[i].first_name + ' ' + action.students[i].last_name,
					isHere: false,
					email: action.students[i].email,
					quizzes: {}
				}
			}
			//console.log('formatted students obj', studentsObj)
			const targetClassWithStudents = state.targetClass;
			targetClassWithStudents.students = studentsObj;
			//console.log('class with students', targetClassWithStudents)
			return {...state, targetClass: targetClassWithStudents}
		case actionTypes.CLASS_GO_LIVE_ACTION:
			const goLiveClass = Object.assign({}, state.targetClass);
			goLiveClass.isLive = !state.targetClass.isLive;
			return {...state, targetClass: goLiveClass}
		case actionTypes.FETCH_CLASS_DATA:
			return {...state}
		case actionTypes.UPDATE_CLASS_DATA_TEACHER:
		console.log(action.classData)
			return {...state, targetClass: action.classData}
		default: return state
	}
}