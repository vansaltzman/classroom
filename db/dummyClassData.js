const a = 
{ id: 25,
name: 'Magic Class',
  subject: 'Magic',
isLive: true,
  teacher: { 
     id: 58, 
     name: 'Valerie Frizzle', 
     email: 'mfrizz@magic.bus' 
   },
  activeView: 12,
  quizzes: {
 '12': {
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
},
students: { 
'37': 
{ name: 'Carlos Ramon',
  isInClassroom: false,
  email: 'cramo@magic.bus',
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
'38': 
{ name: 'Keesha, Franklin',
  isInClassroom: false,
  email: 'kfrank@magic.bus',
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
'39': 
{ name: 'Dorothy Rourke',
  isInClassroom: false,
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
  isInClassroom: false,
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
        currentQuestion: 2,
      } 
    }
  } 
 }
}

const b = { id: 25,
name: 'Magic Class',
  subject: 'Magic',
isLive: true,
  teacher: { 
     id: 58, 
     name: 'Valerie Frizzle', 
     email: 'mfrizz@magic.bus' 
   },
  activeView: 12,
  quizzes: {
 '12': {
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
},
students: { 
'37': 
{ name: 'Carlos Ramon',
  isInClassroom: false,
  email: 'cramo@magic.bus',
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
  },
'38': 
{ name: 'Keesha, Franklin',
  isInClassroom: false,
  email: 'kfrank@magic.bus',
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
 },
'39': 
{ name: 'Dorothy Rourke',
  isInClassroom: false,
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
  isInClassroom: false,
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
        currentQuestion: 2,
      } 
    }
  } 
 }
}

module.exports = {
  a,
  b
}