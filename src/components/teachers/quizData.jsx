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

import moment from 'moment'

const QuizData = ({ targetClass, student, quiz, quizIds }) => {
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
					direction="row"
					size="full"
				>
					<Box
						direction="row"
						justify="start"
						alignContent="between"
						style={{width: '300px'}}
					>
						<UserImage handRaised={true}/>
						<Heading 
							tag="h3"
							style={{textAlign: 'center', lineHeight: '54px', marginLeft: '20px'}}
						>
							{student.name}
						</Heading>
					</Box>
				</Box>
		{/*
			{studentQuiz.currentQuestion >= 0 &&
				<Animate text={studentQuiz.currentQuestion >= 0 ? quiz.questions[quizIds[studentQuiz.currentQuestion]].text : ''}
				/>
			}

			{studentQuiz.currentQuestion >= 0 &&
			<div>
				<Value 
					value={studentQuiz.currentQuestion >= 0 ? moment.duration(studentQuiz.responses[quizIds[studentQuiz.currentQuestion]].time).minutes() : null}
					responsive={false} />
				<Value 
					value={':'}
					responsive={false} />
				<Value 
					value={
							moment.duration(studentQuiz.responses[quizIds[studentQuiz.currentQuestion]].time).seconds().toString().length < 2 ?
							'0' + moment.duration(studentQuiz.responses[quizIds[studentQuiz.currentQuestion]].time).seconds() : 
							moment.duration(studentQuiz.responses[quizIds[studentQuiz.currentQuestion]].time).seconds()}
					responsive={false} />
				</div>

				{studentQuiz.currentQuestion >= 0 && 
				<ScoreDistribution
					studentQuiz={studentQuiz}
					quiz={quiz}
				/>}
				*/}	
			</td>
		</TableRow>
	)
}

export default QuizData;