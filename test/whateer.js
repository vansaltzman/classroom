const migrate = require('../server/migrationWorker.js')

const classObjTest = {
    // 1:{
          activeView: 1,
          first_name: "Valerie",
          id: 2,
          isLive: false,
          last_name: "Frizzle",
          name: "Magic Class",
          quarter: "First",
          subject_id: 2,
          teacher: "Valerie Frizzle",
          teacher_id: 4,
          thunmbnail: "https://regmedia.co.uk/2016/10/17/javascript_ph...",
          year: "2018",
          quizzes: {
              2: {
                  id: 2,
                  name: "CSS Quiz",
                  quizDuration: 900,
                  subject: "Hacking",
                  time: 1234,
                  weight: 10,
                  questions: {
                      6: {
                          text: "What is our teacher name?",
                          draft_question_id: 6,
                          id: 6,
                          position: 0,
                          answers: {
                              19: {
                                  id: 19,
                                  isCorrect: false,
                                  text: "Ara"
                              },
                              20: {
                                  id: 20,
                                  isCorrect: true,
                                  text: "Adam"
                              },
                              21: {
                                  id: 21,
                                  isCorrect: false,
                                  text: "Joejoe"
															},
															22: {
																id: 22,
																isCorrect: false,
																text: "Joejoe"
															}
                          }
                      },
                      7: {
                          text: "Is it magical?",
                          draft_question_id: 7,
                          id: 7,
                          position: 1,
                          answers: {
                              25: {
                                  id: 25,
                                  isCorrect: false,
                                  text: "no"
                              },
                              29: {
                                  id: 29,
                                  isCorrect: true,
                                  text: "yes"
															},
															39: {
																id: 39,
																isCorrect: false,
																text: "yes"
															},
															40: {
																id: 40,
																isCorrect: false,
																text: "yes"
															}
                          }
                      },
                      8: {
                          text: "Dont you want to be done with thesis?",
                          draft_question_id: 8,
                          id: 8,
                          position: 2,
                          answers: {
                              23: {
                                  id: 23,
                                  isCorrect: false,
                                  text: "yes very much"
                              },
                              24: {
                                  id: 24,
                                  isCorrect: false,
                                  text: "not really i love it"
                              },
                              41: {
                                  id: 41,
                                  isCorrect: true,
                                  text: "whatever"
                              }
                          }
											},
											9: {
												text: "Dont you want to be done with thesis?",
												draft_question_id: 9,
												id: 9,
												position: 2,
												answers: {
														30: {
																id: 30,
																isCorrect: false,
																text: "yes very much"
														},
														32: {
																id: 32,
																isCorrect: true,
																text: "not really i love it"
														},
														33: {
																id: 33,
																isCorrect: false,
																text: "whatever"
														},
														34: {
															id: 34,
															isCorrect: false,
															text: "whatever"
														}
												}
											},
											10: {
												text: "Dont you want to be done with thesis?",
												draft_question_id: 10,
												id: 10,
												position: 2,
												answers: {
														35: {
																id: 35,
																isCorrect: false,
																text: "yes very much"
														},
														36: {
																id: 36,
																isCorrect: false,
																text: "not really i love it"
														},
														37: {
																id: 37,
																isCorrect: true,
																text: "whatever"
														},
														38: {
															id: 38,
															isCorrect: false,
															text: "whatever"
														}
												}
											},
											11: {
												text: "Dont you want to be done with thesis?",
												draft_question_id: 11,
												id: 11,
												position: 2,
												answers: {
														26: {
																id: 26,
																isCorrect: false,
																text: "yes very much"
														},
														27: {
																id: 27,
																isCorrect: true,
																text: "not really i love it"
														},
														28: {
																id: 28,
																isCorrect: false,
																text: "whatever"
														},
														31: {
															id: 31,
															isCorrect: false,
															text: "whatever"
														}
												}
											}
											
                  }
              }
          },
          students: {
              5: {
                  email: "danny@schradder.edu",
                  handRaised: false,
                  id: 5,
                  isHere: true,
                  name: "Danny Schradder",
                  quizzes: {
                      2: {
                          currentQuestion: -1,
                          id: 2,
                          isFinished: false,
                          responses: {
                              6: {
                                  answers: {
                                      19: false,
                                      20: false,
																			21: false,
																			22: false
                                  },
                                  id: "6",
                                  time: 4479
                              },
                              7: {
                                  answers: {
                                      25: false,
																			29: false,
																			39: false,
																			40: false
                                  },
                                  id: "7",
                                  time: 5750
                              },
                              8: {
                                  answers: {
                                      23: false,
                                      24: false,
                                      41: false
                                  },
                                  id: "8",
                                  time: 3225
															},
															9: {
																answers: {
																		30: false,
																		32: false,
																		33: false,
																		34: false
																},
																id: "9",
																time: 3225
															},
															10: {
																answers: {
																		35: false,
																		36: false,
																		37: false,
																		38: false
																},
																id: "10",
																time: 3225
															},
															11: {
																answers: {
																		26: false,
																		27: false,
																		28: false,
																		31: false
																},
																id: "11",
																time: 3225
															}
                          }
                      }
                  }
              },
              6: {
                  email: "eric@shum.edu",
                  handRaised: false,
                  id: 6,
                  isHere: true,
                  name: "Eric Shum",
                  quizzes: {
										2: {
												currentQuestion: -1,
												id: 2,
												isFinished: false,
												responses: {
														6: {
																answers: {
																		19: false,
																		20: false,
																		21: false,
																		22: false
																},
																id: "6",
																time: 4479
														},
														7: {
																answers: {
																		25: false,
																		29: false,
																		39: false,
																		40: false
																},
																id: "7",
																time: 5750
														},
														8: {
																answers: {
																		23: false,
																		24: false,
																		41: false
																},
																id: "8",
																time: 3225
														},
														9: {
															answers: {
																	30: false,
																	32: false,
																	33: false,
																	34: false
															},
															id: "9",
															time: 3225
														},
														10: {
															answers: {
																	35: false,
																	36: false,
																	37: false,
																	38: false
															},
															id: "10",
															time: 3225
														},
														11: {
															answers: {
																	26: false,
																	27: false,
																	28: false,
																	31: false
															},
															id: "11",
															time: 3225
														}
												}
										}
									}
              },
              7: {
                  email: "jessica@wolvington.edu",
                  handRaised: false,
                  id: 7,
                  isHere: true,
                  name: "Jessica Wolvington",
                  quizzes: {
										2: {
												currentQuestion: -1,
												id: 2,
												isFinished: false,
												responses: {
														6: {
																answers: {
																		19: false,
																		20: false,
																		21: false,
																		22: false
																},
																id: "6",
																time: 4479
														},
														7: {
																answers: {
																		25: false,
																		29: false,
																		39: false,
																		40: false
																},
																id: "7",
																time: 5750
														},
														8: {
																answers: {
																		23: false,
																		24: false,
																		41: false
																},
																id: "8",
																time: 3225
														},
														9: {
															answers: {
																	30: false,
																	32: false,
																	33: false,
																	34: false
															},
															id: "9",
															time: 3225
														},
														10: {
															answers: {
																	35: false,
																	36: false,
																	37: false,
																	38: false
															},
															id: "10",
															time: 3225
														},
														11: {
															answers: {
																	26: false,
																	27: false,
																	28: false,
																	31: false
															},
															id: "11",
															time: 3225
														}
												}
										}
									}
              },
              8: {
                  email: "jerry@chen.edu",
                  handRaised: false,
                  id: 8,
                  isHere: true,
                  name: "Jerry Chen",
                  quizzes: {
										2: {
												currentQuestion: -1,
												id: 2,
												isFinished: false,
												responses: {
														6: {
																answers: {
																		19: false,
																		20: false,
																		21: false,
																		22: false
																},
																id: "6",
																time: 4479
														},
														7: {
																answers: {
																		25: false,
																		29: false,
																		39: false,
																		40: false
																},
																id: "7",
																time: 5750
														},
														8: {
																answers: {
																		23: false,
																		24: false,
																		41: false
																},
																id: "8",
																time: 3225
														},
														9: {
															answers: {
																	30: false,
																	32: false,
																	33: false,
																	34: false
															},
															id: "9",
															time: 3225
														},
														10: {
															answers: {
																	35: false,
																	36: false,
																	37: false,
																	38: false
															},
															id: "10",
															time: 3225
														},
														11: {
															answers: {
																	26: false,
																	27: false,
																	28: false,
																	31: false
															},
															id: "11",
															time: 3225
														}
												}
										}
									}
              },
              9: {
                  email: "pnn2104@columbia.edu",
                  handRaised: false,
                  id: 9,
                  isHere: true,
                  name: "Ara Nguyen",
                  quizzes: {
										2: {
												currentQuestion: -1,
												id: 2,
												isFinished: false,
												responses: {
														6: {
																answers: {
																		19: false,
																		20: false,
																		21: false,
																		22: false
																},
																id: "6",
																time: 4479
														},
														7: {
																answers: {
																		25: false,
																		29: false,
																		39: false,
																		40: false
																},
																id: "7",
																time: 5750
														},
														8: {
																answers: {
																		23: false,
																		24: false,
																		41: false
																},
																id: "8",
																time: 3225
														},
														9: {
															answers: {
																	30: false,
																	32: false,
																	33: false,
																	34: false
															},
															id: "9",
															time: 3225
														},
														10: {
															answers: {
																	35: false,
																	36: false,
																	37: false,
																	38: false
															},
															id: "10",
															time: 3225
														},
														11: {
															answers: {
																	26: false,
																	27: false,
																	28: false,
																	31: false
															},
															id: "11",
															time: 3225
														}
												}
										}
									}
              },
              10: {
                  email: "alex@chojnacki.edu",
                  handRaised: false,
                  id: 10,
                  isHere: true,
                  name: "Alex Chojnacki",
                  quizzes: {
										2: {
												currentQuestion: -1,
												id: 2,
												isFinished: false,
												responses: {
														6: {
																answers: {
																		19: false,
																		20: false,
																		21: false,
																		22: false
																},
																id: "6",
																time: 4479
														},
														7: {
																answers: {
																		25: false,
																		29: false,
																		39: false,
																		40: false
																},
																id: "7",
																time: 5750
														},
														8: {
																answers: {
																		23: false,
																		24: false,
																		41: false
																},
																id: "8",
																time: 3225
														},
														9: {
															answers: {
																	30: false,
																	32: false,
																	33: false,
																	34: false
															},
															id: "9",
															time: 3225
														},
														10: {
															answers: {
																	35: false,
																	36: false,
																	37: false,
																	38: false
															},
															id: "10",
															time: 3225
														},
														11: {
															answers: {
																	26: false,
																	27: false,
																	28: false,
																	31: false
															},
															id: "11",
															time: 3225
														}
												}
										}
									}
              },
              11: {
                  email: "adam@mateo.edu",
                  handRaised: false,
                  id: 11,
                  isHere: true,
                  name: "Adam Mateo",
                  quizzes: {
										2: {
												currentQuestion: -1,
												id: 2,
												isFinished: false,
												responses: {
														6: {
																answers: {
																		19: false,
																		20: false,
																		21: false,
																		22: false
																},
																id: "6",
																time: 4479
														},
														7: {
																answers: {
																		25: false,
																		29: false,
																		39: false,
																		40: false
																},
																id: "7",
																time: 5750
														},
														8: {
																answers: {
																		23: false,
																		24: false,
																		41: false
																},
																id: "8",
																time: 3225
														},
														9: {
															answers: {
																	30: false,
																	32: false,
																	33: false,
																	34: false
															},
															id: "9",
															time: 3225
														},
														10: {
															answers: {
																	35: false,
																	36: false,
																	37: false,
																	38: false
															},
															id: "10",
															time: 3225
														},
														11: {
															answers: {
																	26: false,
																	27: false,
																	28: false,
																	31: false
															},
															id: "11",
															time: 3225
														}
												}
										}
									}
              },
              12: {
                  email: "artem@ipatev.edu",
                  handRaised: false,
                  id: 12,
                  isHere: true,
                  name: "Artem Ipatev",
                  quizzes: {
										2: {
												currentQuestion: -1,
												id: 2,
												isFinished: false,
												responses: {
														6: {
																answers: {
																		19: false,
																		20: false,
																		21: false,
																		22: false
																},
																id: "6",
																time: 4479
														},
														7: {
																answers: {
																		25: false,
																		29: false,
																		39: false,
																		40: false
																},
																id: "7",
																time: 5750
														},
														8: {
																answers: {
																		23: false,
																		24: false,
																		41: false
																},
																id: "8",
																time: 3225
														},
														9: {
															answers: {
																	30: false,
																	32: false,
																	33: false,
																	34: false
															},
															id: "9",
															time: 3225
														},
														10: {
															answers: {
																	35: false,
																	36: false,
																	37: false,
																	38: false
															},
															id: "10",
															time: 3225
														},
														11: {
															answers: {
																	26: false,
																	27: false,
																	28: false,
																	31: false
															},
															id: "11",
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
										2: {
												currentQuestion: -1,
												id: 2,
												isFinished: false,
												responses: {
														6: {
																answers: {
																		19: false,
																		20: false,
																		21: false,
																		22: false
																},
																id: "6",
																time: 4479
														},
														7: {
																answers: {
																		25: false,
																		29: false,
																		39: false,
																		40: false
																},
																id: "7",
																time: 5750
														},
														8: {
																answers: {
																		23: false,
																		24: false,
																		41: false
																},
																id: "8",
																time: 3225
														},
														9: {
															answers: {
																	30: false,
																	32: false,
																	33: false,
																	34: false
															},
															id: "9",
															time: 3225
														},
														10: {
															answers: {
																	35: false,
																	36: false,
																	37: false,
																	38: false
															},
															id: "10",
															time: 3225
														},
														11: {
															answers: {
																	26: false,
																	27: false,
																	28: false,
																	31: false
															},
															id: "11",
															time: 3225
														}
												}
										}
									}
              },
              14: {
                  email: "eric@sin.edu",
                  handRaised: false,
                  id: 14,
                  isHere: true,
                  name: "Eric Sin",
                  quizzes: {
										2: {
												currentQuestion: -1,
												id: 2,
												isFinished: false,
												responses: {
														6: {
																answers: {
																		19: false,
																		20: false,
																		21: false,
																		22: false
																},
																id: "6",
																time: 4479
														},
														7: {
																answers: {
																		25: false,
																		29: false,
																		39: false,
																		40: false
																},
																id: "7",
																time: 5750
														},
														8: {
																answers: {
																		23: false,
																		24: false,
																		41: false
																},
																id: "8",
																time: 3225
														},
														9: {
															answers: {
																	30: false,
																	32: false,
																	33: false,
																	34: false
															},
															id: "9",
															time: 3225
														},
														10: {
															answers: {
																	35: false,
																	36: false,
																	37: false,
																	38: false
															},
															id: "10",
															time: 3225
														},
														11: {
															answers: {
																	26: false,
																	27: false,
																	28: false,
																	31: false
															},
															id: "11",
															time: 3225
														}
												}
										}
									}
              },
              15: {
                  email: "chris@rigoli.edu",
                  handRaised: false,
                  id: 15,
                  isHere: true,
                  name: "Chris Rigoli",
                  quizzes: {
										2: {
												currentQuestion: -1,
												id: 2,
												isFinished: false,
												responses: {
														6: {
																answers: {
																		19: false,
																		20: false,
																		21: false,
																		22: false
																},
																id: "6",
																time: 4479
														},
														7: {
																answers: {
																		25: false,
																		29: false,
																		39: false,
																		40: false
																},
																id: "7",
																time: 5750
														},
														8: {
																answers: {
																		23: false,
																		24: false,
																		41: false
																},
																id: "8",
																time: 3225
														},
														9: {
															answers: {
																	30: false,
																	32: false,
																	33: false,
																	34: false
															},
															id: "9",
															time: 3225
														},
														10: {
															answers: {
																	35: false,
																	36: false,
																	37: false,
																	38: false
															},
															id: "10",
															time: 3225
														},
														11: {
															answers: {
																	26: false,
																	27: false,
																	28: false,
																	31: false
															},
															id: "11",
															time: 3225
														}
												}
										}
									}
              },
              16: {
                  email: "aloralyn@ayran.edu",
                  handRaised: false,
                  id: 16,
                  isHere: true,
                  name: "Aloralyn Ayran",
                  quizzes: {
										2: {
												currentQuestion: -1,
												id: 2,
												isFinished: false,
												responses: {
														6: {
																answers: {
																		19: false,
																		20: false,
																		21: false,
																		22: false
																},
																id: "6",
																time: 4479
														},
														7: {
																answers: {
																		25: false,
																		29: false,
																		39: false,
																		40: false
																},
																id: "7",
																time: 5750
														},
														8: {
																answers: {
																		23: false,
																		24: false,
																		41: false
																},
																id: "8",
																time: 3225
														},
														9: {
															answers: {
																	30: false,
																	32: false,
																	33: false,
																	34: false
															},
															id: "9",
															time: 3225
														},
														10: {
															answers: {
																	35: false,
																	36: false,
																	37: false,
																	38: false
															},
															id: "10",
															time: 3225
														},
														11: {
															answers: {
																	26: false,
																	27: false,
																	28: false,
																	31: false
															},
															id: "11",
															time: 3225
														}
												}
										}
									}
              },
              17: {
                  email: "brent@hagen.edu",
                  handRaised: false,
                  id: 17,
                  isHere: true,
                  name: "Brent Hagen",
                  quizzes: {
										2: {
												currentQuestion: -1,
												id: 2,
												isFinished: false,
												responses: {
														6: {
																answers: {
																		19: false,
																		20: false,
																		21: false,
																		22: false
																},
																id: "6",
																time: 4479
														},
														7: {
																answers: {
																		25: false,
																		29: false,
																		39: false,
																		40: false
																},
																id: "7",
																time: 5750
														},
														8: {
																answers: {
																		23: false,
																		24: false,
																		41: false
																},
																id: "8",
																time: 3225
														},
														9: {
															answers: {
																	30: false,
																	32: false,
																	33: false,
																	34: false
															},
															id: "9",
															time: 3225
														},
														10: {
															answers: {
																	35: false,
																	36: false,
																	37: false,
																	38: false
															},
															id: "10",
															time: 3225
														},
														11: {
															answers: {
																	26: false,
																	27: false,
																	28: false,
																	31: false
															},
															id: "11",
															time: 3225
														}
												}
										}
									}
              },
              18: {
                  email: "jason@mccutchan",
                  handRaised: false,
                  id: 18,
                  isHere: true,
                  name: "Jason McCutchan",
                  quizzes: {
										2: {
												currentQuestion: -1,
												id: 2,
												isFinished: false,
												responses: {
														6: {
																answers: {
																		19: false,
																		20: false,
																		21: false,
																		22: false
																},
																id: "6",
																time: 4479
														},
														7: {
																answers: {
																		25: false,
																		29: false,
																		39: false,
																		40: false
																},
																id: "7",
																time: 5750
														},
														8: {
																answers: {
																		23: false,
																		24: false,
																		41: false
																},
																id: "8",
																time: 3225
														},
														9: {
															answers: {
																	30: false,
																	32: false,
																	33: false,
																	34: false
															},
															id: "9",
															time: 3225
														},
														10: {
															answers: {
																	35: false,
																	36: false,
																	37: false,
																	38: false
															},
															id: "10",
															time: 3225
														},
														11: {
															answers: {
																	26: false,
																	27: false,
																	28: false,
																	31: false
															},
															id: "11",
															time: 3225
														}
												}
										}
									}
              },
              19: {
                  email: "joseph@martin.edu",
                  handRaised: false,
                  id: 19,
                  isHere: true,
                  name: "Joseph Martin",
                  quizzes: {
										2: {
												currentQuestion: -1,
												id: 2,
												isFinished: false,
												responses: {
														6: {
																answers: {
																		19: false,
																		20: false,
																		21: false,
																		22: false
																},
																id: "6",
																time: 4479
														},
														7: {
																answers: {
																		25: false,
																		29: false,
																		39: false,
																		40: false
																},
																id: "7",
																time: 5750
														},
														8: {
																answers: {
																		23: false,
																		24: false,
																		41: false
																},
																id: "8",
																time: 3225
														},
														9: {
															answers: {
																	30: false,
																	32: false,
																	33: false,
																	34: false
															},
															id: "9",
															time: 3225
														},
														10: {
															answers: {
																	35: false,
																	36: false,
																	37: false,
																	38: false
															},
															id: "10",
															time: 3225
														},
														11: {
															answers: {
																	26: false,
																	27: false,
																	28: false,
																	31: false
															},
															id: "11",
															time: 3225
														}
												}
										}
									}
              },
              20: {
                  email: "manos@kourkoulakos.edu",
                  handRaised: false,
                  id: 20,
                  isHere: true,
                  name: "Manos Kourkoulakos",
                  quizzes: {
										2: {
												currentQuestion: -1,
												id: 2,
												isFinished: false,
												responses: {
														6: {
																answers: {
																		19: false,
																		20: false,
																		21: false,
																		22: false
																},
																id: "6",
																time: 4479
														},
														7: {
																answers: {
																		25: false,
																		29: false,
																		39: false,
																		40: false
																},
																id: "7",
																time: 5750
														},
														8: {
																answers: {
																		23: false,
																		24: false,
																		41: false
																},
																id: "8",
																time: 3225
														},
														9: {
															answers: {
																	30: false,
																	32: false,
																	33: false,
																	34: false
															},
															id: "9",
															time: 3225
														},
														10: {
															answers: {
																	35: false,
																	36: false,
																	37: false,
																	38: false
															},
															id: "10",
															time: 3225
														},
														11: {
															answers: {
																	26: false,
																	27: false,
																	28: false,
																	31: false
															},
															id: "11",
															time: 3225
														}
												}
										}
									}
              },
              21: {
                  email: "juan@galan.edu",
                  handRaised: false,
                  id: 21,
                  isHere: true,
                  name: "Juan Galan",
                  quizzes: {
										2: {
												currentQuestion: -1,
												id: 2,
												isFinished: false,
												responses: {
														6: {
																answers: {
																		19: false,
																		20: false,
																		21: false,
																		22: false
																},
																id: "6",
																time: 4479
														},
														7: {
																answers: {
																		25: false,
																		29: false,
																		39: false,
																		40: false
																},
																id: "7",
																time: 5750
														},
														8: {
																answers: {
																		23: false,
																		24: false,
																		41: false
																},
																id: "8",
																time: 3225
														},
														9: {
															answers: {
																	30: false,
																	32: false,
																	33: false,
																	34: false
															},
															id: "9",
															time: 3225
														},
														10: {
															answers: {
																	35: false,
																	36: false,
																	37: false,
																	38: false
															},
															id: "10",
															time: 3225
														},
														11: {
															answers: {
																	26: false,
																	27: false,
																	28: false,
																	31: false
															},
															id: "11",
															time: 3225
														}
												}
										}
									}
              },
              22: {
                  email: "jonathen@yuen.edu",
                  handRaised: false,
                  id: 22,
                  isHere: true,
                  name: "Jonathen Yuen",
                  quizzes: {
										2: {
												currentQuestion: -1,
												id: 2,
												isFinished: false,
												responses: {
														6: {
																answers: {
																		19: false,
																		20: false,
																		21: false,
																		22: false
																},
																id: "6",
																time: 4479
														},
														7: {
																answers: {
																		25: false,
																		29: false,
																		39: false,
																		40: false
																},
																id: "7",
																time: 5750
														},
														8: {
																answers: {
																		23: false,
																		24: false,
																		41: false
																},
																id: "8",
																time: 3225
														},
														9: {
															answers: {
																	30: false,
																	32: false,
																	33: false,
																	34: false
															},
															id: "9",
															time: 3225
														},
														10: {
															answers: {
																	35: false,
																	36: false,
																	37: false,
																	38: false
															},
															id: "10",
															time: 3225
														},
														11: {
															answers: {
																	26: false,
																	27: false,
																	28: false,
																	31: false
															},
															id: "11",
															time: 3225
														}
												}
										}
									}
              },
              23: {
                  email: "michael@vasio.edu",
                  handRaised: false,
                  id: 22,
                  isHere: true,
                  name: "Michael Vasio",
                  quizzes: {
										2: {
												currentQuestion: -1,
												id: 2,
												isFinished: false,
												responses: {
														6: {
																answers: {
																		19: false,
																		20: false,
																		21: false,
																		22: false
																},
																id: "6",
																time: 4479
														},
														7: {
																answers: {
																		25: false,
																		29: false,
																		39: false,
																		40: false
																},
																id: "7",
																time: 5750
														},
														8: {
																answers: {
																		23: false,
																		24: false,
																		41: false
																},
																id: "8",
																time: 3225
														},
														9: {
															answers: {
																	30: false,
																	32: false,
																	33: false,
																	34: false
															},
															id: "9",
															time: 3225
														},
														10: {
															answers: {
																	35: false,
																	36: false,
																	37: false,
																	38: false
															},
															id: "10",
															time: 3225
														},
														11: {
															answers: {
																	26: false,
																	27: false,
																	28: false,
																	31: false
															},
															id: "11",
															time: 3225
														}
												}
										}
									}
              },
              24: {
                  email: "riley@alsman.edu",
                  handRaised: false,
                  id: 24,
                  isHere: true,
                  name: "Riley Alsman",
                  quizzes: {
										2: {
												currentQuestion: -1,
												id: 2,
												isFinished: false,
												responses: {
														6: {
																answers: {
																		19: false,
																		20: false,
																		21: false,
																		22: false
																},
																id: "6",
																time: 4479
														},
														7: {
																answers: {
																		25: false,
																		29: false,
																		39: false,
																		40: false
																},
																id: "7",
																time: 5750
														},
														8: {
																answers: {
																		23: false,
																		24: false,
																		41: false
																},
																id: "8",
																time: 3225
														},
														9: {
															answers: {
																	30: false,
																	32: false,
																	33: false,
																	34: false
															},
															id: "9",
															time: 3225
														},
														10: {
															answers: {
																	35: false,
																	36: false,
																	37: false,
																	38: false
															},
															id: "10",
															time: 3225
														},
														11: {
															answers: {
																	26: false,
																	27: false,
																	28: false,
																	31: false
															},
															id: "11",
															time: 3225
														}
												}
										}
									}
              },
              25: {
                  email: "marcus@hausler.edu",
                  handRaised: false,
                  id: 25,
                  isHere: true,
                  name: "Marcus Hausler",
                  quizzes: {
										2: {
												currentQuestion: -1,
												id: 2,
												isFinished: false,
												responses: {
														6: {
																answers: {
																		19: false,
																		20: false,
																		21: false,
																		22: false
																},
																id: "6",
																time: 4479
														},
														7: {
																answers: {
																		25: false,
																		29: false,
																		39: false,
																		40: false
																},
																id: "7",
																time: 5750
														},
														8: {
																answers: {
																		23: false,
																		24: false,
																		41: false
																},
																id: "8",
																time: 3225
														},
														9: {
															answers: {
																	30: false,
																	32: false,
																	33: false,
																	34: false
															},
															id: "9",
															time: 3225
														},
														10: {
															answers: {
																	35: false,
																	36: false,
																	37: false,
																	38: false
															},
															id: "10",
															time: 3225
														},
														11: {
															answers: {
																	26: false,
																	27: false,
																	28: false,
																	31: false
															},
															id: "11",
															time: 3225
														}
												}
										}
									}
              },
              26: {
                  email: "quentin@vidal.edu",
                  handRaised: false,
                  id: 26,
                  isHere: true,
                  name: "Quentin Vidal",
                  quizzes: {
										2: {
												currentQuestion: -1,
												id: 2,
												isFinished: false,
												responses: {
														6: {
																answers: {
																		19: false,
																		20: false,
																		21: false,
																		22: false
																},
																id: "6",
																time: 4479
														},
														7: {
																answers: {
																		25: false,
																		29: false,
																		39: false,
																		40: false
																},
																id: "7",
																time: 5750
														},
														8: {
																answers: {
																		23: false,
																		24: false,
																		41: false
																},
																id: "8",
																time: 3225
														},
														9: {
															answers: {
																	30: false,
																	32: false,
																	33: false,
																	34: false
															},
															id: "9",
															time: 3225
														},
														10: {
															answers: {
																	35: false,
																	36: false,
																	37: false,
																	38: false
															},
															id: "10",
															time: 3225
														},
														11: {
															answers: {
																	26: false,
																	27: false,
																	28: false,
																	31: false
															},
															id: "11",
															time: 3225
														}
												}
										}
									}
              },
              27: {
                  email: "yuqing@dong.edu",
                  handRaised: false,
                  id: 27,
                  isHere: true,
                  name: "Yu Qing Dong",
                  quizzes: {
										2: {
												currentQuestion: -1,
												id: 2,
												isFinished: false,
												responses: {
														6: {
																answers: {
																		19: false,
																		20: false,
																		21: false,
																		22: false
																},
																id: "6",
																time: 4479
														},
														7: {
																answers: {
																		25: false,
																		29: false,
																		39: false,
																		40: false
																},
																id: "7",
																time: 5750
														},
														8: {
																answers: {
																		23: false,
																		24: false,
																		41: false
																},
																id: "8",
																time: 3225
														},
														9: {
															answers: {
																	30: false,
																	32: false,
																	33: false,
																	34: false
															},
															id: "9",
															time: 3225
														},
														10: {
															answers: {
																	35: false,
																	36: false,
																	37: false,
																	38: false
															},
															id: "10",
															time: 3225
														},
														11: {
															answers: {
																	26: false,
																	27: false,
																	28: false,
																	31: false
															},
															id: "11",
															time: 3225
														}
												}
										}
									}
              },
              28: {
                  email: "rory@reagan.edu",
                  handRaised: false,
                  id: 28,
                  isHere: true,
                  name: "Rory Reagan",
                  quizzes: {
										2: {
												currentQuestion: -1,
												id: 2,
												isFinished: false,
												responses: {
														6: {
																answers: {
																		19: false,
																		20: false,
																		21: false,
																		22: false
																},
																id: "6",
																time: 4479
														},
														7: {
																answers: {
																		25: false,
																		29: false,
																		39: false,
																		40: false
																},
																id: "7",
																time: 5750
														},
														8: {
																answers: {
																		23: false,
																		24: false,
																		41: false
																},
																id: "8",
																time: 3225
														},
														9: {
															answers: {
																	30: false,
																	32: false,
																	33: false,
																	34: false
															},
															id: "9",
															time: 3225
														},
														10: {
															answers: {
																	35: false,
																	36: false,
																	37: false,
																	38: false
															},
															id: "10",
															time: 3225
														},
														11: {
															answers: {
																	26: false,
																	27: false,
																	28: false,
																	31: false
															},
															id: "11",
															time: 3225
														}
												}
										}
									}
              },
              29: {
                  email: "xixi@chen.edu",
                  handRaised: false,
                  id: 29,
                  isHere: true,
                  name: "Xixi Chen",
                  quizzes: {
										2: {
												currentQuestion: -1,
												id: 2,
												isFinished: false,
												responses: {
														6: {
																answers: {
																		19: false,
																		20: false,
																		21: false,
																		22: false
																},
																id: "6",
																time: 4479
														},
														7: {
																answers: {
																		25: false,
																		29: false,
																		39: false,
																		40: false
																},
																id: "7",
																time: 5750
														},
														8: {
																answers: {
																		23: false,
																		24: false,
																		41: false
																},
																id: "8",
																time: 3225
														},
														9: {
															answers: {
																	30: false,
																	32: false,
																	33: false,
																	34: false
															},
															id: "9",
															time: 3225
														},
														10: {
															answers: {
																	35: false,
																	36: false,
																	37: false,
																	38: false
															},
															id: "10",
															time: 3225
														},
														11: {
															answers: {
																	26: false,
																	27: false,
																	28: false,
																	31: false
															},
															id: "11",
															time: 3225
														}
												}
										}
									}
              },
              30: {
                  email: "alex@levin.edu",
                  handRaised: false,
                  id: 30,
                  isHere: true,
                  name: "Alex Levine",
                  quizzes: {
										2: {
												currentQuestion: -1,
												id: 2,
												isFinished: false,
												responses: {
														6: {
																answers: {
																		19: false,
																		20: false,
																		21: false,
																		22: false
																},
																id: "6",
																time: 4479
														},
														7: {
																answers: {
																		25: false,
																		29: false,
																		39: false,
																		40: false
																},
																id: "7",
																time: 5750
														},
														8: {
																answers: {
																		23: false,
																		24: false,
																		41: false
																},
																id: "8",
																time: 3225
														},
														9: {
															answers: {
																	30: false,
																	32: false,
																	33: false,
																	34: false
															},
															id: "9",
															time: 3225
														},
														10: {
															answers: {
																	35: false,
																	36: false,
																	37: false,
																	38: false
															},
															id: "10",
															time: 3225
														},
														11: {
															answers: {
																	26: false,
																	27: false,
																	28: false,
																	31: false
															},
															id: "11",
															time: 3225
														}
												}
										}
									}
              }

          }
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

var newObj = randomAssignment(classObjTest);

migrate.fbClassToPgObj(newObj);