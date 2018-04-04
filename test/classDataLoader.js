var db = require('../db/mainDb.js').db

// let Ara = ['Ara', 'Nguyen', 'pnn2104@columbia.edu', '123456'];
// let Jae = ['Jae', 'Jang', 'jj2837@columbia.edu', '123456'];
// let Adam = ['Adam', 'Mateo', 'adam@mateo.edu', '123456'];
// let Jerry = ['Jerry', 'Chen', 'jerry@chen.edu', '123456'];
// let Artem = ['Artem', 'Ipatev', 'artem@ipatev.edu', '123456'];
// let Riley = ['Riley', 'Alsman', 'riley@alsman.edu', '123456'];
// let Juan = ['Juan', 'Galan', 'juan@galan.edu', '123456'];
// let AlexL = ['Alex', 'Levine', 'alex@levine.edu', '123456'];
// let AlexC = ['Alex', 'Chojnacki', 'alex@chojnacki.edu', '123456'];
// let EricSin = ['Eric', 'Sin', 'eric@sin.edu', '123456'];
// let Rory = ['Rory', 'Reagan', 'rory@reagan.edu', '123456'];
// let Brent = ['Brent', 'Hagen', 'brent@hagen.edu', '123456'];
// let Aloralyn = ['Aloralyn', 'Ayran', 'aloralyn@ayran.edu', '123456'];
// let Allegra = ['Allegra', 'Bernt', 'allegra@bernt.edu', '123456'];
// let Michael = ['Michael', 'Vasio', 'michael@vasio.edu', '123456'];
// let Xixi = ['Xixi', 'Chen', 'xixi@chen.edu', '123456'];
// let Manos = ['Manos', 'Manos', 'manos@manose.edu', '123456'];
// let Marcus = ['Marcus', 'Hausler', 'marcus@hausler.edu', '123456'];
// let Danny = ['Danny', 'Schradder', 'danny@schradder.edu', '123456'];
// let Quentin = ['Quentin', 'Quentin', 'quentin@quentin.edu', '123456'];
// let Chris = ['Chris', 'Rigoli', 'chris@rigoli.edu', '123456'];

const migrate = require('../server/migrationWorker.js')

const classObj = {
  // 1:{
		activeView: 4,
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
			4: {
				id: 4,
				name: "Magic Quiz 4",
				quizDuration: 900,
				subject: "Magic",
				time: 1234,
				weight: 10,
				questions: {
					5: {
						text: "What is our teacher name?",
						draft_question_id: 5,
						id: 5,
						position: 0,
						answers: {
							9: {
								id: 9,
								isCorrect: false,
								text: "Ara"
							},
							10: {
								id: 10,
								isCorrect: false,
								text: "Adam"
							},
							11: {
								id: 11,
								isCorrect: true,
								text: "Joejoe"
							}
						}
						},
						6: {
							text: "Is it magical?",
							draft_question_id: 6,
							id: 6,
							position: 1,
							answers: {
								12: {
									id: 12,
									isCorrect: true,
									text: "no"
								},
								13: {
									id: 13,
									isCorrect: false,
									text: "yea"
								}
							}
						},
						7: {
							text: "Dont you want to be done with thesis?",
							draft_question_id: 7,
							id: 7,
							position: 2,
							answers: {
								14: {
									id: 14,
									isCorrect: true,
									text: "yes very much"
								},
								15: {
									id: 15,
									isCorrect: false,
									text: "not really i love it"
								},
								16: {
									id: 16,
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
				email: "jerry@chen.edu",
				handRaised: false,
				id: 1,
				isHere: true,
				name: "Jerry Chen",
				quizzes: {
					4: {
						currentQuestion: -1,
						id: 4,
						isFinished: false,
						responses: {
							5: {
								answers: {
									9: false,
									10: false,
									11: true
								},
								id: "5",
								time: 4479
							},
							6: {
								answers: {
									12: true,
									13: false
								},
								id: "6",
								time: 5750
							},
							7: {
								answers: {
									14: true,
									15: false,
									16: false
								},
								id: "7",
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
					4: {
						currentQuestion: 3,
						id: 4,
						isFinished: false,
						responses: {
							5: {
								answers: {
									9: true,
									10: false,
									11: false
								},
								id: "5",
								time: 14572
							},
							6: {
								answers: {
									12: true,
									13: false
								},
								id: "6",
								time: 6331
							},
							7: {
								answers: {
									14: true,
									15: false,
									16: false
								},
								id: "7",
								time: 8484
							}
						}
					}
				}
			},
			2: {
				email: "pnn2104@columbia.edu",
				handRaised: false,
				id: 2,
				isHere: true,
				name: "Ara Nguyen",
				quizzes: {
					4: {
						currentQuestion: 3,
						id: 4,
						isFinished: false,
						responses: {
							5: {
								answers: {
									9: false,
									10: true,
									11: false
								},
								id: "5",
								time: 12572
							},
							6: {
								answers: {
									12: true,
									13: false
								},
								id: "6",
								time: 16831
							},
							7: {
								answers: {
									14: false,
									15: true,
									16: false
								},
								id: "7",
								time: 10484
							}
						}
					}
				}
			},
			3: {
				email: "adam@mateo.edu",
				handRaised: false,
				id: 3,
				isHere: true,
				name: "Adam Mateo",
				quizzes: {
					4: {
						currentQuestion: 3,
						id: 4,
						isFinished: false,
						responses: {
							5: {
								answers: {
									9: false,
									10: false,
									11: true
								},
								id: "5",
								time: 14572
							},
							6: {
								answers: {
									12: true,
									13: false
								},
								id: "6",
								time: 6331
							},
							7: {
								answers: {
									14: false,
									15: true,
									16: false
								},
								id: "7",
								time: 8484
							}
						}
					}
				}
			},
			5: {
				email: "juan@galan.edu",
				handRaised: false,
				id: 5,
				isHere: true,
				name: "Juan Galan",
				quizzes: {
					4: {
						currentQuestion: 3,
						id: 4,
						isFinished: false,
						responses: {
							5: {
								answers: {
									9: true,
									10: false,
									11: false
								},
								id: "5",
								time: 18572
							},
							6: {
								answers: {
									12: true,
									13: false
								},
								id: "6",
								time: 5331
							},
							7: {
								answers: {
									14: true,
									15: false,
									16: false
								},
								id: "7",
								time: 8484
							}
						}
					}
				}
			},
			6: {
				email: "alex@levine.edu",
				handRaised: false,
				id: 6,
				isHere: true,
				name: "Alex Levine",
				quizzes: {
					4: {
						currentQuestion: 3,
						id: 4,
						isFinished: false,
						responses: {
							5: {
								answers: {
									9: true,
									10: false,
									11: false
								},
								id: "5",
								time: 12572
							},
							6: {
								answers: {
									12: true,
									13: false
								},
								id: "6",
								time: 10331
							},
							7: {
								answers: {
									14: true,
									15: false,
									16: false
								},
								id: "7",
								time: 9484
							}
						}
					}
				}
			},
			8: {
				email: "eric@sin.edu",
				handRaised: false,
				id: 8,
				isHere: true,
				name: "Eric Sin",
				quizzes: {
					4: {
						currentQuestion: 3,
						id: 4,
						isFinished: false,
						responses: {
							5: {
								answers: {
									9: false,
									10: false,
									11: true
								},
								id: "5",
								time: 12572
							},
							6: {
								answers: {
									12: true,
									13: false
								},
								id: "6",
								time: 6331
							},
							7: {
								answers: {
									14: true,
									15: false,
									16: false
								},
								id: "7",
								time: 8484
							}
						}
					}
				}
			},
			9: {
				email: "Riley",
				handRaised: false,
				id: 9,
				isHere: true,
				name: "Riley Alsman",
				quizzes: {
					4: {
						currentQuestion: 3,
						id: 4,
						isFinished: false,
						responses: {
							5: {
								answers: {
									9: false,
									10: true,
									11: false
								},
								id: "5",
								time: 14572
							},
							6: {
								answers: {
									12: false,
									13: true
								},
								id: "6",
								time: 6331
							},
							7: {
								answers: {
									14: false,
									15: false,
									16: true
								},
								id: "7",
								time: 8484
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
					4: {
						currentQuestion: 3,
						id: 4,
						isFinished: false,
						responses: {
							5: {
								answers: {
									9: false,
									10: false,
									11: true
								},
								id: "5",
								time: 14572
							},
							6: {
								answers: {
									12: true,
									13: false
								},
								id: "6",
								time: 6331
							},
							7: {
								answers: {
									14: true,
									15: false,
									16: false
								},
								id: "7",
								time: 8484
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
				name: "Artem Ipatev",
				quizzes: {
					4: {
						currentQuestion: 3,
						id: 4,
						isFinished: false,
						responses: {
							5: {
								answers: {
									9: false,
									10: true,
									11: false
								},
								id: "5",
								time: 14572
							},
							6: {
								answers: {
									12: true,
									13: false
								},
								id: "6",
								time: 6331
							},
							7: {
								answers: {
									14: true,
									15: false,
									16: false
								},
								id: "7",
								time: 8484
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
					4: {
						currentQuestion: 3,
						id: 4,
						isFinished: false,
						responses: {
							5: {
								answers: {
									9: false,
									10: false,
									11: true
								},
								id: "5",
								time: 8572
							},
							6: {
								answers: {
									12: true,
									13: false
								},
								id: "6",
								time: 8331
							},
							7: {
								answers: {
									14: true,
									15: false,
									16: false
								},
								id: "7",
								time: 8484
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
					4: {
						currentQuestion: 3,
						id: 4,
						isFinished: false,
						responses: {
							5: {
								answers: {
									9: true,
									10: false,
									11: false
								},
								id: "5",
								time: 14572
							},
							6: {
								answers: {
									12: true,
									13: false
								},
								id: "6",
								time: 6331
							},
							7: {
								answers: {
									14: true,
									15: false,
									16: false
								},
								id: "7",
								time: 8484
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
					4: {
						currentQuestion: 3,
						id: 4,
						isFinished: false,
						responses: {
							5: {
								answers: {
									9: false,
									10: true,
									11: false
								},
								id: "5",
								time: 14572
							},
							6: {
								answers: {
									12: false,
									13: true
								},
								id: "6",
								time: 6331
							},
							7: {
								answers: {
									14: false,
									15: true,
									16: false
								},
								id: "7",
								time: 8484
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
					4: {
						currentQuestion: 3,
						id: 4,
						isFinished: false,
						responses: {
							5: {
								answers: {
									9: false,
									10: false,
									11: true
								},
								id: "5",
								time: 14572
							},
							6: {
								answers: {
									12: true,
									13: false
								},
								id: "6",
								time: 6331
							},
							7: {
								answers: {
									14: true,
									15: false,
									16: false
								},
								id: "7",
								time: 8484
							}
						}
					}
				}
			},
			16: {
				email: "manos@manos.edu",
				handRaised: false,
				id: 16,
				isHere: true,
				name: "Manos Manos",
				quizzes: {
					4: {
						currentQuestion: 3,
						id: 4,
						isFinished: false,
						responses: {
							5: {
								answers: {
									9: true,
									10: false,
									11: false
								},
								id: "5",
								time: 10572
							},
							6: {
								answers: {
									12: false,
									13: true
								},
								id: "6",
								time: 6331
							},
							7: {
								answers: {
									14: true,
									15: false,
									16: false
								},
								id: "7",
								time: 9484
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
				name: "Artem Ipatev",
				quizzes: {
					4: {
						currentQuestion: 3,
						id: 4,
						isFinished: false,
						responses: {
							5: {
								answers: {
									9: true,
									10: false,
									11: false
								},
								id: "5",
								time: 14572
							},
							6: {
								answers: {
									12: true,
									13: false
								},
								id: "6",
								time: 6331
							},
							7: {
								answers: {
									14: true,
									15: false,
									16: false
								},
								id: "7",
								time: 8484
							}
						}
					}
				}
			},
			18: {
				email: "Danny Schadder",
				handRaised: false,
				id: 18,
				isHere: true,
				name: "Artem Ipatev",
				quizzes: {
					4: {
						currentQuestion: 3,
						id: 4,
						isFinished: false,
						responses: {
							5: {
								answers: {
									9: false,
									10: true,
									11: false
								},
								id: "5",
								time: 14572
							},
							6: {
								answers: {
									12: false,
									13: true
								},
								id: "6",
								time: 6331
							},
							7: {
								answers: {
									14: false,
									15: true,
									16: false
								},
								id: "7",
								time: 8484
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
					4: {
						currentQuestion: 3,
						id: 4,
						isFinished: false,
						responses: {
							5: {
								answers: {
									9: false,
									10: true,
									11: false
								},
								id: "5",
								time: 14572
							},
							6: {
								answers: {
									12: false,
									13: true
								},
								id: "6",
								time: 6331
							},
							7: {
								answers: {
									14: true,
									15: false,
									16: false
								},
								id: "7",
								time: 8484
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
					4: {
						currentQuestion: 3,
						id: 4,
						isFinished: false,
						responses: {
							5: {
								answers: {
									9: true,
									10: false,
									11: false
								},
								id: "5",
								time: 14572
							},
							6: {
								answers: {
									12: true,
									13: false
								},
								id: "6",
								time: 6331
							},
							7: {
								answers: {
									14: true,
									15: false,
									16: false
								},
								id: "7",
								time: 8484
							}
						}
					}
				}
			}
		}
	// }
}

migrate.fbClassToPgObj(classObj);