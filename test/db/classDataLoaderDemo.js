const classObj = {
    // 1:{
          activeView: 1,
          first_name: "Valerie",
          id: 1,
          isLive: false,
          last_name: "Frizzle",
          name: "Magic Class",
          quarter: "First",
          subject_id: 1,
          teacher: "Valerie Frizzle",
          teacher_id: 1,
          thunmbnail: "https://regmedia.co.uk/2016/10/17/javascript_ph...",
          year: "2018",
          quizzes: {
              1: {
                  id: 1,
                  name: "Quiz 1",
                  quizDuration: 900,
                  subject: "Magic",
                  time: 1234,
                  weight: 10,
                  questions: {
                      1: {
                          text: "What is our teacher name?",
                          draft_question_id: 1,
                          id: 1,
                          position: 0,
                          answers: {
                              1: {
                                  id: 1,
                                  isCorrect: false,
                                  text: "Ara"
                              },
                              2: {
                                  id: 2,
                                  isCorrect: false,
                                  text: "Adam"
                              },
                              3: {
                                  id: 3,
                                  isCorrect: true,
                                  text: "Joejoe"
                              }
                          }
                      },
                      3: {
                          text: "Is it magical?",
                          draft_question_id: 3,
                          id: 3,
                          position: 1,
                          answers: {
                              4: {
                                  id: 4,
                                  isCorrect: true,
                                  text: "no"
                              },
                              6: {
                                  id: 6,
                                  isCorrect: false,
                                  text: "yes"
                              }
                          }
                      },
                      2: {
                          text: "Dont you want to be done with thesis?",
                          draft_question_id: 2,
                          id: 2,
                          position: 2,
                          answers: {
                              7: {
                                  id: 7,
                                  isCorrect: true,
                                  text: "yes very much"
                              },
                              5: {
                                  id: 5,
                                  isCorrect: false,
                                  text: "not really i love it"
                              },
                              8: {
                                  id: 8,
                                  isCorrect: false,
                                  text: "whatever"
                              }
                          }
                      }	
                  }
              }
          },
          students: {
              1: {
                  email: "pnn2104@columbia.edu",
                  handRaised: false,
                  id: 1,
                  isHere: true,
                  name: "Ara Nguyen",
                  quizzes: {
                      1: {
                          currentQuestion: -1,
                          id: 1,
                          isFinished: false,
                          responses: {
                              1: {
                                  answers: {
                                      1: false,
                                      2: false,
                                      3: true
                                  },
                                  id: "1",
                                  time: 4479
                              },
                              3: {
                                  answers: {
                                      4: true,
                                      6: false
                                  },
                                  id: "3",
                                  time: 5750
                              },
                              2: {
                                  answers: {
                                      7: true,
                                      5: false,
                                      8: false
                                  },
                                  id: "2",
                                  time: 3225
                              }
                          }
                      }
                  }
              },
              2: {
                  email: "adam@mateo.edu",
                  handRaised: false,
                  id: 2,
                  isHere: true,
                  name: "Adam Mateo",
                  quizzes: {
                      1: {
                          currentQuestion: -1,
                          id: 1,
                          isFinished: false,
                          responses: {
                              1: {
                                  answers: {
                                      1: false,
                                      2: false,
                                      3: true
                                  },
                                  id: "1",
                                  time: 4479
                              },
                              3: {
                                  answers: {
                                      4: true,
                                      6: false
                                  },
                                  id: "3",
                                  time: 5750
                              },
                              2: {
                                  answers: {
                                      7: true,
                                      5: false,
                                      8: false
                                  },
                                  id: "2",
                                  time: 3225
                              }
                          }
                      }
                  }
              },
              3: {
                  email: "jerry@chen.edu",
                  handRaised: false,
                  id: 3,
                  isHere: true,
                  name: "Jerry Chen",
                  quizzes: {
                      1: {
                          currentQuestion: -1,
                          id: 1,
                          isFinished: false,
                          responses: {
                              1: {
                                  answers: {
                                      1: false,
                                      2: false,
                                      3: true
                                  },
                                  id: "1",
                                  time: 4479
                              },
                              3: {
                                  answers: {
                                      4: true,
                                      6: false
                                  },
                                  id: "3",
                                  time: 5750
                              },
                              2: {
                                  answers: {
                                      7: true,
                                      5: false,
                                      8: false
                                  },
                                  id: "2",
                                  time: 3225
                              }
                          }
                      }
                  }
              },
              4: {
                  email: "artem@ipatev.edu",
                  handRaised: false,
                  id: 4,
                  isHere: true,
                  name: "Artem Ipatev",
                  quizzes: {
                      1: {
                          currentQuestion: -1,
                          id: 1,
                          isFinished: false,
                          responses: {
                              1: {
                                  answers: {
                                      1: false,
                                      2: false,
                                      3: true
                                  },
                                  id: "1",
                                  time: 4479
                              },
                              3: {
                                  answers: {
                                      4: true,
                                      6: false
                                  },
                                  id: "3",
                                  time: 5750
                              },
                              2: {
                                  answers: {
                                      7: true,
                                      5: false,
                                      8: false
                                  },
                                  id: "2",
                                  time: 3225
                              }
                          }
                      }
                  }
              },
              5: {
                  email: "Riley",
                  handRaised: false,
                  id: 5,
                  isHere: true,
                  name: "Riley Alsman",
                  quizzes: {
                      1: {
                          currentQuestion: -1,
                          id: 1,
                          isFinished: false,
                          responses: {
                              1: {
                                  answers: {
                                      1: false,
                                      2: false,
                                      3: true
                                  },
                                  id: "1",
                                  time: 4479
                              },
                              3: {
                                  answers: {
                                      4: true,
                                      6: false
                                  },
                                  id: "3",
                                  time: 5750
                              },
                              2: {
                                  answers: {
                                      7: true,
                                      5: false,
                                      8: false
                                  },
                                  id: "2",
                                  time: 3225
                              }
                          }
                      }
                  }
              },
              6: {
                  email: "juan@galan.edu",
                  handRaised: false,
                  id: 6,
                  isHere: true,
                  name: "Juan Galan",
                  quizzes: {
                      1: {
                          currentQuestion: -1,
                          id: 1,
                          isFinished: false,
                          responses: {
                              1: {
                                  answers: {
                                      1: false,
                                      2: true,
                                      3: false
                                  },
                                  id: "1",
                                  time: 4479
                              },
                              3: {
                                  answers: {
                                      4: true,
                                      6: false
                                  },
                                  id: "3",
                                  time: 5750
                              },
                              2: {
                                  answers: {
                                      7: true,
                                      5: false,
                                      8: false
                                  },
                                  id: "2",
                                  time: 3225
                              }
                          }
                      }
                  }
              },
              7: {
                  email: "alex@levine.edu",
                  handRaised: false,
                  id: 7,
                  isHere: true,
                  name: "Alex Levine",
                  quizzes: {
                      1: {
                          currentQuestion: -1,
                          id: 1,
                          isFinished: false,
                          responses: {
                              1: {
                                  answers: {
                                      1: false,
                                      2: false,
                                      3: true
                                  },
                                  id: "1",
                                  time: 4479
                              },
                              3: {
                                  answers: {
                                      4: true,
                                      6: false
                                  },
                                  id: "3",
                                  time: 5750
                              },
                              2: {
                                  answers: {
                                      7: true,
                                      5: false,
                                      8: false
                                  },
                                  id: "2",
                                  time: 3225
                              }
                          }
                      }
                  }
              },
              8: {
                  email: "alex@chojnacki.edu",
                  handRaised: false,
                  id: 8,
                  isHere: true,
                  name: "Alex Chojnacki",
                  quizzes: {
                      1: {
                          currentQuestion: -1,
                          id: 1,
                          isFinished: false,
                          responses: {
                              1: {
                                  answers: {
                                      1: false,
                                      2: false,
                                      3: true
                                  },
                                  id: "1",
                                  time: 4479
                              },
                              3: {
                                  answers: {
                                      4: true,
                                      6: false
                                  },
                                  id: "3",
                                  time: 5750
                              },
                              2: {
                                  answers: {
                                      7: true,
                                      5: false,
                                      8: false
                                  },
                                  id: "2",
                                  time: 3225
                              }
                          }
                      }
                  }
              },
              9: {
                  email: "eric@sin.edu",
                  handRaised: false,
                  id: 9,
                  isHere: true,
                  name: "Eric Sin",
                  quizzes: {
                      1: {
                          currentQuestion: -1,
                          id: 1,
                          isFinished: false,
                          responses: {
                              1: {
                                  answers: {
                                      1: false,
                                      2: false,
                                      3: true
                                  },
                                  id: "1",
                                  time: 4479
                              },
                              3: {
                                  answers: {
                                      4: true,
                                      6: false
                                  },
                                  id: "3",
                                  time: 5750
                              },
                              2: {
                                  answers: {
                                      7: false,
                                      5: true,
                                      8: false
                                  },
                                  id: "2",
                                  time: 3225
                              }
                          }
                      }
                  }
              },
              10: {
                  email: "rory@reagan.edu",
                  handRaised: false,
                  id: 10,
                  isHere: true,
                  name: "Rory Reagan",
                  quizzes: {
                      1: {
                          currentQuestion: -1,
                          id: 1,
                          isFinished: false,
                          responses: {
                              1: {
                                  answers: {
                                      1: false,
                                      2: false,
                                      3: true
                                  },
                                  id: "1",
                                  time: 4479
                              },
                              3: {
                                  answers: {
                                      4: true,
                                      6: false
                                  },
                                  id: "3",
                                  time: 5750
                              },
                              2: {
                                  answers: {
                                      7: true,
                                      5: false,
                                      8: false
                                  },
                                  id: "2",
                                  time: 3225
                              }
                          }
                      }
                  }
              },
              11: {
                  email: "brent@hagen.edu",
                  handRaised: false,
                  id: 11,
                  isHere: true,
                  name: "Brent Hagen",
                  quizzes: {
                      1: {
                          currentQuestion: -1,
                          id: 1,
                          isFinished: false,
                          responses: {
                              1: {
                                  answers: {
                                      1: false,
                                      2: false,
                                      3: true
                                  },
                                  id: "1",
                                  time: 4479
                              },
                              3: {
                                  answers: {
                                      4: true,
                                      6: false
                                  },
                                  id: "3",
                                  time: 5750
                              },
                              2: {
                                  answers: {
                                      7: true,
                                      5: false,
                                      8: false
                                  },
                                  id: "2",
                                  time: 3225
                              }
                          }
                      }
                  }
              },
              12: {
                  email: "aloralyn@ayran.edu",
                  handRaised: false,
                  id: 12,
                  isHere: true,
                  name: "Aloralyn Ayran",
                  quizzes: {
                      1: {
                          currentQuestion: -1,
                          id: 1,
                          isFinished: false,
                          responses: {
                              1: {
                                  answers: {
                                      1: false,
                                      2: false,
                                      3: true
                                  },
                                  id: "1",
                                  time: 4479
                              },
                              3: {
                                  answers: {
                                      4: true,
                                      6: false
                                  },
                                  id: "3",
                                  time: 5750
                              },
                              2: {
                                  answers: {
                                      7: false,
                                      5: true,
                                      8: false
                                  },
                                  id: "2",
                                  time: 3225
                              }
                          }
                      }
                  }
              },
              13: {
                  email: "allegra@bernt.edu",
                  handRaised: false,
                  id: 13,
                  isHere: true,
                  name: "Allegra Bernt",
                  quizzes: {
                      1: {
                          currentQuestion: -1,
                          id: 1,
                          isFinished: false,
                          responses: {
                              1: {
                                  answers: {
                                      1: false,
                                      2: false,
                                      3: true
                                  },
                                  id: "1",
                                  time: 4479
                              },
                              3: {
                                  answers: {
                                      4: true,
                                      6: false
                                  },
                                  id: "3",
                                  time: 5750
                              },
                              2: {
                                  answers: {
                                      7: true,
                                      5: false,
                                      8: false
                                  },
                                  id: "2",
                                  time: 3225
                              }
                          }
                      }
                  }
              },
              14: {
                  email: "michael@vasio.edu",
                  handRaised: false,
                  id: 14,
                  isHere: true,
                  name: "Michael Vasio",
                  quizzes: {
                      1: {
                          currentQuestion: -1,
                          id: 1,
                          isFinished: false,
                          responses: {
                              1: {
                                  answers: {
                                      1: false,
                                      2: false,
                                      3: true
                                  },
                                  id: "1",
                                  time: 4479
                              },
                              3: {
                                  answers: {
                                      4: true,
                                      6: false
                                  },
                                  id: "3",
                                  time: 5750
                              },
                              2: {
                                  answers: {
                                      7: true,
                                      5: false,
                                      8: false
                                  },
                                  id: "2",
                                  time: 3225
                              }
                          }
                      }
                  }
              },
              15: {
                  email: "xixi@chen.edu",
                  handRaised: false,
                  id: 15,
                  isHere: true,
                  name: "Xixi Chen",
                  quizzes: {
                      1: {
                          currentQuestion: -1,
                          id: 1,
                          isFinished: false,
                          responses: {
                              1: {
                                  answers: {
                                      1: false,
                                      2: false,
                                      3: true
                                  },
                                  id: "1",
                                  time: 4479
                              },
                              3: {
                                  answers: {
                                      4: true,
                                      6: false
                                  },
                                  id: "3",
                                  time: 5750
                              },
                              2: {
                                  answers: {
                                      7: true,
                                      5: false,
                                      8: false
                                  },
                                  id: "2",
                                  time: 3225
                              }
                          }
                      }
                  }
              },
              16: {
                  email: "manos@manose.edu",
                  handRaised: false,
                  id: 16,
                  isHere: true,
                  name: "Manos Manos",
                  quizzes: {
                      1: {
                          currentQuestion: -1,
                          id: 1,
                          isFinished: false,
                          responses: {
                              1: {
                                  answers: {
                                      1: false,
                                      2: false,
                                      3: true
                                  },
                                  id: "1",
                                  time: 4479
                              },
                              3: {
                                  answers: {
                                      4: false,
                                      6: true
                                  },
                                  id: "3",
                                  time: 5750
                              },
                              2: {
                                  answers: {
                                      7: true,
                                      5: false,
                                      8: false
                                  },
                                  id: "2",
                                  time: 3225
                              }
                          }
                      }
                  }
              },
              17: {
                  email: "marcus@hausler.edu",
                  handRaised: false,
                  id: 17,
                  isHere: true,
                  name: "Marcus Hausler",
                  quizzes: {
                      1: {
                          currentQuestion: -1,
                          id: 1,
                          isFinished: false,
                          responses: {
                              1: {
                                  answers: {
                                      1: false,
                                      2: false,
                                      3: true
                                  },
                                  id: "1",
                                  time: 4479
                              },
                              3: {
                                  answers: {
                                      4: false,
                                      6: true
                                  },
                                  id: "3",
                                  time: 5750
                              },
                              2: {
                                  answers: {
                                      7: true,
                                      5: false,
                                      8: false
                                  },
                                  id: "2",
                                  time: 3225
                              }
                          }
                      }
                  }
              },
              18: {
                  email: "Danny Schradder",
                  handRaised: false,
                  id: 18,
                  isHere: true,
                  name: "Danny Schradder",
                  quizzes: {
                      1: {
                          currentQuestion: -1,
                          id: 1,
                          isFinished: false,
                          responses: {
                              1: {
                                  answers: {
                                      1: false,
                                      2: true,
                                      3: false
                                  },
                                  id: "1",
                                  time: 4479
                              },
                              3: {
                                  answers: {
                                      4: false,
                                      6: true
                                  },
                                  id: "3",
                                  time: 5750
                              },
                              2: {
                                  answers: {
                                      7: false,
                                      5: true,
                                      8: false
                                  },
                                  id: "2",
                                  time: 3225
                              }
                          }
                      }
                  }
              },
              19: {
                  email: "quentin@quentin.edu",
                  handRaised: false,
                  id: 19,
                  isHere: true,
                  name: "Quentin Quentin",
                  quizzes: {
                      1: {
                          currentQuestion: -1,
                          id: 1,
                          isFinished: false,
                          responses: {
                              1: {
                                  answers: {
                                      1: false,
                                      2: true,
                                      3: false
                                  },
                                  id: "1",
                                  time: 4479
                              },
                              3: {
                                  answers: {
                                      4: false,
                                      6: true
                                  },
                                  id: "3",
                                  time: 5750
                              },
                              2: {
                                  answers: {
                                      7: false,
                                      5: true,
                                      8: false
                                  },
                                  id: "2",
                                  time: 3225
                              }
                          }
                      }
                  }
              },
              20: {
                  email: "chris@rigoli.edu",
                  handRaised: false,
                  id: 20,
                  isHere: true,
                  name: "Chris Rigoli",
                  quizzes: {
                      1: {
                          currentQuestion: -1,
                          id: 1,
                          isFinished: false,
                          responses: {
                              1: {
                                  answers: {
                                      1: false,
                                      2: true,
                                      3: false
                                  },
                                  id: "1",
                                  time: 4479
                              },
                              3: {
                                  answers: {
                                      4: false,
                                      6: true
                                  },
                                  id: "3",
                                  time: 5750
                              },
                              2: {
                                  answers: {
                                      7: false,
                                      5: true,
                                      8: false
                                  },
                                  id: "2",
                                  time: 3225
                              }
                          }
                      }
                  }
              },
              21: {
                  email: "yuqing@dong.edu",
                  handRaised: false,
                  id: 21,
                  isHere: true,
                  name: "Yuqing Dong",
                  quizzes: {
                      1: {
                          currentQuestion: -1,
                          id: 1,
                          isFinished: false,
                          responses: {
                              1: {
                                  answers: {
                                      1: false,
                                      2: false,
                                      3: true
                                  },
                                  id: "1",
                                  time: 4479
                              },
                              3: {
                                  answers: {
                                      4: true,
                                      6: false
                                  },
                                  id: "3",
                                  time: 5750
                              },
                              2: {
                                  answers: {
                                      7: true,
                                      5: false,
                                      8: false
                                  },
                                  id: "2",
                                  time: 3225
                              }
                          }
                      }
                  }
              },
              22: {
                  email: "eric@shum.edu",
                  handRaised: false,
                  id: 22,
                  isHere: true,
                  name: "Eric Shum",
                  quizzes: {
                      1: {
                          currentQuestion: -1,
                          id: 1,
                          isFinished: false,
                          responses: {
                              1: {
                                  answers: {
                                      1: false,
                                      2: false,
                                      3: true
                                  },
                                  id: "1",
                                  time: 4479
                              },
                              3: {
                                  answers: {
                                      4: true,
                                      6: false
                                  },
                                  id: "3",
                                  time: 5750
                              },
                              2: {
                                  answers: {
                                      7: true,
                                      5: false,
                                      8: false
                                  },
                                  id: "2",
                                  time: 3225
                              }
                          }
                      }
                  }
              }
          }
      // }
}

const randomAssignment = function(classObj) {
	console.log('initial classObj', classObj);
	const quiz = classObj.quizzes;
	const quizId = Object.keys(quiz)[0];
	//console.log('QUIZZZZ IDDDDDD', quizId)
	const questions = Object.values(quiz)[0].questions;
	const arrayOfQuestions = Object.values(questions);
	//console.log("questions", arrayOfQuestions)
	//key : value , id of question : id of correct answer
	const questionAndCorrectAnswer = {}

	for (var questionIndex = 0; questionIndex < arrayOfQuestions.length; questionIndex++) {
		var questionId = arrayOfQuestions[questionIndex].id;
		questionAndCorrectAnswer[questionId] = {inCorrect: []}
		var answers = Object.values(arrayOfQuestions[questionIndex].answers)
		for (var answerIndex = 0; answerIndex < answers.length; answerIndex++) {
			if (answers[answerIndex].isCorrect === true) {
				questionAndCorrectAnswer[questionId].correct = answers[answerIndex].id
			} else if (answers[answerIndex].isCorrect === false) {
				questionAndCorrectAnswer[questionId].inCorrect.push(answers[answerIndex].id)
			}
		}
	}
	console.log("questionAndCorrectAnswer", questionAndCorrectAnswer)

	const numberOfQuestions = Object.values(questions).length
	const multiples = 100 / numberOfQuestions;
	const possibleScores = [0];
	const students = Object.values(classObj.students);
	console.log('students', students);
	const studentId = Object.keys(classObj.students)
	

	var x = multiples;
	var i = 1;
	while (x <= 100) {
		var score = Math.round(multiples * i);
		x = score
		if (score <= 100) {
			possibleScores.push(score);
		}
		i++;
	}
	
	var numberOfCorrectQuestionsBasedOnScore = {}
	possibleScores.map((each) => {
		numberOfCorrectQuestionsBasedOnScore[each] = Math.round(numberOfQuestions * each / 100);
	})

	for (var j = 0; j < students.length; j++) {
		console.log('each student', students[j])
		var eachStudentId = students[j].id
		var studentQuiz = Object.values(students[j].quizzes)[0];
		//console.log('quiz', studentQuiz)
		var studentResponses = studentQuiz.responses;
		console.log('each student response before reassignment', studentResponses)
		var randomScore = possibleScores[Math.floor(Math.random()*possibleScores.length)]
		console.log("randomScore", randomScore);
		//how many questions student got correct based on scoore
		var correctQuestionNumber = numberOfCorrectQuestionsBasedOnScore[randomScore];
		if (correctQuestionNumber === 0) {
			for (var key in studentResponses) {
				//console.log('key', key)
				//get incorrect ansswer id from questionAndCorrectAnswer
				//array of in correct answers id for a question
				var incorrectAnswer = questionAndCorrectAnswer[key].inCorrect;
				//console.log("incorrectAnswer", incorrectAnswer)
				//id of an inccorect answer
				var randomIncorrectChoice = incorrectAnswer[Math.floor(Math.random()*incorrectAnswer.length)]
				//console.log("randomIncorrectChoice", randomIncorrectChoice)
				studentResponses[key].answers[randomIncorrectChoice] = true
			}
		} else if (correctQuestionNumber > 0) {
			//question ids array
			var questionIdsArray = Object.keys(studentResponses)
			var correctQuestionsArray = [];
			//pick a random questions to put it in the correct arrau
			while (correctQuestionsArray.length < correctQuestionNumber) {
				var randomq = questionIdsArray[Math.floor(Math.random()*questionIdsArray.length)]
				if (correctQuestionsArray.indexOf(randomq) === -1) {
					correctQuestionsArray.push(randomq);
				}
			}
			//console.log("questionIdsArray", questionIdsArray)
			//console.log("correctQuestionsArray", correctQuestionsArray)
			for (var correctQuestionIndex = 0; correctQuestionIndex < correctQuestionsArray.length; correctQuestionIndex++) {
				//get the correct answer id for the question
				var correcQuestionId = correctQuestionsArray[correctQuestionIndex];
				var correctAnswerId = questionAndCorrectAnswer[correcQuestionId].correct;
				studentResponses[correcQuestionId].answers[correctAnswerId] = true
			}
			classObj.students[eachStudentId].quizzes[quizId].responses = studentResponses
			console.log('after reassignment', studentResponses)
		}  
		Object.values(classObj.students).forEach((each) => {
				console.log('after MODIFIED', Object.values(each.quizzes)[0].responses)
		})
	
		return classObj;
	}
}

//randomAssignment(classObj);

randomAssignment(classObjTest);