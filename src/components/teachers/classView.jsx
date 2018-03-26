import React from 'react';
import * as actions from '../../actions/index.js';
import moment from 'moment';

import "grommet/scss/hpinc/index.scss";
import Columns from 'grommet/components/Columns';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Section from 'grommet/components/Section';
import DeployIcon from 'grommet/components/icons/base/Deploy';
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

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from '../../actions/index.js';

import classRoom from '../../../data/quizDummyData.js';
import launchQuiz from '../../../db/liveClassroom.js';

class ClassView extends React.Component {
	constructor() {
		super();
		this.state = {
			selectedQuiz: null
		}

		this.launchNewQuiz = this.launchNewQuiz.bind(this)
	}

	launchNewQuiz(){
		// fb stuff
	}

	componentWillMount() {
		//console.log('this.props.classId', this.props.classId);
		//getting all students for search input for teacher to add student to a new class
		this.props.getAllStudents();
		this.props.getStudentsBelongToAClass({id: this.props.classId});
		this.props.getQuizzes(this.props.userId)
	}

	componentWillUnmount() {
		if (this.props.showQuizLauncherModal) {
			this.props.toggleQuizLauncherModalAction()
		}
	}

	selectQuiz(quizObj) {
		console.log(quizObj)
		this.setState({selectedQuiz: quizObj || null}, ()=> {
			// this.props.toggleQuizLauncherModalAction
		})

	}

  render() {

		let quizzes = {
			1: {
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
						id: 1, //question id
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
		//console.log('heyyy', studentsInClass)
		const studentsArray = [];
		for (var key in studentsInClass) {
			studentsArray.push(studentsInClass[key]);
		}
		return(
			<Section>
				
				<Button icon={<DeployIcon />}
					label='Go Live'
					primary={false}
					secondary={false}
					accent={true}
					critical={false}
					plain={false} 
					onClick={() => this.props.classGoLive(this.props.classId, this.props.targetClass)}
				/>

				{ this.state.selectedQuiz !== null &&
				<Button icon={<DeployIcon />}
					label={'Launch ' + this.state.selectedQuiz.name}
					primary={false}
					secondary={false}
					accent={true}
					critical={false}
					plain={false} 
					onClick={() => this.launchNewQuiz()}
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
					<Box align='center'
						pad='small'
						margin='small'
						wrap="false"
						colorIndex='light-2'
					>
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
										{question.text  + ' ' + moment.duration(question.time).humanize()}
										{Object.values(question.answers).map(answer=> {
											return <Notification
												message={answer.text}
												size='medium'
												status={answer.isCorrect ? 'ok' : 'critical'}
											/>
										})}
									</Box>
								})}
							</AccordionPanel>
							})}
						</Accordion>
						</Box>
				</Columns>

			{this.props.showQuizLauncherModal ? 
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
			</Layer> :
			<div></div>}
			</Section>
		)
	}
}


function mapStateToProps(state) {
	return {
		quizTemplates: state.teachersClassView.quizTemplates,
		quizTime: state.teachersClassView.quizTime,
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

