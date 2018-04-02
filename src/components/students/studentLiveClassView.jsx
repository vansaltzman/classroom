import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions/index.js";
import Default from './classViewDefault.jsx'
import Quiz from './StudentViewQuiz.jsx';
import Timer from './Timer.jsx';
import QuizContainer from './quizContainer.jsx';
import Box from 'grommet/components/Box';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';
import DeployIcon from 'grommet/components/icons/base/Deploy';
import fb from '../../../db/liveClassroom.js';
import UserNew from "grommet/components/icons/base/UserNew.js";
import UserExpert from "grommet/components/icons/base/UserExpert.js";
import WorkshopIcon from 'grommet/components/icons/base/Workshop';
import Toast from 'grommet/components/Toast';
import StudentQuizGradesView from './StudentQuizGradesView.jsx';



class StudentLiveClassView extends React.Component {
  constructor() {
		super();
		this.handleRaiseHand = this.handleRaiseHand.bind(this);
		this.handleToastClose = this.handleToastClose.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.activeView.isLive) {
			fb.toggleStudentLiveClassStatus(this.props.activeView.id, this.props.auth.user.id, true)
		}
	}

	componentWillUnmount() {
		if (this.props.studentState.targetClass.isLive) { // Handles when student leaves class after class has ended
			fb.toggleStudentLiveClassStatus(this.props.activeView.id, this.props.auth.user.id, false)
		}
	}

	componentWillMount() {
		if (this.props.studentState.targetClass.isLive) {
			this.props.fetchClassData(this.props.activeView.id, 'student')
		}
	}

	handleRaiseHand(e) {
		let studentId = this.props.auth.user.id;
		let classId = this.props.activeView.id;
		fb.toggleStudentHandRaiseStatus(classId, studentId);
		fb.updateHandRaiseQueue(classId, studentId);
	}

	handleToastClose () {
		let studentId = this.props.auth.user.id;
		let classId = this.props.activeView.id;
		fb.updateHandRaiseAcknowledgement(classId, studentId, 'acknowledge')
	}
	
  render() {
		var studentId = this.props.auth.user.id
		var liveView;
			if (!this.props.studentState.targetClass) {
				liveView = <div>loading</div>
			}
			else if (!this.props.studentState.targetClass.isLive) {
				liveView = <StudentQuizGradesView
							className = {this.props.activeView.name}
							classId = {this.props.activeView.id}
							studentId={this.props.auth.user.id}
							getQuizDataForStudentInClass={this.props.getQuizDataForStudentInClass}
							/>
			}
			else if(this.props.studentState.targetClass && this.props.studentState.targetClass.activeView){
				liveView = <QuizContainer/>
			} else if (this.props.studentState.targetClass && !this.props.studentState.targetClass.activeView) {
					liveView = <Default live={true}/>
			} else {
					liveView = <div></div>
			}
			if (this.props.studentState.targetClass.handRaisedQueue
				&& this.props.studentState.targetClass.students[studentId].handRaised) {
				let handRaisedQueue = this.props.activeView.handRaisedQueue;
				let lowestQueueTimeId = Object.values(handRaisedQueue).sort((a, b) => a.time - b.time)[0].studentId;
				if (studentId === lowestQueueTimeId) {
					var handRaiseLabel = "You are next in line!"
 				} else {
					var handRaiseLabel = 'Click to exit the queue';
				 }
				var queueIcon =  <UserExpert />
				var critical = true;

			} else {
				var handRaiseLabel = 'Raise your hand';
				var queueIcon =  <WorkshopIcon />
				var critical = false;
				var toast = <div></div>
			}

				return (
					<div>
							{liveView}

							{this.props.studentState.targetClass.isLive &&
							<Button 
								icon={queueIcon} 
								style={{position: "fixed", bottom:100, right:100}}
								label={handRaiseLabel}
								type={'submit'}
								primary={false}
								secondary={false}
								accent={false}
								critical={critical}
								plain={false} 
								onClick={(e) => this.handleRaiseHand(e)} 
							/>}

						</div>
				)
			
		}
}

function mapStateToProps(state) {
	return {
		activeView: state.studentClassView.targetClass,
		studentState: state.studentClassView,
		auth: state.auth
		// targetClass: state.studen
	}
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(StudentLiveClassView)