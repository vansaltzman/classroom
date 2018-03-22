import React from "react";
import ClassLabel from "./classLabel.jsx";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from '../../actions/index.js';
import QuizView from './quizView.jsx'
import ClassData from '../../../db/dummyClassData'

class QuizViewContainer extends React.Component {
  constructor() {
    super();
    this.state={
      currentClass: ClassData.a
    }
  }

  componentDidMount() {
    setTimeout(()=> {
      this.setState({currentClass: ClassData.b})
    }, 5000)
  }

  render() {
    return (
      <div>
        <QuizView currentClass={this.state.currentClass} />
      </div>
    );
  }
}

// function mapStateToProps(state) {
//   return {
// 		class: state.liveClass.class
//   };
// }

// function matchDispatchToProps(dispatch) {
// 	return bindActionCreators(Actions, dispatch);
// }

// export default connect(mapStateToProps, matchDispatchToProps)(QuizViewContainer);

export default QuizViewContainer