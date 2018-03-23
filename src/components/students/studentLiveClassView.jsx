import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//import ClassLabel from './classLabel.jsx';
import * as Actions from "../../actions/index.js";

class StudentLiveClassView extends React.Component {
  constructor() {
		super();
		this.studentGoOnline = this.studentGoOnline.bind(this)
	}
	
	studentGoOnline() {
		this.props.updateStudentTargetClass(this.props.targetClassId, this.props.studentId)
	}
  componentWillReceiveProps() {
		console.log(this.props.targetClassId, this.props.studentId)
		this.props.updateStudentTargetClass(this.props.targetClassId, this.props.studentId)
		//this.studentGoOnline()
	}
  render() {
    return (
      <div>
        Hellloo
      </div>
    )
  }
}

function mapStateToProps(state) {
	return {
		targetClassId: state.studentClassView.targetClass.id,
		studentId: state.studentClassView.targetClass.student_id,
		targetClass: state.studentClassView.targetClass
	}
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(StudentLiveClassView)
//export default StudentLiveClassView