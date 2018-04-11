// import actionTypes from '../actions/types.js';
// import students from '../../data/teacherClassViewData';
// // import questions from ''

// export function teacherQuizViewReducer(state={
// 	students: students,
// 	quizName: '',
// 	timeRemaining: 0,
// 	questions: questions
// 	// classAvg: '',
// 	// classProgress: '',
// }, action) {
//   switch(action.type) {
// 		case actionTypes.GET_QUIZ:
// 			return {...state, students: action.students, quizName: action.quizName, timeRemaining: action.timeRemaining, questions: action.questions}
// 		case actionTypes.GET_STUDENT_ANSWER:
// 			return {...state, students: action.students}
// 		// case actionTypes.END_QUIZ: // This should be handled outside of this reducer's component
// 		// 	return {...state}
// 		default: return state
// 	}
// }