import React from 'react';
//mport * as actions from '../../actions/index.js';
import moment from 'moment';
import axios from 'axios'

import "grommet/scss/hpinc/index.scss";
import Columns from 'grommet/components/Columns';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Anchor from 'grommet/components/Anchor';
import Section from 'grommet/components/Section';
import Headline from 'grommet/components/Headline';
import DeployIcon from 'grommet/components/icons/base/Deploy';
import Status from 'grommet/components/icons/Status';
import CloudUploadIcon from 'grommet/components/icons/base/CloudUpload';
import ShareIcon from 'grommet/components/icons/base/Share';
import BarChartIcon from 'grommet/components/icons/base/BarChart';
import LikeIcon from 'grommet/components/icons/base/Like';
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
import UserImage from "../UserImage.jsx"

import classRoom from '../../../data/quizDummyData.js';
import fb from '../../../db/liveClassroom.js'

import ThumbPoll from './thumbPoll.jsx'
import { Title } from 'grommet';

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
		this.launchThumbPoll = this.launchThumbPoll.bind(this)
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

	launchThumbPoll() {
		console.log('---launchthumb poll hit')
		// this.props.showThumbPollAction()
		fb.setStudentsThumbsNeutral(this.props.classId)
		fb.setThumbPollLiveForStudents(this.props.classId, true)
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
				console.log('OK from server')
				return classObj
			})
		})
		.then((classObj)=> {
			return fb.stopFetchingClassData(this.props.classId)
		})
		.then(()=> {
			return fb.removeClass(this.props.classId)
		})
		.then(()=> {
			// handles updating student isHere at end of class
			let thisClass = Object.assign({}, this.props.teachersClassView.classes.find(each => each.id === this.props.classId))
			// Object.keys(this.props.targetClass.students).forEach(studentId => {
			// 	thisClass.students[studentId] = Object.assign({}, this.props.targetClass.students[studentId])
			// 	thisClass.students[studentId].quizzes = {}
			// 	thisClass.students[studentId].isHere = false
			// })
			return this.props.updateTargetClass(thisClass)
		})
		.then(()=> {
			this.props.getStudentsBelongToAClass({ id: this.props.classId });
			this.props.fetchQuizzes({
				teacherId: this.props.teachersClassView.targetClass.teacher_id,
				subjectId: this.props.teachersClassView.targetClass.subject_id
			})
			this.props.fetchQuestions({
				teacherId: this.props.teachersClassView.targetClass.teacher_id,
				subjectId: this.props.teachersClassView.targetClass.subject_id
			})
		})
		.catch(err => {
			console.log('Error Ending Class ------> ', err)
			if (err && !this.state.showEndClassModal) this.toggleClassEndConfirmation()
		})
	}

	code = function(text) {
		if (text) {
			return text.split('~~~').map((item, i)=> {
				if (i % 2 === 0) {
					return item
				} else {
					// return (
					// <SyntaxHighlighter language='javascript' style={syntaxStyle} >
					//   {'\n' + text  + '\n'}
					// </SyntaxHighlighter>
					// )
					 return (
						 <code
							style={{
								fontFamily: 'Monaco,Menlo,Consolas,"Courier New",monospace!important', fontSize: '1rem', whiteSpace: 'normal',
								color: '#7026d2',padding: '2px 3px 1px',tabSize: '4',backgroundColor: '#f7f7f9', 
								border: '1px solid #e1e1e8',  borderRadius: '3px',lineHeight: '2'
							}}
						>
							{'\n' + item + '\n'} 
						</code>
					 )
				}
			}) 
		} else {
			return null
		}
  }

  render() {
		const { studentsInClass } = this.props;
		const studentsArray = [];
		for (var key in studentsInClass) {
			studentsArray.push(studentsInClass[key]);
		}

			return(
			<div>
				<Section
					margin="none"
					pad="none"
				>
				{/* <div>
					{formatCode('This is a forumla')}
				</div> */}
				<Header
					direction="row"
					justify="between"
					alignContent="center"
					colorIndex="light-2"
					pad="small"
					style={{marginTop: '0', top: '112px', zIndex:'2'}}
				>
					<Box
						style={{width: '380', marginLeft: '20px'}}
						direction="row"
						margin="none"
						// flex="shrink"
					>
						{this.props.targetClass.isLive ?
						<Anchor icon={<CloudUploadIcon size="medium" />}
							label= {'End Class'}
							style={{lineHeight: '100px', marginLeft: "10px", width: '150px'}}
							primary={false}
							secondary={false}
							accent={false}
							critical={false}
							plain={false} 
							onClick={()=> this.toggleClassEndConfirmation()}
						/> :
						<Anchor icon={<DeployIcon size="medium" />}
							label= {'Go Live'}
							style={{lineHeight: '100px', marginLeft: "10px", width: '150px'}}
							primary={false}
							secondary={false}
							accent={true}
							critical={false}
							plain={false} 
							onClick={() => this.props.classGoLive(this.props.classId, this.props.targetClass) }
						/>}
						<Anchor icon={<LikeIcon size="medium" />}
							label= {'Thumbs'}
							style={{lineHeight: '100px', marginLeft: "20px", width: '150px'}}
							primary={false}
							secondary={false}
							accent={true}
							critical={false}
							disabled={!this.props.targetClass.isLive}
							animateIcon={this.props.targetClass.isLive}
							plain={false} 
							onClick={this.launchThumbPoll}
						/>
					</Box>
					<Box
						direction="column"
						margin="none"
						style={{margin: '0 50px 0 50px'}}
						// justify="center"
						flex="grow"
					>
						<Headline
							style={{marginBottom: 0, lineHeight: '75px', textAlign:'center'}}
						>
							{this.props.targetClass.name}
						</Headline>
						{this.props.targetClass.isLive ?
						<Box
							direction="row"
							justify="center"
							align="center"
							margin="none"
							style={{marginRight: '20px'}}
						>
							<Status value={'ok'} size="small"/>
							<Label
								margin="none"
								style={{marginLeft: '5px'}}
							>
								online
							</Label>
						</Box>
					:
					<Box
						direction="row"
						justify="center"
						align="center"
						margin="none"
						style={{marginRight: '20px'}}
					>
						<Status value={'critical'} size="small"/>
						<Label
							margin="none"
							style={{marginLeft: '5px'}}
						>
							offline
						</Label>
					</Box>
				 }
					</Box>
					<Box
						style={{width: '400px'}}
						direction="row"
						justify="end"
						margin="none"
						// flex="shrink"
					>
						<Anchor icon={<ShareIcon size="medium" />}
							label={'Start Quiz'} 
							// + this.state.selectedQuiz.name}
							style={{lineHeight: '100px', marginLeft: "10px", width: '150px'}}
							primary={false}
							secondary={false}
							accent={false}
							critical={false}
							disabled={!(this.state.selectedQuiz !== null && this.props.targetClass.isLive)}
							animateIcon={(this.state.selectedQuiz !== null && this.props.targetClass.isLive)}
							plain={false} 
							onClick={this.props.toggleQuizLauncherModalAction}
						/>
						<Anchor icon={<BarChartIcon size="medium" />}
							label= {'Stats'}
							style={{lineHeight: '100px', marginLeft: "20px", width: '130px'}}
							primary={false}
							secondary={false}
							accent={true}
							critical={false}
							path="/statistics"
							plain={false} 
							onClick={() => this.props.getTakenQuizzes({id: this.props.classId}) }
					/> 
				</Box>
				</Header>
				{/* <Split fixed={false}
							 separator={false}
							 showOnResponsive="both"> */}
					<Box 
						justify="center"
						margin="medium"
						direction='row'
					>
						<Box id="stud_list"
							pad="medium"
							size="1/2"
						>
						{studentsArray
						.sort((a, b) => {
							if (a.isHere === b.isHere) {
								return a.name.split(' ')[0] > b.name.split(' ')[0]
							} else {
								return b.isHere - a.isHere
							}
						})
						.map((student) => {
								let nextInLine = false;
								if (this.props.targetClass && this.props.targetClass.handRaisedQueue) {
									let handRaisedQueue = this.props.targetClass.handRaisedQueue;
									let lowestQueueTimeId = Object.values(handRaisedQueue).sort((a, b) => a.time - b.time)[0].studentId;
									if ( parseInt(lowestQueueTimeId) === parseInt(student.id)) nextInLine = true
								}
								return (
									<Box
										direction="row"
										justify="between"
										alignContent="center"
										alignSelf="start"
										style={{marginLeft: '20px', marginBottom: '10px', width: '500px'}}
									>
										<Box direction='row' pad='none' margin='none'>
											<UserImage 
												handRaised={student.handRaised} 
												nextInLine={nextInLine} 
												student={student}
												targetClass={this.props.targetClass}
												isHere={student.isHere}
												url={student.thumbnail}
											/>
											<Heading 
												tag="h3"
												truncate={false}
												style={{width: '200px', maxHeight: '100px', textAlign: 'start', lineHeight: '50px', marginLeft: '20px', marginBottom: 0, overflow:'visible'}}
											>
												{student.name}
											</Heading>
										</Box>
										<Box
											pad="small"
											alignSelf="end"
										>
											<LikeIcon 
												style={{transform: `rotate(${student.thumb}deg)`}} 
												type="status"
												colorIndex={student.thumb >= -45 ? 'ok' : student.thumb >= -135 ? 'warning' : 'critical'}
											/>
										</Box>
										<Box
											pad="small"
											alignSelf="end"
										>
											
										</Box>
									</Box>
								)
							})}
							<form style={{marginTop: '20px'}}>
							<SearchInput
									// style={{width: 'auto'}}
									placeHolder="Search For A Student"
									suggestions={this.props.studentNames}
									value={this.props.teachersClassView.selectedStudent.value}
									//  onDOMChange={(target) => this.props.selectStudentToAdd(target)} />
									onSelect={target => this.props.selectStudentToAdd(target)}
								/>
								<Button
									style={{marginLeft: '10px'}}
									label="Add Student"
									onClick={() => {
										this.props.addAStudentToClass({
											classId: this.props.classId,
											studentId: this.props.teachersClassView.selectedStudent.sub.id
										}, { id: this.props.classId });
									}}
								/>
							</form>
							</Box>
					
          <Box id="quiz_list" pad="none" margin="medium" flex="grow">
						<Accordion onActive={(index)=> this.selectQuiz(this.props.teachersClassView.quizzes[Object.keys(this.props.teachersClassView.quizzes)[index]])}>
								{Object.values(this.props.teachersClassView.quizzes).map((quiz, index) => {
									return (
										<AccordionPanel heading={
											<Box direction='row' margin='small' alignContent='stretch' justify='between'>
												<Box direction='column' justify='start' alignContent='between' style={{width: '400px', maxWidth: '400px'}} style={{marginRight: 'auto'}}>
													<Heading tag='h3'>
                            {quiz.name}
                          </Heading>
                        </Box>
											</Box>
										}>
											<Box pad='small' justify='start' align='start'>
												{Object.values(quiz.questions).map((question, i) => {
                          return (
														// <Box direction='row'
														// 		// full='horizontal'
														// 		size="full"
														// 		flex="grow"
														// 		alignContent='between'
														// 		// style={{marginBottom:'50px'}}
														// 		>
															<Box key={i}
																	direction='column'
																	// full='horizontal'
																	size="full"
																	basis="full"
																	alignContent='between'
																	style={{marginBottom:'50px', width: '100%'}}>
																<Heading tag="h3">
																	{this.code(question.text)}
																</Heading>
																<List>
																	{Object.values(question.answers).map((answer, i) => {
																		let isCorrect = answer.isCorrect;
																		var marker;
																		if (answer.isCorrect === true) {
																			marker = <Status value='ok' style={{marginRight:'10px'}} />
																		} else if (answer.isCorrect === false) {
																			marker = <Status value='critical' style={{marginRight:'10px'}} />
																		}

																		return (
																			<ListItem key={i} separator='horizontal' flex="grow">
																				{marker}    {i+1}) {this.code(answer.text)}
																			</ListItem>
																		);
																	})}
																</List>
															</Box>
														// </Box>
													);
												})}  
											</Box>
										</AccordionPanel>
									)
								})}
						</Accordion>
							<Box direction='row' justify='center'>
							<Button label="Create New Quiz" onClick={this.toggleQuizBuilderModal} secondary={true} style={{marginTop: '20px'}}/>
							</Box>
					</Box>
					</Box>
				{/* </Split> */}

			{this.props.showQuizLauncherModal &&
			<Layer
				closer={true}
				flush={true}
				overlayClose={true}
				onClose={this.props.toggleQuizLauncherModalAction}
			>
				<Form>
					<Header pad={{ vertical: "medium", horizontal: "medium" }}>
						{'Launch Quiz ' + this.state.selectedQuiz.name}
					</Header>
					<FormFields pad={{ horizontal: "medium" }}>
						<Box
							direction="column"
							size="full"
							margin="medium"
						>
							<Label size="small">
								Set Duration
							</Label>
							<DateTime
								name="quizLength"
								format='mm:ss'
								onChange={(time)=> this.props.setQuizTime(time)}
								value={this.props.quizTime} 
							/>
						</Box>
						<Box
							direction="column"
							size="full"
							margin="medium"
						>
							<Label size="small">
								Set Weight (1 - 100)
							</Label>
							<NumberInput 
								value={this.props.quizWeight}
								onChange={(weight)=> this.props.updateQuizWeight(weight)} 
								min={1}
								max={100}
								step={1}
							/> 
						</Box>
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
			{this.props.targetClass.thumbPoll &&
			<ThumbPoll/>}
      {this.props.teachersClassView.showQuizBuilderModal === true ?
					<Layer closer={true}
								 flush={true} 
								 overlayClose={true}
								 onClose={this.toggleQuizBuilderModal}>
						<Split fixed={false}
									//  style={{background: '#F8EEE7'}}
									 separator={false}
									 showOnResponsive='both'>
							<Box size="xlarge" >
								<Header pad={{ vertical: "medium", horizontal: "medium" }} style={{color: "#F5D76E", alignContent: "center", background:"#C7D8C6"}} >
									<Heading style={{marginLeft: "160px"}}>
										Create A New Quiz
									</Heading>
								</Header>
								<Form compact={false} pad={{ vertical: "small", horizontal: "large" }} style={{alignContent: 'stretch', width: '750px'}}>
										{/* <Section pad={{ vertical: "medium", horizontal: "medium" }}> */}
											{/* <FormFields>  */}
								<Box>
									<Box direction='row' pad="medium" style={{marginTop: "10px"}} full="horizontal" alignContent="center">
										<TextInput 
											style={{width: '305px'}}
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
									</Box>
												<Box
													size="full"
													full="horizontal"
												>
													{this.props.teachersClassView.newQuiz.questions.map((each, index) => {
															return (
																<Box pad="medium" style={{marginTop: "10px"}} full="horizontal" alignContent="center">
																	<Box direction='column'>
																		<Title>{'Question' + ' ' + Number(index + 1)}</Title>
																	</Box>
																	<Box direction='row'>
																		<textarea placeHolder="Question..."
																							style={{resize:'none', width: '700px', marginBottom:'10px'}}
																							//style={{color: each.question ? 'pink' : 'black'}}
																							value={each.id ? each.question : each.text}
																							onChange={(event) => {this.props.addQuestionText(event, index)}}/>
																		<Button icon={<SubtractCircleIcon 
																						onClick={() => this.props.deleteQuestion(index)}/>} />
																	</Box>
																	{each.answers.map((eachAnswer, answerIndex) => {
																		return (
																			<Box direction='row'>
																				<CheckBox 
																									toggle={false}
																									reverse={true} 
																									checked={eachAnswer.correct ? true : eachAnswer.isCorrect ? true : false}
																									onChange={() => this.props.chooseCorrectAnswer(index, answerIndex)}/>
																				<TextInput placeHolder="Answer..."
																									 style={{width: '600px'}}	
																									 value={eachAnswer.answer ? eachAnswer.answer : eachAnswer.text}
																									 onDOMChange={(event) => this.props.addAnswerText(event, index, answerIndex)}/>
																				<Button icon={<SubtractCircleIcon onClick={() => this.props.deleteAnswer(index, answerIndex)}/>} />	
																			</Box>
																		)
																	})}
																	<Box direction='row' justify='end' style={{marginRight: '35px'}}>
																		<Button icon={<AddCircleIcon />} 
																						label="Add Answer"
																						//hoverIndicator={{background: 'neutral-2'}}
																						plain={true}
																						onClick={() => {this.props.addAnswer(index)}}/>
																		</Box>
																	</Box>
															)
														}) }
														</Box>
													<Box direction='row' justify='end' style={{marginRight: '35px'}}>
														<Button icon={<AddCircleIcon />}
																		secondary={true}
																		onClick={() => this.props.setQuestionNumber()}
																		// plain={true}
																		label="Add Question"/>
													</Box>
											{/* </FormFields>
										</Section> */}
										</Box>
									<Footer pad={{"vertical": "medium", horizontal: "small"}}>
										<Box direction='row' full='horizontal' justify="center">
											<Button label='Create Quiz'
															style={{background: "#739172"}}
															critical={false}
															secondary={true}
															// accent={true}
															style={{width: '340px'}}
															icon={<DeployIcon />}
															onClick={() => this.props.addNewQuiz({authorId: this.props.teachersClassView.targetClass.teacher_id, quiz: this.props.teachersClassView.newQuiz})}/>
										</Box>
									</Footer>
								</Form>
							</Box>
							<Box size="xlarge">
								<Header pad={{ vertical: "medium", horizontal: "medium" }} colorIndex="light-2" style={{color: "#F4DECB", alignContent: "center", background: "#49274A"}}>
									<Heading style={{marginLeft: "160px"}}>
										Past Questions
									</Heading>
								</Header>
								<Accordion openMulti={false}
													 onActive={(index) => this.props.selectedQuestion(this.props.teachersClassView.questions[index])}>
									{this.props.teachersClassView.questions.map((question, i) => {
										return (
											// <AccordionPanel key={i} heading={question.question}>
											<AccordionPanel key={i} heading={
												<Box direction='row' full='horizontal' margin='small' alignContent='stretch' justify='between'>
													<Box direction='column' justify='start' alignContent='between' style={{width: '400px', maxWidth: '720px'}} style={{marginRight: 'auto'}}>
														<Heading tag='h4'>
															{question.question}
														</Heading>
													</Box>
													{this.props.teachersClassView.showAddQuestionButton ? 
														<Box direction='column' justify='end' alignContent='center' style={{width: '298px'}} style={{marginRight: '30px'}}>
															<Heading tag='h3'>
																<Button onClick={() => this.props.addRecycledQuestion(question)}>Add Question</Button>
															</Heading>
                          	</Box> 
													: <Box></Box>}
													<Box direction='column' justify='end' alignContent='center' style={{width: '298px'}} style={{marginRight: '30px'}}>
                            <Heading tag='h5' style={{color: question.timeAvg > 1 ? "#ef9210" : "#408760"}}>
                              Average Time: {question.timeAvg ? question.timeAvg + ' min' : 'TBD'}
                            </Heading>
                          </Box>
												</Box>
											}>
												{/* <Label>
													{question.timeAvg + ' min'}
													{this.props.teachersClassView.showAddQuestionButton ? <Button onClick={() => this.props.addRecycledQuestion(question)}>Add Question</Button> : <div></div>}
												</Label> */}
												<List>
												{question.answers.map((eachAnswer, i) => {
													let isCorrect = eachAnswer.correct;
													var marker;
													if (eachAnswer.correct === true) {
														marker = <Status value='ok' style={{marginRight:'10px'}} />
													} else if (eachAnswer.correct === false) {
														marker = <Status value='critical' style={{marginRight:'10px'}} />
													}
													return (
														<ListItem key={i} separator='horizontal'>
                              {marker}    {i+1}) {eachAnswer.answer}
                            </ListItem>
														// <Notification
														// 	message={eachAnswer.answer}
														// 	size='small'
														// 	status={eachAnswer.correct ? 'ok' : 'critical'}/>
													)
												})}
												</List>
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
