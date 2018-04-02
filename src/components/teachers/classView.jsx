import React from 'react';
import * as actions from '../../actions/index.js';
import moment from 'moment';
import axios from 'axios'

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
import NumberInput from 'grommet/components/NumberInput';
import Animate from 'grommet/components/Animate';
import AddCircleIcon from "grommet/components/icons/base/AddCircle";
import SubtractCircleIcon from 'grommet/components/icons/base/SubtractCircle';
//import Pulse from 'grommet/components/Pulse';
//import Split from 'grommet/components/Split';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions/index.js";
import Label from "grommet/components/Label";
import CheckBox from "grommet/components/CheckBox"
import QuizViewContainer from "./quizViewContainer.jsx"

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
		this.endClass = this.endClass.bind(this)
		this.toggleClassEndConfirmation = this.toggleClassEndConfirmation.bind(this)
		this.toggleQuizBuilderModal = this.toggleQuizBuilderModal.bind(this)
	}

	launchNewQuiz(){
		fb.launchQuiz(this.props.classId, this.state.selectedQuiz, this.props.quizTime, this.props.quizWeight)
	}
	toggleQuizBuilderModal() {
		this.props.showQuizModal()
		this.props.fetchQuestions({
			teacherId: this.props.teachersClassView.targetClass.teacher_id,
      subjectId: this.props.teachersClassView.targetClass.subject_id
		})
	}
	componentWillMount() {
		this.props.getAllStudents();
    this.props.getStudentsBelongToAClass({ id: this.props.classId });
    this.props.fetchQuizzes({
      teacherId: this.props.teachersClassView.targetClass.teacher_id,
      subjectId: this.props.teachersClassView.targetClass.subject_id
		})
		this.props.fetchQuestions({
			teacherId: this.props.teachersClassView.targetClass.teacher_id,
      subjectId: this.props.teachersClassView.targetClass.subject_id
		})
    // this.props.getStudentsBelongToAClass({ id: this.props.classId });
  }
	
	componentDidMount() {
    this.props.getClassStatus(this.props.classId)
		this.props.getStudentsBelongToAClass({ id: this.props.classId });
	}

	componentWillUnmount() {
		if (this.props.showQuizLauncherModal) {
			this.props.toggleQuizLauncherModalAction()
		}
		if (!this.props.targetClass.activeView){
			fb.stopFetchingClassData(this.props.classId)
			console.log('Stopped Fetching Class Data')
		}
	}

	selectQuiz(quizObj) {
		this.setState({selectedQuiz: quizObj || null})
	}

	toggleClassEndConfirmation() {
		this.setState({showEndClassModal: !this.state.showEndClassModal})
	}

	endClass() {
		this.toggleClassEndConfirmation()

		return fb.endClass(this.props.classId)
		.then(()=> {
			return fb.fetchClassData(this.props.classId)
		})
		.then((classObj)=> {
			console.log('Class to End ------> ', classObj)
			classObj = classObj || this.props.targetClass
			return axios.post('/endClass', {classObj})
			.then(()=> {
				return classObj
			})
		})
		.then((classObj)=> {
			return fb.stopFetchingClassData(this.props.classId)
		})
		.then(()=> {
			return fb.removeClass(this.props.classId)
		})
		.catch(err => {
			console.log('Error Ending Class ------> ', err)
			if (err && !this.state.showEndClassModal) this.toggleClassEndConfirmation()
		})
	}

  render() {
		const { studentsInClass } = this.props;
		const studentsArray = [];
		for (var key in studentsInClass) {
			studentsArray.push(studentsInClass[key]);
		}
			return(
				<div>
					{this.props.targetClass.isLive ?
					<Animate 
						enter={{"animation": "fade", "duration": 1000, "delay": 0}}
						leave={{"animation": "fade", "duration": 1000, "delay": 0}}
						keep={true}
					>
						<Notification
							message={this.props.targetClass.name + ' is currently live'}
							status={'ok'}
						/>
					</Animate> :
					<Animate 
					enter={{"animation": "fade", "duration": 1000, "delay": 0}}
					leave={{"animation": "fade", "duration": 1000, "delay": 0}}
					keep={true}
				>
					<Notification
							message={this.props.targetClass.name + ' is currently offline'}
							status={'warning'}
					/> 
				</Animate> 
					}
				<Section>				
					{this.props.targetClass.isLive ?
					<Button icon={<CloudUploadIcon />}
						label= {'End Class'}
						primary={false}
						secondary={false}
						accent={false}
						critical={false}
						plain={false} 
						onClick={()=> this.toggleClassEndConfirmation()}
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
					<Button icon={<DeployIcon />}
						label= {'Statistics'}
						primary={false}
						secondary={false}
						accent={true}
						critical={false}
						path="/statistics"
						plain={false} 
						onClick={() => this.props.getTakenQuizzes({id: this.props.classId}) }
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
				<Split fixed={false}
							 separator={false}
							 showOnResponsive="both">
					<Box size="xlarge">
						Side bar for students list
						{studentsArray.map((each) => {
								return (
									<Box style={{color: each.isHere ? 'black' : 'lightgrey'}}
											align='center'>
										{each.name}
									</Box>
								)
							})}
						<SearchInput
								placeHolder="Search For A Student"
								suggestions={this.props.studentNames}
								value={this.props.teachersClassView.selectedStudent.value}
								//  onDOMChange={(target) => this.props.selectStudentToAdd(target)} />
								onSelect={target => this.props.selectStudentToAdd(target)}
							/>
							<Button
								label="Add Student"
								onClick={() => {
									this.props.addAStudentToClass({
										classId: this.props.classId,
										studentId: this.props.teachersClassView.selectedStudent.sub.id
									}, { id: this.props.classId });
								}}
							/>
					</Box>
          <Box size="xlarge" >
						Quiz List
						<Accordion
								onActive={(index)=> this.selectQuiz(this.props.teachersClassView.quizzes[Object.keys(this.props.teachersClassView.quizzes)[index]])}
							>
								{Object.values(this.props.teachersClassView.quizzes).map(quiz => {
								return <AccordionPanel heading={
									<div>
										{quiz.name}
									</div>}> 
									{Object.values(quiz.questions).map((question,i) => {
										return <Box key={i}>
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
							<Button 
								
								label="Create New Quiz"
								onClick={this.toggleQuizBuilderModal}/>
					</Box>
				</Split>

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
							onClick={this.endClass}
						/>
					</Footer>
				</Form>
			</Layer>
      }
      {this.props.teachersClassView.showQuizBuilderModal === true ?
					<Layer closer={true}
								 flush={true} 
								 overlayClose={true}
								 onClose={this.toggleQuizBuilderModal}>
						<Split fixed={false}
									 separator={false}
									 showOnResponsive='both'>
							<Box size="xlarge">
								<Header pad={{ vertical: "medium", horizontal: "medium" }}>
									<Heading>
										Create A New Quiz
									</Heading>
								</Header>
								<Form compact={false} pad={{ vertical: "medium", horizontal: "medium" }}>
										<Section pad={{ vertical: "medium", horizontal: "medium" }}>
											<FormFields>
												<TextInput 
													placeHolder="Please Name Your Quiz"
													onDOMChange={value => {
														this.props.setNewQuizName(value);
													}}/>
												<SearchInput 
													placeHolder="Quiz Subject"
													suggestions={this.props.subjects}
													value={this.props.teachersClassView.newQuiz.subject.value ? this.props.teachersClassView.newQuiz.subject.value : ""}
													// value={this.props.targetClass.newQuizs.subject.value ? this.props.targetClass.newQuiz.subject.value : this.props.targetClass.newQuiz.value ? this.props.targetClass.newQuiz.value : undefined}
													onDOMChange={(event) => this.props.setNewQuizSubject(event)}
													onSelect={(target) => this.props.setNewQuizSubjectBySelection(target)}/>
													{this.props.teachersClassView.newQuiz.questions.map((each, index) => {
															return (
																<Section>
																	<Label>{'Question' + ' ' + Number(index + 1)}</Label>
																	<TextInput placeHolder="Question..."
																						 //style={{color: each.question ? 'pink' : 'black'}}
																						 value={each.id ? each.question : each.text}
																						 onDOMChange={(event) => {this.props.addQuestionText(event, index)}}/>
																	<Button icon={<SubtractCircleIcon onClick={() => this.props.deleteQuestion(index)}/>} />
																	{each.answers.map((eachAnswer, answerIndex) => {
																		return (
																			<Section>
																				<TextInput placeHolder="Answer..."
																									 //style={{color: each.question ? 'pink' : 'black'}}
																									 value={eachAnswer.answer ? eachAnswer.answer : eachAnswer.text}
																									 onDOMChange={(event) => this.props.addAnswerText(event, index, answerIndex)}/>
																				<Button icon={<SubtractCircleIcon onClick={() => this.props.deleteAnswer(index, answerIndex)}/>} />	
																				<CheckBox label='Correct'
																									toggle={false}
																									reverse={true} 
																									checked={eachAnswer.correct ? true : eachAnswer.isCorrect ? true : false}
																									onChange={() => this.props.chooseCorrectAnswer(index, answerIndex)}/>
																			</Section>
																		)
																	})}
																	<Button icon={<AddCircleIcon />} 
																					label="Add Answer"
																					onClick={() => {this.props.addAnswer(index)}}/>
																</Section>
															)
														}) }
													<Button icon={<AddCircleIcon />}
																					onClick={() => this.props.setQuestionNumber()}
																					label="Add Question"/>
											</FormFields>
										</Section>
									<Footer pad={{"vertical": "medium", horizontal: "medium"}}>
										<Button label='Add Quiz'
														onClick={() => this.props.addNewQuiz({authorId: this.props.teachersClassView.targetClass.teacher_id, quiz: this.props.teachersClassView.newQuiz})}/>
									</Footer>
								</Form>
							</Box>
							<Box size="xlarge">
								<Header pad={{ vertical: "medium", horizontal: "medium" }}>
									<Heading>
										Previous Question
									</Heading>
								</Header>
								<Accordion openMulti={false}
													 onActive={(index) => this.props.selectedQuestion(this.props.teachersClassView.questions[index])}>
									{this.props.teachersClassView.questions.map((question, i) => {
										return (
											<AccordionPanel key={i} heading={question.question}>
												<Label>
													{question.avg_time}
													{this.props.teachersClassView.showAddQuestionButton ? <Button onClick={() => this.props.addRecycledQuestion(question)}>Add Question</Button> : <div></div>}
												</Label>
												{question.answers.map((eachAnswer) => {
													return (
														<Notification
															message={eachAnswer.answer}
															size='small'
															status={eachAnswer.correct ? 'ok' : 'critical'}/>
													)
												})}
											</AccordionPanel>
										)
									})}		
								</Accordion>
							</Box>
						</Split>
					</Layer>
				: <div></div>}
			</Section>
			</div>
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
    classId: state.teachersClassView.targetClass.id,
    teachersClassView: state.teachersClassView,
		selectedStudent: state.teachersClassView.selectStudent,
		subjects: state.teachersClassView.subjects,
    auth: state.auth,
	}
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ClassView);
