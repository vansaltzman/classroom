import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//import ClassLabel from './classLabel.jsx';
import * as Actions from "../../actions/index.js";
import Default from './classViewDefault.jsx'
import QuizContainer from './quizContainer.jsx'


class StudentLiveClassView extends React.Component {
  constructor() {
		super();
	}
  render() {

			if(this.props.studentState.targetClass && this.props.studentState.targetClass.activeView){
				return <QuizContainer/>
			} else if (this.props.studentState.targetClass && !this.props.studentState.targetClass.activeView) {
				return <Default/>
			} else {
				return <div></div>
			}
  }
}

function mapStateToProps(state) {
	return {
		studentState: state.studentClassView
		// targetClass: state.teachersClassView.targetClass
	}
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(StudentLiveClassView)