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
import Sort from 'grommet-addons/components/Sort'

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
			}
		}
	}

const QuizView = ({}) => {
	return (
		<div>
			{/* <Sort 
				options={['Name', 'Current Question', 'Time', 'Score']}
				value='Name'
				direction='asc'
				// onChange={...}
			/> */}
			<Table>
			<TableHeader labels={['Name', 'Current Question', 'Time on Question', 'Score']}
				sortIndex={false}
				sortAscending={true}
			/>
			<tbody>
			{Object.keys(students).map(studentId => {

					// !-- Need to add more human readable variables for long object paths

				return <TableRow 
					style={{
						background: students[studentId].quizzes[quiz.id].isFinished ? 'lightgreen' : students[studentId].isHere ? 'white' : 'lightgrey',
						height: '100px'
					}}>
					<td>
						{students[studentId].name}
					</td>
					<td className='secondary'>
						{
							quiz.questions[students[studentId].quizzes[quiz.id].currentQuestion].position + ': ' +
							quiz.questions[students[studentId].quizzes[quiz.id].currentQuestion].text
						}
					</td>
					<td className='secondary'>
						{moment.duration(students[studentId].quizzes[quiz.id].responses[students[studentId].quizzes[quiz.id].currentQuestion].time).humanize()}
					</td>
					<td className='secondary'>
						{
							Object.keys(students[studentId].quizzes[quiz.id].responses).reduce((score, questionKey)=> {

								let isCorrect = 
								Object.keys(students[studentId].quizzes[quiz.id].responses[questionKey].answers).reduce((acc, answerKey)=> {
									if (quiz.questions[questionKey].answers[answerKey].isCorrect !== students[studentId].quizzes[quiz.id].responses[questionKey].answers[answerKey]) {
										return false
									} else {
										return acc
									}
								}, true)

								if (isCorrect) {
									return ++score
								} else {
									return score
								}

							}, 0) + '/' + Object.keys(quiz.questions).length
						}
					</td>
				</TableRow>
			})
			}
			</tbody>
			</Table>
		</div>
	)
}

export default QuizView;