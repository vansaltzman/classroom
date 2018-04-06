import actionTypes from "../actions/types.js";
import classes from "../../data/teacherClassViewData";
import axios from "axios";

export function teacherClassViewReducer(
  state = {
    classes: [],
		showClassBuilderModal: false,
		quizTime: '15:00',
		quizWeight: 10,
    newClassName: "",
    newClassSubject: "",
    newClassQuarter: "",
		newClassYear: "",
		newClassImage: "",
    subjects: [],
    allStudents: [],
    targetClass: {},
    selectedStudent: {},
		showQuizBuilderModal: false,
		showQuizLauncherModal: false,
		quizzes: {},
		questions: [],
		selectedQuestion: {},
		showAddQuestionButton: false,
		students: [],
		newQuiz: {questions: [], subject: {}},
		showThumbPoll: false,
		takenQuizzes: [],
		selectedGraphs: []
  },
  action
) {
  switch (action.type) {
		case actionTypes.TOGGLE_QUIZ_LAUNCHER:
			return {...state, showQuizLauncherModal: !state.showQuizLauncherModal}
		case actionTypes.SET_QUIZ_TIME:
			return {...state, quizTime: action.newTime}
		case actionTypes.SET_QUIZ_WEIGHT:
			return {...state, quizWeight: action.newWeight}
    case actionTypes.GET_TEACHERS_CLASSES:
      //console.log('action at reducer', action.classes);
      return { ...state, classes: action.classes };
    case actionTypes.TOGGLE_CLASS_BUILDER_MODAL:
      return { ...state, showClassBuilderModal: !state.showClassBuilderModal };
    case actionTypes.UPDATE_NEW_CLASS_NAME_ACTION:
      //console.log('changeName action', action.event.target.value)
      return { ...state, newClassName: action.event.target.value };
    case actionTypes.UPDATE_NEW_CLASS_SUBJECT_ACTION:
      return { ...state, newClassSubject: action.event.target.value };
    case actionTypes.SELECT_EXISTING_SUBJECT_ACTION:
			return { ...state, newClassSubject: action.subject.suggestion.value };
    case actionTypes.UPDATE_NEW_CLASS_QUARTER_ACTION:
      return { ...state, newClassQuarter: action.quarter.option };
    case actionTypes.UPDATE_NEW_CLASS_YEAR_ACTION:
      //console.log('reducer action.year', action.year.option)
			return { ...state, newClassYear: action.year.option };
		case actionTypes.ADD_CLASS_IMAGE_ACTION:
			console.log('imageeeee', action.imageUrl)
			return { ...state, newClassImage: action.imageUrl }
		//another case for picture
		case actionTypes.ADD_NEW_CLASS_ACTION:
			console.log('reducer add class', action.classes)
			return { ...state, classes: action.classes, targetClass: action.classes[action.classes.length - 1]}
    case actionTypes.GET_ALL_SUBJECTS:
      const subjects = action.subjects.map(each => {
        return {
          value: each.name,
          sub: each
        };
      });
      //console.log('at reducees subjects', action.subjects);
      return { ...state, subjects: subjects };
    case actionTypes.GET_ALL_STUDENTS_ACTION:
      const studentNames = action.students.map(each => {
        return {
          value: each.first_name + " " + each.last_name,
          sub: each
        };
			});
      return {
				...state,
				targetClass: {
					...state.targetClass
				},
        students: action.students,
        studentNames: studentNames
      };
    case actionTypes.UPDATE_TARGET_CLASS_ACTION:
      //console.log('reducer', action.targetClass)
      const targetClass = action.targetClass;
      targetClass.quizzes = {};
      targetClass.isLive = false;
      targetClass.activeView = false;
      return { ...state, targetClass: targetClass };
    case actionTypes.GET_STUDENTS_BELONGS_TO_A_CLASS_ACTION:
      //console.log('action.students in a class at reducers', action.students)
			const studentsObj = {};
			Object.values(action.students).forEach(student => {
				studentsObj[student.id] = {
					id: student.id,
          name: student.first_name + " " + student.last_name,
          isHere: false,
					email: student.email,
					thumbnail: student.thumbnail_url,
					thumb: -90,
          quizzes: {}
				}
			})
			return {
				...state, 
				targetClass: {
					...state.targetClass,
					students: studentsObj
				} 
			};
		case actionTypes.CLASS_GO_LIVE_ACTION:
			const goLiveClass = Object.assign({}, state.targetClass);
			goLiveClass.isLive = !state.targetClass.isLive;
			return {...state, targetClass: goLiveClass}
    case actionTypes.FETCH_CLASS_DATA:
      return { ...state };
		case actionTypes.UPDATE_CLASS_DATA_TEACHER:
			// console.log()
      //console.log(action.classData)
      return { ...state, targetClass: action.classData };
    case actionTypes.SELECT_EXISTING_STUDENT_TO_ADD:
			//console.log('selected student', action.student.suggestion)
			const studentsInClass = state.students.slice()
			studentsInClass.push(action.student.suggestion)	
      return {...state, 
				selectedStudent: action.student.suggestion,
				students: studentsInClass,
			} 
/***************************************** FIXING THIS ***************************************/
		case actionTypes.ADD_A_STUDENT_TO_CLASS_ACTION:
			console.log('studentssss', action.students)
			const withNewAddedStudents = {};
      for (var i = 0; i < action.students.length; i++) {
        let student_id = action.students[i].id;
        withNewAddedStudents[student_id] = {
          id: student_id,
          name:
            action.students[i].first_name + " " + action.students[i].last_name,
          isHere: false,
          email: action.students[i].email,
          quizzes: {}
        };
      }
			return {
				...state, 
				targetClass: {
					...state.targetClass,
					students: withNewAddedStudents
				} 
			};
			
		/**************************** QUIZ **************************/
    case actionTypes.SHOW_QUIZ_MODAL_ACTION:
			return { ...state, showQuizBuilderModal: !state.showQuizBuilderModal };
		// case actionTypes.CLOSE_QUIZ_BUILDER_MODAL:
		// 	return { ...state, showClassBuilderModal: !state.show}
		case actionTypes.SET_NEW_QUIZ_NAME_ACTION:	
			return {
				...state,
				newQuiz: {
					...state.newQuiz,
					name: action.event.target.value
				}
			}
		case actionTypes.SET_NEW_QUIZ_SUBJECT_ACTION:
			return {
				...state,
				newQuiz: {
					...state.newQuiz,
					subject: action.event.target.value
				}
			}
		case actionTypes.SET_NEW_QUIZ_SUBJECT_BY_SELECTION_ACTION:
			return {
				...state,
				newQuiz: {
					...state.newQuiz,
					subject: action.event.suggestion
				}
			}
		case actionTypes.SET_QUESTION_NUMBER_ACTION:
			const questions = state.newQuiz.questions.slice()
			questions.push({text: "", answers: []})
			return {
				...state, 
				newQuiz: {
					...state.newQuiz,
					questions: questions
				}
			};
		case actionTypes.DELETE_QUESTION_ACTION:
			const listOfquestions = state.newQuiz.questions.slice()
			listOfquestions.splice(action.index, 1)
			return {
				...state,
				newQuiz: {
					...state.newQuiz,
					questions: listOfquestions
				}
			}
		case actionTypes.ADD_QUESTION_TEXT_ACTION:
			const questionsWithText = state.newQuiz.questions.slice()
			for (var j = 0; j < questionsWithText.length; j++) {
				//console.log('j === action.index', j === action.index)
				if (j === action.index) {
					questionsWithText[action.index].text = action.event.target.value
				}
			}
			return {
				...state,
				newQuiz: {
					...state.newQuiz,
					questions: questionsWithText
				}
			}
		case actionTypes.ADD_ANSWER_ACTION:
			const questionsAddAnswers = state.newQuiz.questions.slice();
			for (var k = 0; k < questionsAddAnswers.length; k++) {
				if (k === action.index) {
					questionsAddAnswers[action.index].answers.push({text: "", isCorrect: false})
				}
			}
			return {
				...state,
				newQuiz: {
					...state.newQuiz,
					questions: questionsAddAnswers
				}
			}
			case actionTypes.DELETE_ANSWER_ACTION:
				console.log('at delete answr', action.index)
				const listOfquestionsWithAnswers = state.newQuiz.questions.slice();
				for (var indexOfQuestion = 0; indexOfQuestion < listOfquestionsWithAnswers.length; indexOfQuestion++) {
					if (indexOfQuestion === action.index) {
						var listOfAnswers = listOfquestionsWithAnswers[action.index].answers
						listOfAnswers.splice(action.answerIndex, 1)
					}
				}
				console.log('at delete answr modified', listOfquestionsWithAnswers)
				return {
					...state,
					newQuiz: {
						...state.newQuiz,
						questions: listOfquestionsWithAnswers
					}
				}
			case actionTypes.ADD_ANSWER_TEXT_ACTION:
				const questionsAddAnswerText = state.newQuiz.questions.slice();
				for (var l = 0; l < questionsAddAnswerText.length; l++) {
					if (l === action.questionIndex) {
						const question_answers = questionsAddAnswerText[action.questionIndex].answers;
						for (var m = 0; m < question_answers.length; m++) {
							if (m === action.answerIndex) {
								question_answers[action.answerIndex].text = action.event.target.value
							}
						}
					}
				}
				return {
					...state,
					newQuiz: {
						...state.newQuiz,
						questions: questionsAddAnswerText
					}
				}
			case actionTypes.CHOOSE_CORRECT_ANSWER_ACTION:
				//console.log(action.questionIndex, action.answerIndex)
				const questionsCheckCorrect = state.newQuiz.questions.slice();
				for (var n = 0; n < questionsCheckCorrect.length; n++) {
					if (n === action.questionIndex) {
						const question_answers = questionsCheckCorrect[action.questionIndex].answers;
						for (var p = 0; p < question_answers.length; p++) {
							if (p === action.answerIndex) {
								//console.log('isCorrect', state.newQuiz.questions[action.questionIndex].answers[action.answerIndex].isCorrect)
								question_answers[action.answerIndex].isCorrect = !state.newQuiz.questions[action.questionIndex].answers[action.answerIndex].isCorrect
							}
						}
					}
				}
				return {
					...state,
					newQuiz: {
						...state.newQuiz,
						questions: questionsCheckCorrect
					}
				}
		case actionTypes.ADD_NEW_QUIZZES:
			console.log('refetched quizzes at reducer', action.quizzes)
			const refetched = action.quizzes;
			refetched.map((eachQuiz) => {
				eachQuiz.questions = eachQuiz.questions.reduce((acc, eachQuestion) => {
					let qId = eachQuestion.id
					acc[qId] = eachQuestion
					return acc
				}, {})
				return eachQuiz
			})
			refetched.map((eachQuiz) => {
				for (var key in eachQuiz.questions) {
					eachQuiz.questions[key].answers = Object.values(eachQuiz.questions[key].answers).reduce((accumulator, each) => {
						let eachAnswerId = each.id
						accumulator[eachAnswerId] = each
						return accumulator
					}, {})
				}
				return eachQuiz
			})
			refetched.reduce((acc, quiz) => {
				let quizsId = quiz.id;
				acc[quizsId] = quiz;
				return acc;
			}, {})
			const resetNewQuiz = {questions: [], subject: {}}
			return {
				...state,
				quizzes: refetched,
				showQuizBuilderModal: false,
				newQuiz: resetNewQuiz
			}
		case actionTypes.FETCH_QUIZZES:
			const quizzes = action.quizzes;
			//console.log('reducer action.quizzes', action.quizzes)
			quizzes.map((eachQuiz) => {
				eachQuiz.questions = eachQuiz.questions.reduce((acc, eachQuestion) => {
					let questionId = eachQuestion.id
					acc[questionId] = eachQuestion
					return acc
				}, {})
				return eachQuiz
			})
			quizzes.map((eachQuiz) => {
				for (var key in eachQuiz.questions) {
					var answerArray = eachQuiz.questions[key].answers
					eachQuiz.questions[key].answers = eachQuiz.questions[key].answers
				}
				return eachQuiz
			})
			quizzes.reduce((acc, quiz) => {
				let quizId = quiz.id;
				acc[quizId] = quiz;
				return acc;
			}, {})
			//console.log('modified quizzes', quizzes);
			return {
				...state, quizzes: quizzes
			}
			case actionTypes.FETCH_QUESTIONS:
				console.log('questions FETCH_QUESTIONS at reducers', action.questions)
				for (var qIndex = 0; qIndex < action.questions.length; qIndex++) {
					var sum = 0;
					for (var timeIndex = 0; timeIndex < action.questions[qIndex].timeSpent.length; timeIndex++) {
						var time = action.questions[qIndex].timeSpent[timeIndex]
						sum += time
					}
					var average = Math.round(sum / action.questions[qIndex].timeSpent.length/60/60);
					action.questions[qIndex].timeAvg = average;
				}
				console.log('question with Avg', action.questions)
				return {
					...state,
					questions: action.questions
				}
			case actionTypes.SELECT_QUESTION:
				//console.log('selection question', action.selectedQuestion)
				return {
					...state, 
					selectedQuestion: action.selectedQuestion,
					showAddQuestionButton: true
				}
			case actionTypes.ADD_RECYCLED_QUESTION:
				//console.log('at add recycled question', action.question)
				const newSetOfQuestions = state.newQuiz.questions;
				newSetOfQuestions.push(action.question);
				return {
					...state,
					newQuiz: {
						...state.newQuiz,
						questions: newSetOfQuestions
					}
				}
			case actionTypes.TOGGLE_THUMBPOLL:
			return {...state, showThumbPoll: !state.showThumbPoll}
			case actionTypes.GET_TAKEN_QUIZZES_ACTION:
				console.log('action.quizzes taken quizzes', action.quizzes);
				var quizAverages = {}
				var studentsAndPerformances = {};
				for (var quizIndex = 0; quizIndex < action.quizzes.length; quizIndex++) {
					let quizDiscrete = {
						A: 0,
						B: 0,
						C: 0,
						D: 0,
						F: 0
					}
					let quizSum = 0;
					let quizId = action.quizzes[quizIndex].id;
					let quizAverage;
					let students = action.quizzes[quizIndex].students;
					let numberOfStudents = students.length;
					for (var studentIndex = 0; studentIndex < numberOfStudents; studentIndex++) {	
						let studentSum = 0;
						const studentId = students[studentIndex].id;
						const letterGrade = "";
						const scores = {}
						const eachStudent = action.quizzes[quizIndex].students[studentIndex]
						const eachStudentResponses = Object.values(eachStudent.responses);
						const numberOfResponses = eachStudentResponses.length;
						for (var responseIndex = 0; responseIndex < eachStudentResponses.length; responseIndex++) {
							if (eachStudentResponses[responseIndex].correct === true) {
								studentSum += 1;
							}
						}
						const studentScore = (studentSum / numberOfResponses) * 100;
						if (studentScore >= 90 && studentScore <= 100) {
							quizDiscrete.A += 1;
						} else if (studentScore >= 80 && studentScore < 90) {
							quizDiscrete.B += 1;
						} else if (studentScore >= 70 && studentScore < 80) {
							quizDiscrete.C += 1; 
						} else if (studentScore >= 65 && studentScore < 70) {
							quizDiscrete.D += 1;
						} else if (studentScore < 65) {
							quizDiscrete.F += 1;
						}
						scores[action.quizzes[quizIndex].id] = studentScore;
						quizSum += studentScore;
						eachStudent.scores = scores
						if (studentsAndPerformances[studentId] === undefined) {
							studentsAndPerformances[studentId] = {
								value: eachStudent.first_name + ' ' + eachStudent.last_name,
								thumbnail: eachStudent.thumbnail_url,
								sub: [eachStudent.scores]
							}
						} else {
							studentsAndPerformances[studentId].sub.push(eachStudent.scores)
						}
					}
					quizAverage = Math.round(quizSum / numberOfStudents);
					action.quizzes[quizIndex].average = quizAverage
					action.quizzes[quizIndex].quizDiscrete = quizDiscrete
					quizAverages[action.quizzes[quizIndex].id] = quizAverage
				}
				var quizAveragesSub = Object.keys(quizAverages).map((eachKey) => {
					let quizObj = {};
					quizObj[eachKey] = quizAverages[eachKey]
					return quizObj
				})
				const quizAverageGraph = {
					value: "Averages",
					sub: quizAveragesSub
				}
				const graphsWithAverages = state.selectedGraphs.slice()
				graphsWithAverages.push(quizAverageGraph);
				return {
					...state, 
					takenQuizzes: action.quizzes, 
					takenQuizzesAverages: quizAverages, 
					selectedGraphs: graphsWithAverages,
					studentsAndPerformances: studentsAndPerformances
				}

				case actionTypes.SELECT_GRAPH_TO_SHOW_ACTION:
				//console.log("action.target.suggestion.value", action.target.option)
					const graphs = state.selectedGraphs.slice();
					const colors = ['accent-1', 'graph-2', 'graph-3', 'accent-2', 'accent-3','accent-1', 'graph-2', 'graph-3', 'accent-2', 'accent-3', 'accent-1', 'graph-2', 'graph-3', 'accent-2', 'accent-3'];
					const color = colors[Math.floor(Math.random()*colors.length)];
					if (graphs.indexOf(action.target.option) === -1) {
						action.target.option.color = color;
						graphs.push(action.target.option);
					}
				return {
					...state,
					selectedGraphs: graphs
				}

				case actionTypes.REVERSE_GRAPH_SELECTION_ACTION:
				console.log("action.index", action.index)
				const updateSelectedGraphs = state.selectedGraphs.slice()
				for (var gIndex = 0 ; gIndex < updateSelectedGraphs.length; gIndex++) {
					if (gIndex === action.index + 1) {
						updateSelectedGraphs.splice(action.index + 1, 1)
					}
				}
				return {...state, selectedGraphs: updateSelectedGraphs}
    default:
      return state;
  }
}
