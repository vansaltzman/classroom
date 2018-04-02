import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from "redux";
import Answers from './Answers.jsx';
import Question from './Question.jsx';
import StudentViewQuiz from './StudentViewQuiz.jsx';
import * as actions from '../../actions/index.js';
import data from '../../../data/quizDummyData.js'
import fb from '../../../db/liveClassroom.js';


class QuizContainer extends React.Component {
  render() {
    let classId = this.props.class.id
   
    let quizId = this.props.class.activeView

    let quiz = this.props.class.quizzes[quizId].questions
    let keys = Object.keys(quiz)
    let studentId = this.props.auth.user.id

    //The question NUMBER this student is on //from student portion
    let currentQuestion = this.props.class.students[studentId].quizzes[quizId].currentQuestion

    //Student's responseObj at current question
    let quizResponseObj = this.props.class.students[studentId].quizzes[quizId]
    //The ACTUAL QUESTION this student is on // from the teachers quiz at key of students current question// to display question text
    let question = this.props.class.quizzes[quizId].questions[keys[currentQuestion]]    
    //The students ANSWERS Obj of Booleans //from student portion
    if (currentQuestion >= 0 && currentQuestion < keys.length) {
      var currentQuestionsAnswers = this.props.class.students[studentId].quizzes[quizId].responses[keys[currentQuestion]].answers
    } else {
      var currentQuestionsAnswers = {};
    }
    let questionId = keys[currentQuestion];
    
    let quizEndTime = this.props.class.quizzes[quizId].time;
    let quizDuration = this.props.class.quizzes[quizId].quizDuration;
  
    return (
      
      <div>
        <StudentViewQuiz 
<<<<<<< HEAD
=======
          // class={this.props.class}
>>>>>>> saved changes for rebase
          studentId={studentId}
          classId={classId}
          quizId={quizId}
          quizName={this.props.class.quizzes[quizId].name}
          insertStudentAnswers={fb.insertStudentAnswers}
          keys={keys}
          question={question}
          currentQuestion={currentQuestion}
          quizResponseObj={quizResponseObj}
          currentQuestionsAnswers={currentQuestionsAnswers}
          questionId={questionId}
          quizEndTime={quizEndTime}
          quizDuration={quizDuration}
        />
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    class: state.studentClassView.targetClass,
    auth: state.auth
  }
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(QuizContainer);