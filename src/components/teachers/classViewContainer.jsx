import React from 'react'
import * as actions from '../../actions/index.js';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import ClassView from './classView.jsx'
import QuizViewContainer from './quizViewContainer.jsx'

class ClassViewContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() { 
    if (this.props.targetClass && !this.props.targetClass.activeView) {
      return <ClassView />
    } else {
      return <QuizViewContainer
        startListening={()=> this.props.fetchClassData(this.props.targetClass.id, 'teacher')}
      />
		}
  }
}
 
function mapStateToProps(state) {
	return {
    targetClass: state.teachersClassView.targetClass
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}
    
export default connect(mapStateToProps, matchDispatchToProps)(ClassViewContainer);