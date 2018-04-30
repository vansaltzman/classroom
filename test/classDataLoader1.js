var db = require('../db/mainDb.js').db

const migrate = require('../server/migrationWorker.js')

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
			4: {
				id: 4,
				name: "Real Quiz 2",
				quizDuration: 900,
				subject: "Magic",
				time: 1234,
				weight: 10,
				questions: {
					4: {
						text: "When is graduation?",
						draft_question_id: 4,
						id: 4,
						position: 0,
						answers: {
							9: {
								id: 9,
								isCorrect: true,
								text: "April 13"
							},
							10: {
								id: 10,
								isCorrect: false,
								text: "June 1st"
							},
							11: {
								id: 11,
								isCorrect: false,
								text: "June 2nd"
							}
						}
					},
					6: {
						text: "Pizza for lunch?",
						draft_question_id: 6,
						id: 6,
						position: 1,
						answers: {
							13: {
								id: 13,
								isCorrect: true,
								text: "no"
							},
							15: {
								id: 15,
								isCorrect: false,
								text: "yeaahhh why not"
							}
						}
					},
					12: {
						text: "Dont you want a job?",
						draft_question_id: 2,
						id: 12,
						position: 2,
						answers: {
							23: {
								id: 23,
								isCorrect: true,
								text: "ofcourse"
							},
							24: {
								id: 24,
								isCorrect: false,
								text: "nahhhhh"
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
					4: {
						currentQuestion: -1,
						id: 4,
						isFinished: false,
						responses: {
							4: {
								answers: {
									9: true,
									10: false,
									11: false
								},
								id: "4",
								time: 4479
							},
							6: {
								answers: {
									13: true,
									15: false
								},
								id: "6",
								time: 5950
							},
							12: {
								answers: {
									23: true,
									24: false
								},
								id: "12",
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
					4: {
						currentQuestion: -1,
						id: 4,
						isFinished: false,
						responses: {
							4: {
								answers: {
									9: false,
									10: true,
									11: false
								},
								id: "4",
								time: 4479
							},
							6: {
								answers: {
									13: true,
									15: false
								},
								id: "6",
								time: 5950
							},
							12: {
								answers: {
									23: true,
									24: false
								},
								id: "12",
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
					4: {
						currentQuestion: -1,
						id: 4,
						isFinished: false,
						responses: {
							4: {
								answers: {
									9: false,
									10: true,
									11: false
								},
								id: "4",
								time: 4479
							},
							6: {
								answers: {
									13: true,
									15: false
								},
								id: "6",
								time: 5950
							},
							12: {
								answers: {
									23: true,
									24: false
								},
								id: "12",
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
						currentQuestion: -1,
						id: 4,
						isFinished: false,
						responses: {
							4: {
								answers: {
									9: false,
									10: true,
									11: false
								},
								id: "4",
								time: 4479
							},
							6: {
								answers: {
									13: true,
									15: false
								},
								id: "6",
								time: 5950
							},
							12: {
								answers: {
									23: true,
									24: false
								},
								id: "12",
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
					4: {
						currentQuestion: -1,
						id: 4,
						isFinished: false,
						responses: {
							4: {
								answers: {
									9: false,
									10: true,
									11: false
								},
								id: "4",
								time: 4479
							},
							6: {
								answers: {
									13: true,
									15: false
								},
								id: "6",
								time: 5950
							},
							12: {
								answers: {
									23: false,
									24: true
								},
								id: "12",
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
					4: {
						currentQuestion: -1,
						id: 4,
						isFinished: false,
						responses: {
							4: {
								answers: {
									9: false,
									10: true,
									11: false
								},
								id: "4",
								time: 4479
							},
							6: {
								answers: {
									13: true,
									15: false
								},
								id: "6",
								time: 5950
							},
							12: {
								answers: {
									23: false,
									24: true
								},
								id: "12",
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
					4: {
						currentQuestion: -1,
						id: 4,
						isFinished: false,
						responses: {
							4: {
								answers: {
									9: false,
									10: true,
									11: false
								},
								id: "4",
								time: 4479
							},
							6: {
								answers: {
									13: true,
									15: false
								},
								id: "6",
								time: 5950
							},
							12: {
								answers: {
									23: false,
									24: true
								},
								id: "12",
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
					4: {
						currentQuestion: -1,
						id: 4,
						isFinished: false,
						responses: {
							4: {
								answers: {
									9: true,
									10: false,
									11: false
								},
								id: "4",
								time: 4479
							},
							6: {
								answers: {
									13: true,
									15: false
								},
								id: "6",
								time: 5950
							},
							12: {
								answers: {
									23: true,
									24: false
								},
								id: "12",
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
					4: {
						currentQuestion: -1,
						id: 4,
						isFinished: false,
						responses: {
							4: {
								answers: {
									9: true,
									10: false,
									11: false
								},
								id: "4",
								time: 4479
							},
							6: {
								answers: {
									13: true,
									15: false
								},
								id: "6",
								time: 5950
							},
							12: {
								answers: {
									23: true,
									24: false
								},
								id: "12",
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
					4: {
						currentQuestion: -1,
						id: 4,
						isFinished: false,
						responses: {
							4: {
								answers: {
									9: false,
									10: true,
									11: false
								},
								id: "4",
								time: 4479
							},
							6: {
								answers: {
									13: true,
									15: false
								},
								id: "6",
								time: 5950
							},
							12: {
								answers: {
									23: true,
									24: false
								},
								id: "12",
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
					4: {
						currentQuestion: -1,
						id: 4,
						isFinished: false,
						responses: {
							4: {
								answers: {
									9: false,
									10: true,
									11: false
								},
								id: "4",
								time: 4479
							},
							6: {
								answers: {
									13: true,
									15: false
								},
								id: "6",
								time: 5950
							},
							12: {
								answers: {
									23: true,
									24: false
								},
								id: "12",
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
					4: {
						currentQuestion: -1,
						id: 4,
						isFinished: false,
						responses: {
							4: {
								answers: {
									9: true,
									10: false,
									11: false
								},
								id: "4",
								time: 4479
							},
							6: {
								answers: {
									13: false,
									15: true
								},
								id: "6",
								time: 5950
							},
							12: {
								answers: {
									23: false,
									24: true
								},
								id: "12",
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
					4: {
						currentQuestion: -1,
						id: 4,
						isFinished: false,
						responses: {
							4: {
								answers: {
									9: true,
									10: false,
									11: false
								},
								id: "4",
								time: 4479
							},
							6: {
								answers: {
									13: false,
									15: true
								},
								id: "6",
								time: 5950
							},
							12: {
								answers: {
									23: false,
									24: true
								},
								id: "12",
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
					4: {
						currentQuestion: -1,
						id: 4,
						isFinished: false,
						responses: {
							4: {
								answers: {
									9: true,
									10: false,
									11: false
								},
								id: "4",
								time: 4479
							},
							6: {
								answers: {
									13: false,
									15: true
								},
								id: "6",
								time: 5950
							},
							12: {
								answers: {
									23: false,
									24: true
								},
								id: "12",
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
					4: {
						currentQuestion: -1,
						id: 4,
						isFinished: false,
						responses: {
							4: {
								answers: {
									9: true,
									10: false,
									11: false
								},
								id: "4",
								time: 4479
							},
							6: {
								answers: {
									13: true,
									15: false
								},
								id: "6",
								time: 5950
							},
							12: {
								answers: {
									23: false,
									24: true
								},
								id: "12",
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
					4: {
						currentQuestion: -1,
						id: 4,
						isFinished: false,
						responses: {
							4: {
								answers: {
									9: true,
									10: false,
									11: false
								},
								id: "4",
								time: 4479
							},
							6: {
								answers: {
									13: true,
									15: false
								},
								id: "6",
								time: 5950
							},
							12: {
								answers: {
									23: false,
									24: true
								},
								id: "12",
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
					4: {
						currentQuestion: -1,
						id: 4,
						isFinished: false,
						responses: {
							4: {
								answers: {
									9: true,
									10: false,
									11: false
								},
								id: "4",
								time: 4479
							},
							6: {
								answers: {
									13: true,
									15: false
								},
								id: "6",
								time: 5950
							},
							12: {
								answers: {
									23: false,
									24: true
								},
								id: "12",
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
					4: {
						currentQuestion: -1,
						id: 4,
						isFinished: false,
						responses: {
							4: {
								answers: {
									9: false,
									10: true,
									11: false
								},
								id: "4",
								time: 4479
							},
							6: {
								answers: {
									13: false,
									15: true
								},
								id: "6",
								time: 5950
							},
							12: {
								answers: {
									23: false,
									24: true
								},
								id: "12",
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
					4: {
						currentQuestion: -1,
						id: 4,
						isFinished: false,
						responses: {
							4: {
								answers: {
									9: true,
									10: false,
									11: false
								},
								id: "4",
								time: 4479
							},
							6: {
								answers: {
									13: true,
									15: false
								},
								id: "6",
								time: 5950
							},
							12: {
								answers: {
									23: false,
									24: true
								},
								id: "12",
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
					4: {
						currentQuestion: -1,
						id: 4,
						isFinished: false,
						responses: {
							4: {
								answers: {
									9: true,
									10: false,
									11: false
								},
								id: "4",
								time: 4479
							},
							6: {
								answers: {
									13: true,
									15: false
								},
								id: "6",
								time: 5950
							},
							12: {
								answers: {
									23: false,
									24: true
								},
								id: "12",
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
					4: {
						currentQuestion: -1,
						id: 4,
						isFinished: false,
						responses: {
							4: {
								answers: {
									9: true,
									10: false,
									11: false
								},
								id: "4",
								time: 4479
							},
							6: {
								answers: {
									13: true,
									15: false
								},
								id: "6",
								time: 5950
							},
							12: {
								answers: {
									23: false,
									24: true
								},
								id: "12",
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
					4: {
						currentQuestion: -1,
						id: 4,
						isFinished: false,
						responses: {
							4: {
								answers: {
									9: true,
									10: false,
									11: false
								},
								id: "4",
								time: 4479
							},
							6: {
								answers: {
									13: true,
									15: false
								},
								id: "6",
								time: 5950
							},
							12: {
								answers: {
									23: false,
									24: true
								},
								id: "12",
								time: 3225
							}
						}
					}
				}
			}
		}
	// }
}

migrate.fbClassToPgObj(classObj)