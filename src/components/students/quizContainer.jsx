import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from "redux";
import Answers from './Answers.jsx';
import Question from './Question.jsx';
import StudentViewQuiz from './StudentViewQuiz.jsx';
import * as actions from '../../actions/index.js';
import data from '../../../data/quizDummyData.js'
//import reducers?



class QuizContainer extends React.Component {

  render() {

    console.log('PROPS IN CONTAINER',this.props)
 //let classId = this.props.class[this.props.class.id]
 let classId ='25'
 //let quizId = this.props.class[classId].activeView
 let quizId = '12'
 //let studentId = this.props.auth.user.userId
 let studentId = '37' 

    return (
      <div>
        {/* <button>BUtton</button> */}
        <StudentViewQuiz class={data.classRoom}
                        classId={classId}
                        quizId={quizId}
                        studentId={studentId}
                        insertStudentsAnswers={this.props.insertStudentsAnswers}
        />
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    // class: state.liveClass.class,
    // class: state.studentClassView.targetClass,
    auth: state.auth
  }
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators(actions, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(QuizContainer);