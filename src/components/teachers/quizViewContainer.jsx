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

  render() {
    return (
      <div>
        <QuizView />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
		currentClass: state.activeClass
  };
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(QuizViewContainer);