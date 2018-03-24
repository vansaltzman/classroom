import React from 'react';
import * as actions from '../../actions/index.js';

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

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from '../../actions/index.js';

import classRoom from '../../../data/quizDummyData.js';
import launchQuiz from '../../../db/liveClassroom.js';

class ClassView extends React.Component {
	constructor() {
		super();
		state: {
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
		this.setState({selectedQuiz: quizObj}, ()=> {
			this.props.toggleQuizLauncherModalAction
		})

	}

  render() {
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

				<Button icon={<DeployIcon />}
					label='Launch Quiz'
					primary={false}
					secondary={false}
					accent={true}
					critical={false}
					plain={false} 
					onClick={() => this.launchNewQuiz()}
				/>

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
							<Tiles 
								fill={true}
							>
								<Tile separator='top'
									align='start'
								>
								<Header size='small'
									pad={{"horizontal": "small"}}
								>
									<Heading tag='h4'
										strong={true}
										margin='none'>
										Quiz 1
									</Heading>
								</Header>
								<Box pad='small'>
									<Paragraph margin='none'>
										Estimated Time: 28min
									</Paragraph>
								</Box>
								<Button
									onClick={this.props.toggleQuizLauncherModalAction}
								>
									Select
								</Button>
								</Tile>
							</Tiles>
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

