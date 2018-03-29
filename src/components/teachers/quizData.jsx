import React from 'react';
import "grommet/scss/hpinc/index.scss";
import Columns from 'grommet/components/Columns';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Section from 'grommet/components/Section';
import DeployIcon from 'grommet/components/icons/base/Deploy';
import Table from 'grommet/components/Table';
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

import moment from 'moment'

const QuizData = ({ targetClass, student, quiz, quizIds, studentQuiz }) => {
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
				margin="medium"
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
						<UserImage handRaised={true}/>
						<Heading 
							tag="h3"
							style={{textAlign: 'center', lineHeight: '50px', marginLeft: '20px', marginBottom: 0}}
						>
							{student.name}
						</Heading>
					</Box>

					<Box
						direction="column"
						justify="start"
						// alignContent=""
						style={{width: '500px', margin: '0 50px 0 50px'}}
					>
						{studentQuiz.currentQuestion >= 0 &&
						<div>
							<Label
								size="small"
							>
								Working On:
							</Label>
							<Animate 
								text={studentQuiz.currentQuestion >= 0 ? quiz.questions[quizIds[studentQuiz.currentQuestion]].text : ''}
							/>
						</div>
						}
					</Box>
					<Box
						direction="column"
						justify="start"
						alignContent="center"
						style={{width: '250px'}}
					>
						{studentQuiz.currentQuestion >= 0 &&
						<div>
							<Label
								size="small"
							>
								For:
							</Label>
							<div style={{marginTop: '-8px'}}>
								<Value 
									size="medium"
									value={studentQuiz.currentQuestion >= 0 ? moment.duration(studentQuiz.responses[quizIds[studentQuiz.currentQuestion]].time).minutes() : null}
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
					{studentQuiz.currentQuestion >= 0 && 
					<ScoreDistribution
						studentQuiz={studentQuiz}
						quiz={quiz}
					/>}
				</Box>
				</Box>
			</td>
		</TableRow>
	)
}

export default QuizData;