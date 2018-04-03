import React from 'react';
import * as actions from '../../actions/index.js';
import moment from 'moment';
import axios from 'axios'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions/index.js";
import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';
import Box from 'grommet/components/Box';
import Split from 'grommet/components/Split';
import Heading from 'grommet/components/Heading';
import Label from 'grommet/components/Label';
import Notification from 'grommet/components/Notification';
import Select from 'grommet/components/Select';
import Section from 'grommet/components/Section';

import ClassPerformance from './classPerformace.jsx';

class Statistics extends React.Component {

  render() {
		return(
			<Section>
				<Section>
					<Select placeHolder='None'
						multiple={true}
						inline={false}
						// onSearch={...}
						options={this.props.teachersClassView.studentsAndPerformances ? 
							Object.values(this.props.teachersClassView.studentsAndPerformances).map((eachStudent, index) => {
								return eachStudent
							}) : ""}
						value={this.props.selectedGraphs}
						onChange={(target) => {this.props.selectGraphToShow(target)}} 
					/>
				</Section>
				{this.props.teachersClassView.takenQuizzesAverages ? <ClassPerformance /> : <div></div>}
			
				<Split>
					<Box>
						<Accordion
								// onActive={(index)=> this.selectQuiz(this.props.teachersClassView.quizzes[Object.keys(this.props.teachersClassView.quizzes)[index]])}
								>
									{Object.values(this.props.teachersClassView.takenQuizzes).map(quiz => {
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
					</Box>
					<Box>
					</Box>
				</Split>
			</Section>
		)
	}
}

function mapStateToProps(state) {
	return {
    teachersClassView: state.teachersClassView,
	}
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Statistics);
