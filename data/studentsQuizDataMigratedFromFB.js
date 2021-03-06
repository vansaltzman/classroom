const migrated = {  
    "classes":[  
       null,
       {  
          "activeView":false,
          "id":1,
          "isLive":true,
          "name":"Magic Class",
          "quarter":"Second",
          "quizzes":{  
             "2":{  
                "id":2, //quiz id
                "name":"Bus Quiz",
                "questions":[  
                   null,
                   {  
                      "answers":{  
                         "7":{ //answer id in postgres draft_answer 
                            "id":7, //answer id in postgres draft_answer
                            "isCorrect":false,
                            "text":"Clothes Dryer"
                         },
                         "8":{  
                            "id":8,
                            "isCorrect":true,
                            "text":"Magic"
                         },
                         "9":{  
                            "id":9,
                            "isCorrect":false,
                            "text":"Science"
                         }
                      },
                      "draft_question_id":3, //question_id
                      "id":1,
                      "position":2,
                      "text":"What is the best way to shrink a bus?"
                   },
                   {  
                      "answers":[  
                         null,
                         {  
                            "id":1,
                            "isCorrect":false,
                            "text":"Bike"
                         },
                         {  
                            "id":2,
                            "isCorrect":false,
                            "text":"Plane"
                         },
                         {  
                            "id":3,
                            "isCorrect":true,
                            "text":"Magic"
                         }
                      ],
                      "draft_question_id":1,
                      "id":2,
                      "position":0,
                      "text":"How do we get to school?"
                   },
                   {  
                      "answers":{  
                         "4":{  
                            "id":4,
                            "isCorrect":false,
                            "text":"Hammer"
                         },
                         "5":{  
                            "id":5,
                            "isCorrect":true,
                            "text":"Magic"
                         },
                         "6":{  
                            "id":6,
                            "isCorrect":false,
                            "text":"Screwdriver"
                         }
                      },
                      "draft_question_id":2,
                      "id":3,
                      "position":1,
                      "text":"How do you replace a transmission?"
                   }
                ],
                "quizDuration":900,
                "subject":"Magic",
                "time":1522358156,
                "weight":10
             }
          },
          "students":[  
             null,
             {  
                "email":"cramo@magic.bus",
                "handRaised":false,
                "id":1,
                "isHere":false,
                "name":"Carlos Ramon",
                "quizzes":{  
                   "2":{  
                      "currentQuestion":-1,
                      "id":2,
                      "isFinished":false,
                      "responses":[  
                         null,
                         {  
                            "answers":{  
                               "7":false,
                               "8":false,
                               "9":false
                            },
                            "id":"1"
                         },
                         {  
                            "answers":[  
                               null,
                               false,
                               false,
                               false
                            ],
                            "id":"2"
                         },
                         {  
                            "answers":{  
                               "4":false,
                               "5":false,
                               "6":false
                            },
                            "id":"3"
                         }
                      ]
                   }
                }
             },
             {  
                "email":"aperl@magic.bus",
                "handRaised":false,
                "id":2,
                "isHere":false,
                "name":"Arnold Perlstein",
                "quizzes":{  
                   "2":{  
                      "currentQuestion":-1,
                      "id":2,
                      "isFinished":false,
                      "responses":[  
                         null,
                         {  
                            "answers":{  
                               "7":false,
                               "8":false,
                               "9":false
                            },
                            "id":"1"
                         },
                         {  
                            "answers":[  
                               null,
                               false,
                               false,
                               false
                            ],
                            "id":"2"
                         },
                         {  
                            "answers":{  
                               "4":false,
                               "5":false,
                               "6":false
                            },
                            "id":"3"
                         }
                      ]
                   }
                }
             },
             {  
                "email":"kfrank@magic.bus",
                "handRaised":false,
                "id":3,
                "isHere":false,
                "name":"Keesha, Franklin",
                "quizzes":{  
                   "2":{  
                      "currentQuestion":-1,
                      "id":2,
                      "isFinished":false,
                      "responses":[  
                         null,
                         {  
                            "answers":{  
                               "7":false,
                               "8":false,
                               "9":false
                            },
                            "id":"1"
                         },
                         {  
                            "answers":[  
                               null,
                               false,
                               false,
                               false
                            ],
                            "id":"2"
                         },
                         {  
                            "answers":{  
                               "4":false,
                               "5":false,
                               "6":false
                            },
                            "id":"3"
                         }
                      ]
                   }
                }
             },
             {  
                "email":"drour@magic.bus",
                "handRaised":false,
                "id":4,
                "isHere":false,
                "name":"Dorothy Rourke",
                "quizzes":{  
                   "2":{  
                      "currentQuestion":-1,
                      "id":2,
                      "isFinished":false,
                      "responses":[  
                         null,
                         {  
                            "answers":{  
                               "7":false,
                               "8":false,
                               "9":false
                            },
                            "id":"1"
                         },
                         {  
                            "answers":[  
                               null,
                               false,
                               false,
                               false
                            ],
                            "id":"2"
                         },
                         {  
                            "answers":{  
                               "4":false,
                               "5":false,
                               "6":false
                            },
                            "id":"3"
                         }
                      ]
                   }
                }
             }
          ],
          "subject_id":1,
          "teacher_id":1,
          "thunmbnail":"https://pbs.twimg.com/media/Bp94a-sCYAAkzD2.jpg",
          "year":"2018"
       }
    ]
 }
 
const calculateAverageTimeForQuestions = function(classFromFB) {
  //console.log()
  const takenQuiz = Object.values(classFromFB.classes[1].quizzes)[0];
  console.log('takenQuiz', takenQuiz.id);
  const takenQuizQuestions = takenQuiz.questions;
  //console.log('questions', questions.slice(1))
  const studentsAndTheirResponses = classFromFB.classes[1].students.slice(1);
  //console.log(studentsAndTheirResponses);
  // for (var i = 0; i < studentsAndTheirResponses.length; i++) {
  //   const eachStudentQuiz = Object.values(studentsAndTheirResponses[i].quizzes)[0];
  //   console.log('student name: ', studentsAndTheirResponses[i].name, 'student quiz', eachStudentQuiz);
  //   //const questionsFromEachQuiz = eachStudentQuiz.questions.slice(1) //array of question objs...each question has
  // }
}

calculateAverageTimeForQuestions(migrated)
