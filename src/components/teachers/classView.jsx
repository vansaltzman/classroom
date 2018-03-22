import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/index.js';

import "grommet/scss/hpinc/index.scss";
import Columns from 'grommet/components/Columns';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Section from 'grommet/components/Section';
import DeployIcon from 'grommet/components/icons/base/Deploy';

class ClassView extends React.Component {
	constructor() {
		super();
	}

	handleGoLive() {
		axios.get('/class', {
			params:{classId: this.props.classId}
		}).then((classObj)=> {
			this.props.goLive(classObj.data)
		})
	}

  render() {
		return(
			<Section>
				<Button icon={<DeployIcon />}
  							label='Go Live'
  								onClick={()=> this.handleGoLive()}
  							primary={false}
  							secondary={false}
  							accent={true}
  							critical={false}
  							plain={false} />
				<Columns masonry={false}
								maxCount={2}
								size='large'
								align='center'>
					<Box align='center'
							pad='medium'
							margin='small'
							colorIndex='light-2'>
						Side bar for students list
					</Box>
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
		students: state.teacherClassView.students,
		quizzes: state.teacherClassview.quizzes,
		classId: state.teacherClassview.classId
  };
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(ClassView);