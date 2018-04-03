import React from 'react';
import "grommet/scss/hpinc/index.scss";
import Columns from 'grommet/components/Columns';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Section from 'grommet/components/Section';
import DeployIcon from 'grommet/components/icons/base/Deploy';
import CheckboxSelectedIcon from 'grommet/components/icons/base/CheckboxSelected'
import Table from 'grommet/components/Table';
import Distribution from 'grommet/components/Distribution';
import TableRow from 'grommet/components/TableRow';
import TableHeader from 'grommet/components/TableHeader';
import Value from 'grommet/components/Value';
import Sort from 'grommet-addons/components/Sort'
import Animate from './animate.jsx';
import fb from '../../../db/liveClassroom.js';
import ScoreDistribution from './quizViewDistribution.jsx';
import Timer from '../students/Timer.jsx'
import UserImage from '../UserImage.jsx'
import Heading from 'grommet/components/Heading';
import Label from 'grommet/components/Label';
import Fade from 'grommet/components/Animate';

import moment from 'moment'

const QuizData = ({ targetClass, student, quiz, quizIds, studentQuiz, nextInLine }) => {
	// const targetClass = props.currentClass;
	// const students = targetClass.students;
	// const quiz = targetClass.quizzes[targetClass.activeView];
	// const quizIds = Object.keys(quiz.questions);

	const endQuiz = function() {
		fb.updateActiveView(false, targetClass.id)
	}

	return (
		<TableRow>
			<td>
			<Box
				direction="column"
				size="full"
				margin="small"
				alignContent="between"
			>
				<Box
					direction="row"
					size="full"
					margin="small"
				>
					<Box
						direction="row"
						justify="start"
						alignContent="between"
						style={{width: '400px'}}
						style={{marginRight: 'auto'}}
					>
						<UserImage 
							handRaised={student.handRaised} 
							nextInLine={nextInLine} 
							student={student}
							targetClass={targetClass}
							isHere={student.isHere}
							url={student.thumbnail}
						/>
						<Heading 
							tag="h3"
							truncate={true}
							style={{textAlign: 'center', lineHeight: '50px', marginLeft: '20px', marginBottom: 0}}
						>
							{student.name}
						</Heading>
					</Box>
					
					<Box
						direction="column"
						justify="start"
						style={{margin: '0 50px 0 50px'}}
					>
						{studentQuiz && studentQuiz.currentQuestion >= 0 ?
							studentQuiz.isFinished ?
							<Fade 
								enter={{"animation": "slide-right", "duration": 300, "delay": 0}}
								leave={{"animation": "slide-left", "duration": 300, "delay": 0}}
								keep={false}
							>
								<Value value={'Completed!'}
									icon={<CheckboxSelectedIcon />}
									align="start"
									responsive={false}
									reverse={false}
									colorIndex='ok' 
									style={{width: '500px', justify: 'start'}}
								/> 
							</Fade>
							: 
							<div>
								<Label
									size="small"
								>
									Working On:
								</Label>
								<Animate 
									text={studentQuiz && studentQuiz.currentQuestion >= 0 ? quiz.questions[quizIds[studentQuiz.currentQuestion]].text : ''}
								/>
							</div>
							:
							<div>
							</div>
						}
					</Box>
					<Box
						direction="column"
						justify="start"
						alignContent="center"
						// style={{width: '250px'}}
						style={{marginRight: '30px'}}
					>
						{studentQuiz && studentQuiz.currentQuestion >= 0 &&
						<div>
							<Label
								size="small"
							>
								For:
							</Label>
							<div style={{marginTop: '-8px'}}>
								<Value 
									size="medium"
									value={studentQuiz && studentQuiz.currentQuestion >= 0 ? moment.duration(studentQuiz.responses[quizIds[studentQuiz.currentQuestion]].time).minutes() : null}
									responsive={false} />
								<Value 
									size="medium"
									value={':'}
									responsive={false} />
								<Value 
									size="medium"
									value={
											moment.duration(studentQuiz.responses[quizIds[studentQuiz.currentQuestion]].time).seconds().toString().length < 2 ?
											'0' + moment.duration(studentQuiz.responses[quizIds[studentQuiz.currentQuestion]].time).seconds() : 
											moment.duration(studentQuiz.responses[quizIds[studentQuiz.currentQuestion]].time).seconds()}
									responsive={false} />
							</div>
						</div>
						}
					</Box>
				</Box>
				<Box
					size="full"
					// style={{marginTop: '10px'}}
				>
					{studentQuiz && studentQuiz.currentQuestion >= 0 && 
					<ScoreDistribution
						studentQuiz={studentQuiz}
						quiz={quiz}
					/> }
				</Box>
				</Box>
			</td>
		</TableRow>
	)
}

export default QuizData;