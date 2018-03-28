let quiz = {
	name: 'Recursion',
	subject_id: 1,
	questions: {
		1: {
			id: 1, //question id
			text: 'This is a question',
			answers: {
			1: {text: 'this is an answer', isCorrect: true},
			2: {text: 'this is an answer', isCorrect: false},
			3: {text: 'this is an answer', isCorrect: false},
			4: {text: 'this is an answer', isCorrect: false}
			}
		}, 
		2: {
			id: 1, //question id
			text: 'This is another question',
			answers: {
			1: {text: 'this is an answer', isCorrect: false},
			2: {text: 'this is an answer', isCorrect: false},
			3: {text: 'this is an answer', isCorrect: true}
			}
		}
	}
}