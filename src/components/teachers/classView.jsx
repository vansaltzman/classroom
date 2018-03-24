import React from 'react';
import * as actions from '../../actions/index.js';

import "grommet/scss/hpinc/index.scss";
import Columns from 'grommet/components/Columns';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Section from 'grommet/components/Section';
import DeployIcon from 'grommet/components/icons/base/Deploy';
import SearchInput from 'grommet/components/SearchInput';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from '../../actions/index.js';

import classRoom from '../../../data/quizDummyData.js';
import fb from '../../../db/liveClassroom.js';

class ClassView extends React.Component {
	constructor() {
		super();

		this.launchNewQuiz = this.launchNewQuiz.bind(this)
	}

	launchNewQuiz(){
		fb.launchQuiz('1', classRoom.classRoom['25'].quizzes['12']) // takes classId and quiz Obj
	}

	componentWillMount() {
		//console.log('this.props.classId', this.props.classId);
		//getting all students for search input for teacher to add student to a new class
		this.props.getAllStudents();
		this.props.getStudentsBelongToAClass({id: this.props.classId});
	}

  render() {
		const { studentsInClass } = this.props;
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
								onClick={() => this.props.classGoLive(this.props.classId, this.props.targetClass)}/>

	<Button icon={<DeployIcon />}
  							label='Launch Quiz'
  							primary={false}
  							secondary={false}
  							accent={true}
  							critical={false}
  							plain={false} 
								onClick={this.launchNewQuiz()}/>
				<Columns masonry={false}
								maxCount={2}
								size='large'
								align='center'>
					<Box align='center'
							pad='medium'
							margin='small'
							colorIndex='light-2'>
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
  										 suggestions={this.props.studentNames} />
					<Box align='center'
							pad='medium'
							margin='small'
							colorIndex='light-2'>
						Quiz List
					</Box>
				</Columns>
			</Section>
		)
	}
}


function mapStateToProps(state) {
	return {
		targetClass: state.teachersClassView.targetClass,
		studentsInClass: state.teachersClassView.targetClass.students,
		students: state.teachersClassView.students,
		studentNames: state.teachersClassView.studentNames,
		classId: state.teachersClassView.targetClass.id
	}
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ClassView)

