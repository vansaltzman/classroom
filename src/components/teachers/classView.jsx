import React from 'react';
import * as actions from '../../actions/index.js';
import moment from 'moment';

import "grommet/scss/hpinc/index.scss";
import Columns from 'grommet/components/Columns';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Section from 'grommet/components/Section';
import DeployIcon from 'grommet/components/icons/base/Deploy';
import CloudUploadIcon from 'grommet/components/icons/base/CloudUpload';
import ShareIcon from 'grommet/components/icons/base/Share';
import SearchInput from 'grommet/components/SearchInput';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Paragraph from 'grommet/components/Paragraph';
import Split from 'grommet/components/Split';
import Layer from 'grommet/components/Layer';
import Form from 'grommet/components/Form';
import Footer from 'grommet/components/Footer';
import FormFields from 'grommet/components/FormFields';
import TextInput from 'grommet/components/TextInput';
import DateTime from 'grommet/components/DateTime';
import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';
import Notification from 'grommet/components/Notification';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import Label from 'grommet/components/Label';
import NumberInput from 'grommet/components/NumberInput';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from '../../actions/index.js';

import classRoom from '../../../data/quizDummyData.js';
import fb from '../../../db/liveClassroom.js'

class ClassView extends React.Component {
	constructor() {
		super();
		this.state = {
			selectedQuiz: null,
			showEndClassModal: false
		}

		this.launchNewQuiz = this.launchNewQuiz.bind(this)
		this.toggleClassEndConfirmation = this.toggleClassEndConfirmation.bind(this)
	}

	launchNewQuiz(){
		fb.launchQuiz(this.props.classId, this.state.selectedQuiz, this.props.quizTime, this.props.quizWeight)
			.then(()=> {
				if (this.props.showQuizLauncherModal) {
					this.props.toggleQuizLauncherModalAction()
				}
			})
	}

	componentWillMount() {
		this.props.getAllStudents();
		this.props.getStudentsBelongToAClass({id: this.props.classId});
		this.props.getQuizzes(this.props.userId)
	}
	
	componentDidMount() {
		this.props.getClassStatus(this.props.classId)
	}

	componentWillUnmount() {
		if (this.props.showQuizLauncherModal) {
			this.props.toggleQuizLauncherModalAction()
		}
	}

	selectQuiz(quizObj) {
		this.setState({selectedQuiz: quizObj || null})
	}

	toggleClassEndConfirmation() {
		this.setState({showEndClassModal: !this.state.showEndClassModal})
	}

	endClass() {

	}

  render() {
	
		let quizzes = {
			1: {
				id: 1,
				name: 'Recursion',
				subject: 'JavaScript',
				questions: {
					1: {
						id: 1, //question id
						text: 'This is a question',
						time: 70000,
						answers: {
						1: {text: 'this is an answer', isCorrect: true},
						2: {text: 'this is an answer', isCorrect: false},
						3: {text: 'this is an answer', isCorrect: false},
						4: {text: 'this is an answer', isCorrect: false}
						}
					}, 
					2: {
						id: 2, //question id
						text: 'This is another question',
						time: 90000,
						answers: {
						1: {text: 'this is an answer', isCorrect: false},
						2: {text: 'this is an answer', isCorrect: false},
						3: {text: 'this is an answer', isCorrect: true}
						}
					},
					3: {
						id: 3, //question id
						text: 'This is another question',
						time: 90000,
						answers: {
						1: {text: 'this is an answer', isCorrect: false},
						2: {text: 'this is an answer', isCorrect: false},
						3: {text: 'this is an answer', isCorrect: true}
						}
					}
				}
			}
		}

		const { studentsInClass } = this.props;
		const studentsArray = [];
		for (var key in studentsInClass) {
			studentsArray.push(studentsInClass[key]);
		}
		return(
			<Section>
				
				{this.props.targetClass.isLive ?
				<Button icon={<CloudUploadIcon />}
					label= {'End Class'}
					primary={false}
					secondary={false}
					accent={false}
					critical={false}
					plain={false} 
					onClick={() =>  this.toggleClassEndConfirmation()}
				/> :
				<Button icon={<DeployIcon />}
					label= {'Go Live'}
					primary={false}
					secondary={false}
					accent={true}
					critical={false}
					plain={false} 
					onClick={() => this.props.classGoLive(this.props.classId, this.props.targetClass) }
				/>}

				{ (this.state.selectedQuiz !== null && this.props.targetClass.isLive) &&
				<Button icon={<ShareIcon />}
					label={'Launch ' + this.state.selectedQuiz.name}
					primary={false}
					secondary={false}
					accent={true}
					critical={false}
					plain={false} 
					onClick={this.props.toggleQuizLauncherModalAction}
				/>
				}

				<Columns masonry={false}
					maxCount={2}
					size='large'
					align='center'>
				<Box align='center'
					pad='medium'
					margin='small'
					colorIndex='light-2'
				>
					Side bar for students list
					{studentsArray.map((each) => {
							return (
								<Box style={{color: each.isHere ? 'black' : 'lightgrey'}}>
									{each.name}
								</Box>
							)
						})}
					</Box>
					<SearchInput placeHolder='Search'
  					suggestions={this.props.studentNames} 
					/>
					{/* <Box align='center'
						pad='none'
						margin="none"
						wrap="false"
						colorIndex='light-2'
					> */}
						Quiz List
						<Accordion
							onActive={(index)=> this.selectQuiz(quizzes[Object.keys(quizzes)[index]])}
						>
							{Object.values(quizzes).map(quiz => {
							return <AccordionPanel heading={
								<div>
									{quiz.name}
								</div>}> 
								{Object.values(quiz.questions).map(question => {
									 return <Box>
										<Heading tag="h3">
											{question.text}
										</Heading>
										<Label>
											{moment.duration(question.time).humanize()}
										</Label>
										{Object.values(question.answers).map(answer=> {
											return <Notification
												message={answer.text}
												size='small'
												status={answer.isCorrect ? 'ok' : 'critical'}
											/>
										})}
									</Box>
								})}
							</AccordionPanel>
							})}
						</Accordion>
						{/* </Box> */}
				</Columns>

			{this.props.showQuizLauncherModal &&
			<Layer
				closer={true}
				flush={true}
				overlayClose={true}
				onClose={this.props.toggleQuizLauncherModalAction}
			>
				<Form>
					<Header pad={{ vertical: "medium", horizontal: "medium" }}>
						Launch Quiz
					</Header>
					<FormFields pad={{ horizontal: "medium" }}>
						<DateTime
							name="quizLength"
							placeHolder="Set Test time"
							format='mm:ss'
							onChange={(time)=> this.props.setQuizTime(time)}
							value={this.props.quizTime} 
						/>
					<NumberInput 
						value={this.props.quizWeight}
						onChange={(weight)=> this.props.updateQuizWeight(weight)} 
						min={1}
						max={100}
						step={1}
					/>
					</FormFields>
					<Footer pad={{ vertical: "medium", horizontal: "medium" }}>
						<Button 
							label="Launch Quiz" 
							type="button"
							primary={true} 
							onClick={() => this.launchNewQuiz()}
						/>
					</Footer>
				</Form>
			</Layer>}
			{this.state.showEndClassModal && 
			<Layer
				closer={true}
				flush={true}
				overlayClose={true}
				onClose={this.toggleClassEndConfirmation}
			>
					<Form>
					<Header pad={{ vertical: "medium", horizontal: "medium" }}>
						Are you user you want to end the class?
					</Header>
					<Footer pad={{ vertical: "medium", horizontal: "medium" }}>
						<Button 
							label="Yes, I want to end the class" 
							type="button"
							primary={true} 
							onClick={()=> {
								fb.endClass(this.props.classId)
								this.toggleClassEndConfirmation()
							}}
						/>
					</Footer>
				</Form>
			</Layer>
			}
			</Section>
		)
	}
}


function mapStateToProps(state) {
	return {
		quizTemplates: state.teachersClassView.quizTemplates,
		quizTime: state.teachersClassView.quizTime,
		quizWeight: state.teachersClassView.quizWeight,
		userId: state.auth.user.id,
		targetClass: state.teachersClassView.targetClass,
		studentsInClass: state.teachersClassView.targetClass.students,
		showQuizLauncherModal: state.teachersClassView.showQuizLauncherModal,
		students: state.teachersClassView.students,
		studentNames: state.teachersClassView.studentNames,
		classId: state.teachersClassView.targetClass.id
	}
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ClassView)

