import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//import ClassLabel from './classLabel.jsx';
import * as Actions from "../../actions/index.js";
import Default from './classViewDefault.jsx'
import Quiz from './StudentViewQuiz.jsx'


class StudentLiveClassView extends React.Component {
  constructor() {
		super();
	}
  render() {
	console.log(this.props)
		if (!this.props.activeView.activeView) {
			return <Default />
		} else {
			return <Quiz />
		}
  }
}

function mapStateToProps(state) {
	return {
		activeView: state.studentClassView.targetClass
		// targetClass: state.studen
	}
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(StudentLiveClassView)