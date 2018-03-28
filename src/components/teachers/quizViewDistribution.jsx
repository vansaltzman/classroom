import React from 'react';
import "grommet/scss/hpinc/index.scss";
import Distribution from 'grommet/components/Distribution';


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

const QuizView = ({studentQuiz, quiz}) => {

		let correct = 0
		let wrong = 0
		let total = Object.keys(quiz.questions).length

		Object.keys(studentQuiz.responses).forEach(questionKey=> {

			let isCorrect = 
			Object.keys(studentQuiz.responses[questionKey].answers).reduce((acc, answerKey)=> {
				if (quiz.questions[questionKey].answers[answerKey].isCorrect !== studentQuiz.responses[questionKey].answers[answerKey]) {
					return false
				} else {
					return acc
				}
			}, true)

			if (isCorrect) {
				++correct
			} else if (studentQuiz.responses[questionKey].answers.includes(true)) {
				++wrong
			}	
		})


		console.log('c,w,t', correct, wrong, total)

	return (
	<Distribution 
		style={{height: '38px'}}
		series={[{"label": "Correct", "value": correct, "colorIndex": "ok"}, {"label": "Wrong", "value": wrong, "colorIndex": "critical"}, {"label": "Remaining", "value": (total - (correct + wrong)), "colorIndex": "unknown"}]}
		size='small'
		full={false} 
	/>
	)
}

export default QuizView;