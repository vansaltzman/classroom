import actionTypes from '../actions/types.js';
import { students, allStudents } from '';
import { quizzes, questions } from '';


export function teacherQuizViewReducer(state={
	students: students,
	allStudents: allStudents, // Used for the autocomplete for adding a new student to a class
	quizzes: quizzes,
	questions: questions,
	className: '',
	showQuizModal: false, // Used to show or hide a specific quiz allowing for editing/adding/removing questions and launching quiz
	// classProgress: '',

}, action) {
  switch(action.type) {
		case actionTypes.GET_STUDENTS:
			return {...state, students: action.students}
		case actionTypes.GET_ALL_STUDENTS:
			return {...state, allStudents: action.allStudents}
			case actionTypes.ADD_STUDENT:
				return {...state, students: action.students}
			

		case actionTypes.TOGGLE_QUIZ_MODAL:
			return {...state, showQuizModal: }
		case actionTypes.GET_QUIZ_TEMPLATES:
			return {...state, quizzes: action.quizzes}
		case actionTypes.GET_QUESTION_TEMPLATES:
			return {...state, questions: action.questions}

		case actionTypes.CREATE_QUESTOIN:
			return {...state, questions: action.questions}
		case actionTypes.CREATE_QUIZ:
			return {...state, newClassYear: action.year.option}

		default: return state
	}
}