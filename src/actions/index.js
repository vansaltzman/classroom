import axios from 'axios';  
import { browserHistory } from 'react-router';  
import actionTypes from './types';
import classes from '../../data/teacherClassViewData.js';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwt from 'jsonwebtoken';
import { fb, updateActiveView, stopFetchingClassData  } from '../../db/liveClassroom.js';
import studentQuizObjConverter from '../utils/studentQuizObjConverter.js';
import dummyStudentsData from '../../db/dummyStudentsData';



const serverURL = 'http://localhost:3000';


export function loginUser({ email, password }) {  
    return function(dispatch) {
      axios.post(`${serverURL}/auth/login`, { email, password })
      .then((res) => {
		const token = res.data.token
		localStorage.setItem('jwtToken', token);
		setAuthorizationToken(token);
		const decoded = jwt.decode(token)
        dispatch(setCurrentUser(jwt.decode(token)))
      })
      .catch((error) => {
          console.log('error in loggin in ', error)
      });
      }
	}

export function setCurrentUser (user) {
    return {
        type: actionTypes.SET_CURRENT_USER,
		user: user
    }
}

export function logoutUser () {
	return (dispatch) => {
		// localStorage.removeItem('jwtToken');
		localStorage.clear();
		setAuthorizationToken(false);
		dispatch(setCurrentUser({}));
	}
}
 

/********************************** GET CLASSES TO DISPLAY ON TEACHERS MAIN VIEW ***********************************/
function getTeacherEmail(state) {
	return {
		email: state().auth.user.email
	}
}

export function getClasses(emailObj) {
	return (dispatch) => {
		axios.post('/allClasses', emailObj)
		.then((res) => {
			dispatch(getClassesAction(res.data))
		})
	}
}

function getClassesAction(classes) {
  return {
		type: actionTypes.GET_TEACHERS_CLASSES,
		classes
	}
}

//show class builder modal
export function toggleModalAction() {
	return {
		type: actionTypes.TOGGLE_CLASS_BUILDER_MODAL
	}
}

export function toggleQuizLauncherModalAction() {
	return {
		type: actionTypes.TOGGLE_QUIZ_LAUNCHER
	}
}

export function setQuizTime(newTime) {
	return {
		type: actionTypes.SET_QUIZ_TIME,
		newTime
	}
}


export function getQuizzes(teacherId) {
	return (dispatch) => {
		axios.get('/quizzes', {params: {id: teacherId}})
		.then((res) => {
			dispatch(getQuizzesAction(res.data))
		})
	}
}

function getQuizzesAction(quizzes) {
  return {
		type: actionTypes.GET_QUIZZES,
		quizzes
	}
}



/************************** CLASS BUILDER MODAL *************************/
export function updateNewClassName(event) {
	return (dispatch) => {
		dispatch(updateNewClassNameAction(event))
	}
}
function updateNewClassNameAction(event) {
	return {
		type: actionTypes.UPDATE_NEW_CLASS_NAME_ACTION,
		event
	}
}

export function updateNewClassSubject(event) {
	return (dispatch) => {
		dispatch(updateNewClassSubjectAction(event))
	}
}
function updateNewClassSubjectAction(event) {
	return {
		type: actionTypes.UPDATE_NEW_CLASS_SUBJECT_ACTION,
		event
	}
}

export function selectExistingSubjectToAdd(subject) {
	return (dispatch) => {
		dispatch(selectExistingSubjectToAddAction(subject))
	}
}

function selectExistingSubjectToAddAction (subject) {
	return {
		type: actionTypes.SELECT_EXISTING_SUBJECT_ACTION,
		subject
	}
}

export function updateNewClassQuarter(quarter) {
	return (dispatch) => {
		dispatch(updateNewClassQuarterAction(quarter))
	}
}
function updateNewClassQuarterAction(quarter) {
	return {
		type: actionTypes.UPDATE_NEW_CLASS_QUARTER_ACTION,
		quarter
	}
}

export function updateNewClassYear(year) {
	return (dispatch) => {
		dispatch(updateNewClassYearAction(year));
	}
}
function updateNewClassYearAction(year) {
	return {
		type: actionTypes.UPDATE_NEW_CLASS_YEAR_ACTION,
		year
	}
}

export function addNewClass(reqObj) {
	return (dispatch) => {
		axios.post('/addClass', reqObj)
		.then((res) => {
			console.log('all classes coming back after class is added', res.data)
			dispatch(addNewClassAction(res.data))
		})
	}
}
function addNewClassAction(classes) {
	return {
		type: actionTypes.ADD_NEW_CLASS_ACTION,
		classes
	}
}

export function getAllExistingSubjects() {
	return (dispatch) => {
		axios.get('/getAllSubjects')
		.then((res) => {
			console.log('at actions subjects', res.data)
			dispatch(getAllExistingSubjectsAction(res.data))
		})
	}
}
function getAllExistingSubjectsAction(subjects) {
	return {
		type: actionTypes.GET_ALL_SUBJECTS,
		subjects
	}
}

/******************** LIVE CLASS VIEW ********************/
//this should make a call to db to get the target information including 
//students belongs to that class & quizzes that belong to the teacher (quizzes later)
export function teacherEnterClass() {
	return (dispatch) => {
		axios.get('/getTargetClass')
		.then((res) => {
			dispatch(teacherEnterClassAction(res.data))
		})	
	}
}

//when a teacher enter a class, add to the store a target class obj
export function updateTargetClass(targetClass) {
	return (dispatch) => {
		dispatch(updateTargetClassAction(targetClass))
	}
}
function updateTargetClassAction(targetClass) {
	return {
		type: actionTypes.UPDATE_TARGET_CLASS_ACTION,
		targetClass
	}
}

export function getAllStudents() {
	return (dispatch) => {
		axios.get('/getAllStudents')
		.then((res) => {
			//console.log('all students', res.data);
			dispatch(getAllStudentsAction(res.data));
		})
	}
}
function getAllStudentsAction(students) {
	return {
		type: actionTypes.GET_ALL_STUDENTS_ACTION,
		students
	}
}

export function getStudentsBelongToAClass(idObj) {
	//console.log('console.log', idObj)
	return (dispatch) => {
		axios.post('/getAllStudentsInAClass', idObj)
		.then((res) => {
			//console.log('dataaaaaa', res.data);
			dispatch(getStudentsBelongToAClassAction(res.data))
		})
	}
}
function getStudentsBelongToAClassAction(students) {
	return {
		type: actionTypes.GET_STUDENTS_BELONGS_TO_A_CLASS_ACTION,
		students
	}
}

export function classGoLive(classId, classObj) {
	classObj.handRaisedQueue= {};
	classObj.thumbTotal = -90
	for (var studentId in classObj.students) {
		classObj.students[studentId].handRaised = false;
	}
	return (dispatch) => {
		const classes = fb.ref('/classes');
		classes.child(classId).set(classObj)
		.then(() => {
			dispatch(fetchClassData(classId, 'teacher'))
		})
		.then(()=> {
			console.log('It is here')
			const liveClass = fb.ref('/classes/' + classId)
			return liveClass.child('isLive').set(true)
		})
	}
}
function classGoLiveAction(classes) {
	return {
		type: actionTypes.CLASS_GO_LIVE_ACTION,
		classes
	}
}

//student's main view to see which class is currently live
export function watchClassGoLive(shouldStop) {
	return (dispatch) => {
		if (shouldStop === 'stop') {
			fb.ref('/classes').off('value', (snap) => {
				// dispatch(watchClassGoLiveAction(snap.toJSON()))
				console.log('WATCH OFF snap.val() ------> ', snap.val())
			})
		} else {
			fb.ref('/classes').on('value', (snap) => {
				dispatch(watchClassGoLiveAction(snap.toJSON()))
			})
		}
	}
}
function watchClassGoLiveAction(classes) {
	console.log('classes ------> ', classes)
	return {
		type: actionTypes.WATCH_CLASS_GO_LIVE_ACTION,
		classes
	}
}


export function getClassStatus(classId) {
	return (dispatch) => {
		return fb.ref('/classes/' + classId + '/isLive').once('value')
			.then(snap => {
				console.log('Is class live?', snap.val())
				if (snap.val()) {
					dispatch(fetchClassData(classId, 'teacher'))
					return
				} else {
					dispatch(getClassStatusAction(snap.val()))
					return
				}
			})
	}
} 
function getClassStatusAction(classStatus) {
	type: actionTypes.GET_CLASS_STATUS,
	classStatus
}


export function updateQuizWeight(weight) {
	return {
		type: actionTypes.SET_QUIZ_WEIGHT,
		newWeight
	}
}
export function selectStudentToAdd(student) {
	return (dispatch) => {
		dispatch(selectStudentToAddAction(student))
	}
}

function selectStudentToAddAction (student) {
	return {
		type: actionTypes.SELECT_EXISTING_STUDENT_TO_ADD,
		student
	}
}

export function addAStudentToClass(studentObj) {
	console.log('selected student to be added', studentObj)
	return (dispatch) => {
		axios.post('/addAStudentToClass', studentObj)
		.then((res) => {
			console.log('at add student action', res.data)
			dispatch(addAStudentToClassAction(res.data))
		})
	}
}

function addAStudentToClassAction (students) {
	return {
		type: actionTypes.ADD_A_STUDENT_TO_CLASS_ACTION,
		students
	}
}

/******************************* GET ALL CLASSES THAT BELONGS TO A STUDENT **********************************/

export function getClassesBelongToAStudent(studentIdObj) {
	return (dispatch) => {
		return axios.post('/getStudentsClasses', studentIdObj)
		.then((res) => {
			//console.log('students classes', res.data)
			return dispatch(getClassesBelongToAStudentAction(res.data))
		})
	}
}
function getClassesBelongToAStudentAction(classes) {
	return {
		type: actionTypes.GET_CLASSES_BELONG_TO_A_STUDENT_ACTION,
		classes
	}
}

export function updateStudentTargetClass(targetClass) {
	return (dispatch) => {
		return dispatch(updateStudentTargetClassAction(targetClass))
	}
}
function updateStudentTargetClassAction(targetClass) {
	return {
		type: actionTypes.UPDATE_STUDENT_TARGET_CLASS_ACTION,
		targetClass
	}
}

// join/exit live class from student pov
export function toggleStudentLiveClassStatus (classId, studentId) {
	console.log('Toggle Student Class Status' , classId, studentId)
	const currentStudentStatus = fb.ref('/classes/' + classId + '/students/' + studentId + '/isHere')
	return (dispatch) => {
		currentStudentStatus.once('value')
		.then(snap => {
			currentStudentStatus.set(!snap.val())
		})
		.then(()=> {
			dispatch(toggleStudentLiveClassStatusAction())
			return currentStudentStatus.once('value')
		})
		.then((snap) => {
			const status = snap.val();
			// if (status) {
				console.log(' ------> Fetch Class Data Student')
				dispatch(fetchClassData(classId, 'student'))
			// } else {
			// 	dispatch(stopFetchingClassData(classId))
			// }
		})
	}
}
function toggleStudentLiveClassStatusAction () {
		return {
			type: actionTypes.TOGGLE_STUDENT_LIVE_STATUS
		}
	}

 
// get all class data for a live class
export function fetchClassData (classId, type) {
	console.log('classId, type ------> ', classId, type)
	const currentClass = fb.ref('/classes/' + classId )
	return (dispatch) => {
		currentClass.on('value', function(snap) {
			if(type === 'teacher') {
				dispatch(updateClassDataTeacher(snap.toJSON()))
			} 
			if (type === 'student') {
				console.log('snap.val(stud) ------> ', snap.val())
				dispatch(updateClassDataStudent(snap.toJSON()))
			}
		})
	}
}

// update global state with updated live class data
export function updateClassDataStudent(classData) {
	return {
		type: actionTypes.UPDATE_CLASS_DATA_STUDENT,
		classData
	}
}

export function updateClassDataTeacher(classData) {
	return {
		type: actionTypes.UPDATE_CLASS_DATA_TEACHER,
		classData
	}
}
//**************** STUDENT VIEW QUIZ *******************

export function getQuiz() {
	return {
		type: actionTypes.GET_QUIZ
	}
}

export function nextQuestion() {
	return {
		type: actionTypes.NEXT_QUESTION
	}
}

export function previousQuestion() {
	return {
		type: actionTypes.PREVIOUS_QUESTION
	}
}

export function showThumbPollAction(){
	return {
		type: actionTypes.TOGGLE_THUMBPOLL
	}
} 

/******************************************** QUIZ/QUESTION BUILDER ***************************************/
export function showQuizModal() {
	return (dispatch) => {
		console.log('Did we get here?')
		dispatch(showQuizModalAction())
	}
}
function showQuizModalAction() {
	return {
		type: actionTypes.SHOW_QUIZ_MODAL_ACTION
	}
}

export function closeQuizBuilderModal() {
	return (dispatch) => {
		dispatch(closeQuizBuilderModalAction())
	}
}
function closeQuizBuilderModalAction() {
	return {
		type: actionTypes.CLOSE_QUIZ_BUILDER_MODAL
	}
}
// SET_NEW_QUIZ_NAME_ACTION: 'set_new_quiz_name_action',
// SET_NEW_QUIZ_SUBJECT_ACTIOn: 'set_new_quiz_subject_action'
export function setNewQuizName(event) {
	return (dispatch) => {
		dispatch(setNewQuizNameAction(event))
	}
}
function setNewQuizNameAction(event) {
	return {
		type: actionTypes.SET_NEW_QUIZ_NAME_ACTION,
		event
	}
}

export function setNewQuizSubject(event) {
	return (dispatch) => {
		dispatch(setNewQuizSubjectAction(event))
	}
}
function setNewQuizSubjectAction(event) {
	return {
		type: actionTypes.SET_NEW_QUIZ_SUBJECT_ACTION,
		event
	}
}

export function setNewQuizSubjectBySelection(event) {
	return (dispatch) => {
		dispatch(setNewQuizSubjectBySelectionAction(event))
	}
}
function setNewQuizSubjectBySelectionAction(event) {
	return {
		type: actionTypes.SET_NEW_QUIZ_SUBJECT_BY_SELECTION_ACTION,
		event
	}
}

export function setQuestionNumber() {
	return (dispatch) => {
		dispatch(setQuestionNumberAction())
	}
}
function setQuestionNumberAction() {
	return {
		type: actionTypes.SET_QUESTION_NUMBER_ACTION
	}
}

export function deleteQuestion(index) {
	return (dispatch) => {
		dispatch(deleteQuestionAction(index))
	}
}
function deleteQuestionAction(index) {
	return {
		type: actionTypes.DELETE_QUESTION_ACTION,
		index
	}
}

export function addQuestionText(event,index) {
	return(dispatch) => {
		dispatch(addQuestionTextAction(event,index))
	}
}
function addQuestionTextAction(event, index) {
	return {
		type: actionTypes.ADD_QUESTION_TEXT_ACTION,
		event,
		index
	}
}

export function addAnswer(index) {
	return (dispatch) => {
		dispatch(addAnswerAction(index))
	}
}
function addAnswerAction(index) {
	return {
		type: actionTypes.ADD_ANSWER_ACTION,
		index
	}
}

export function deleteAnswer(index, answerIndex) {
	return (dispatch) => {
		dispatch(deleteAnswerAction(index, answerIndex))
	}
}
function deleteAnswerAction(index, answerIndex) {
	return {
		type: actionTypes.DELETE_ANSWER_ACTION,
		index,
		answerIndex
	}
}

export function addAnswerText(event, questionIndex, answerIndex) {
	return (dispatch) => {
		dispatch(addAnswerTextAction(event, questionIndex, answerIndex))
	}
}
function addAnswerTextAction(event, questionIndex, answerIndex) {
	return {
		type: actionTypes.ADD_ANSWER_TEXT_ACTION,
		event,
		questionIndex,
		answerIndex
	}
}

export function chooseCorrectAnswer(questionIndex, answerIndex) {
	return (dispatch) => {
		dispatch(chooseCorrectAnswerAction(questionIndex, answerIndex));
	}
}
function chooseCorrectAnswerAction(questionIndex, answerIndex) {
	return {
		type: actionTypes.CHOOSE_CORRECT_ANSWER_ACTION,
		questionIndex,
		answerIndex
	}
}

export function addNewQuiz(teacherId, quizObj) {
	return (dispatch) => {
		axios.post('/addQuiz', teacherId, quizObj)
		.then((res) => {
			//console.log('refetched quizzes at action', res.data)
			dispatch(addNewQuizzesAction(res.data))
		})
	}
}
function addNewQuizzesAction(quizzes) {
	return {
		type: actionTypes.ADD_NEW_QUIZZES,
		quizzes
	}
}

export function fetchQuizzes(reqObj) {
	return (dispatch) => {
		axios.post('/getQuizzes', reqObj)
		.then((res) => {
			console.log('data from server for all quizzes', res.data)
			dispatch(fetchQuizzesAction(res.data))
		})
	}
}
function fetchQuizzesAction(quizzes) {
	return {
		type: actionTypes.FETCH_QUIZZES,
		quizzes
	}
}

export function fetchQuestions(reqObj) {
	//reqObj should have teacher Id and subject Id
	return (dispatch) => {
		axios.post('/fetchQuestions', reqObj)
		.then((res) => {
			dispatch(fetchQuestionsAction(res.data))
		}) 
	}
}
function fetchQuestionsAction(questions) {
	return {
		type: actionTypes.FETCH_QUESTIONS,
		questions
	}
}

export function selectedQuestion(selectedQuestion) {
	return (dispatch) => {
		dispatch(selectQuestionAction(selectedQuestion))
	}
}
function selectQuestionAction(selectedQuestion) {
	return {
		type: actionTypes.SELECT_QUESTION,
		selectedQuestion
	}
}

export function addRecycledQuestion(question) {
	return (dispatch) => {
		dispatch(addRecycledQuestionAction(question))
	}
}
function addRecycledQuestionAction(question) {
	return {
		type: actionTypes.ADD_RECYCLED_QUESTION,
		question
	}
}

/*********************** Student Quiz Grades view ***************************************/

export function getQuizDataForStudentInClass(reqObj) {
	return (dispatch) => {
		axios.post('/getQuizDataForStudentInClass', reqObj)
<<<<<<< HEAD
<<<<<<< HEAD
		.then((studentQuizData) => {
			console.log('data from server for all quizzes in student quiz data', studentQuizData.data)
			dispatch(getQuizDataForStudentAction(studentQuizData.data))
		})
	}
}
function getQuizDataForStudentAction(studentQuizData) {
	return {
		type: actionTypes.ADD_STUDENT_QUIZ_GRADES_STUDENTVIEW,
		quizData: studentQuizData
	}
=======
		.then((res) => {
			console.log('data from server for all quizzes', res.data)
			// dispatch(fetchQuizzesAction(res.data))
		})
	}
>>>>>>> saved changes for rebase
=======
		.then((studentQuizData) => {
			console.log('data from server for all quizzes', studentQuizData.data)
			dispatch(getQuizDataForStudentAction(studentQuizData.data))
		})
	}
}
function getQuizDataForStudentAction(studentQuizData) {
	return {
		type: actionTypes.ADD_STUDENT_QUIZ_GRADES_STUDENTVIEW,
		quizData: studentQuizData
	}
>>>>>>> add quiz data for a student to props
}