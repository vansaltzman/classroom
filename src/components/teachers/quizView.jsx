import React from 'react';
import "grommet/scss/hpinc/index.scss";
import Columns from 'grommet/components/Columns';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Anchor from 'grommet/components/Anchor';
import Section from 'grommet/components/Section';
import DeployIcon from 'grommet/components/icons/base/Deploy';
import SubtractCircle from 'grommet/components/icons/base/SubtractCircle';
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
import QuizData from './quizData.jsx'
import Headline from 'grommet/components/Headline';

import moment from 'moment'


// Current question initial state: 

	// Object.keys(quiz.questions).filter(question => question.position === 1)

	// This should be set in firebase when teacher releases quiz to class

const students = {
		'37': 
		 { name: 'Carlos Ramon',
			 isHere: true,
			 email: 'cramo@magic.bus',
			 quizzes: {
				 12 : {
					 id: 12,
					 isFinished: true,
					 responses: {
						 1: {
							 id: 1,
							 time: 900000,
							 answers: {
								1: true,
								2: false,
								3: false,
								4: false
							 }
							},
							2: {
								id: 2,
								time: 230000,
								answers: {
								 1: false,
								 2: false,
								 3: true,
							 }
							}
						},
						currentQuestion: 1,
					}
				}
		},
		'38': 
		 { name: 'Keesha Franklin',
			 isHere: true,
			 email: 'kfrank@magic.bus',
			 quizzes: {
				12 : {
					id: 12,
					isFinished: false,
					responses: {
						1: {
							id: 1,
							time: 90000,
							answers: {
							 1: false,
							 2: false,
							 3: false,
							 4: false
							}
						 },
						 2: {
							 id: 2,
							 time: 230000,
							 answers: {
								1: false,
								2: false,
								3: false,
							}
						 }
					 },
					 currentQuestion: 2,
				 }
			 }
		},
		'39': 
		 { name: 'Dorothy Rourke',
			 isHere: true,
			 email: 'drour@magic.bus',
			 quizzes: {
				12 : {
					id: 12,
					isFinished: false,
					responses: {
						1: {
							id: 1,
							time: 60000,
							answers: {
							 1: false,
							 2: false,
							 3: false,
							 4: false
							}
						 },
						 2: {
							 id: 2,
							 time: 60000,
							 answers: {
								1: false,
								2: false,
								3: false,
							}
						 }
					 },
					 currentQuestion: 2,
				 }
			 }
		},
		'40': 
		 { name: 'Arnold Perlstein',
			 isHere: false,
			 email: 'aperl@magic.bus',
			 quizzes: {
				12 : {
					id: 12,
					isFinished: false,
					responses: {
						1: {
							id: 1,
							time: 60000,
							answers: {
							 1: false,
							 2: false,
							 3: false,
							 4: false
							}
						 },
						 2: {
							 id: 2,
							 time: 60000,
							 answers: {
								1: false,
								2: false,
								3: false,
							}
						 }
					 },
					 currentQuestion: 1,
				 }
			 }
		}
	}

	const quiz = {
		id: 12,
		classId: 1,
		subject: 'History',
		name: 'This is the Quiz',
		endTime: 1521672378691,
		questions: {
			1: {
				position: 1,
				text: 'This is a question',
				answers: {
					1: {text: 'this is an answer', isCorrect: true},
					2: {text: 'this is an answer', isCorrect: false},
					3: {text: 'this is an answer', isCorrect: false},
					4: {text: 'this is an answer', isCorrect: false}
				}
			}, 
			2: {
				position: 2,
				text: 'This is another question',
				answers: {
					1: {text: 'this is an answer', isCorrect: false},
					2: {text: 'this is an answer', isCorrect: false},
					3: {text: 'this is an answer', isCorrect: true}
				}
			},
			3: {
				position: 3,
				text: 'This is another question',
				answers: {
					1: {text: 'this is an answer', isCorrect: false},
					2: {text: 'this is an answer', isCorrect: false},
					3: {text: 'this is an answer', isCorrect: true}
				}
			}
		}
	}

const QuizView = ({ props }) => {
	const targetClass = props.currentClass;
	const students = targetClass.students;
	const quiz = targetClass.quizzes[targetClass.activeView];
	const quizIds = Object.keys(quiz.questions);

	const endQuiz = function() {
		fb.updateActiveView(false, targetClass.id)
	}
	return (
		<div>
			{/* <Sort 
				options={['Name', 'Current Question', 'Time', 'Score']}
				value='Name'
				direction='asc'
				// onChange={...}
			/> */}

			{/* <Button
				label='End Quiz'
				onClick={()=> updateActiveView(false, currentClass.id)} 
			/> */}
			
			<Box
				direction="row"
				full="true"
				justify="between"
				alignContent="center"
				margin="small"
				colorIndex="light-2"
				style={{margin: '25px 50px 0 50px', padding: '5px'}}
			>
				<Anchor 
					icon={<SubtractCircle size="large" />}
					label='End Quiz'
					primary={false}
					path="/liveclass"
					style={{lineHeight: '100px', marginLeft: "10px"}}
					onClick={endQuiz.bind(this)}
				/>
				<Headline
					style={{marginBottom: 0, lineHeight: '100px'}}
				>
					{quiz.name}
				</Headline>
				<Timer 
					quizEndTime={quiz.time}
					quizDuration={quiz.quizDuration}
				/>
			</Box>
			{/* Add Quiz Header Here */}

			<Table>
			{/* 

				Error with Grommet source code relating to table headers
			
			<TableHeader labels={['Name', 'Current Question', 'Time on Question', 'Score']}
				sortIndex={false}
				sortAscending={true}
			/> */}
			<tbody>
			{Object.values(students)
			.sort((a, b) => {
				if (a.isHere === b.isHere) {
					return a.name.split(' ')[0] > b.name.split(' ')[0]
				} else {
					return b.isHere - a.isHere
				}
			}).map(student => {
					let studentQuiz = students[student.id].quizzes[quiz.id]
					var nextInLine = false;
					if (props.currentClass && props.currentClass.handRaisedQueue) {
						let handRaisedQueue = props.currentClass.handRaisedQueue;
						let lowestQueueTimeId = Object.values(handRaisedQueue).sort((a, b) => a.time - b.time)[0].studentId;
						if ( parseInt(lowestQueueTimeId) === parseInt(student.id)) nextInLine = true
					}

				return <QuizData
					key={student.id}
					targetClass={targetClass}
					studentQuiz={studentQuiz}
					student={student}
					quiz={quiz}
					quizIds={quizIds} 
					nextInLine={nextInLine}
				/>
			})
			}
			</tbody>
			</Table>
		</div>
	)
}

export default QuizView;