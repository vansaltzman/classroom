import React from "react";
import ClassLabel from "./classLabel.jsx";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from '../../actions/index.js';
import QuizView from './quizView.jsx'
// import ClassData from '../../../db/dummyClassData'

class QuizViewContainer extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.startListening()
  }

  render() {
    console.log('this props in teach quiz view conteinar ', this.props)
    return (
      <div>
        <QuizView props={this.props} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
		currentClass: state.teachersClassView.targetClass
  };
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(QuizViewContainer);