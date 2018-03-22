

const studentQuizObjectConverter = function (quizObject) {
    var studentResponseObj = {};
    studentResponseObj[quizObject.id] = {};
    studentResponseObj[quizObject.id].id = quizObject.id;
    studentResponseObj[quizObject.id].isFinished = false;
    studentResponseObj[quizObject.id].currentQuestion = null
    studentResponseObj[quizObject.id].responses = {};
    for (var question in quizObject.questions) {
        let questionResponses = {};
        questionResponses.id = question;
        questionResponses.time = null;
        questionResponses.answers = {};
        for (var answer in quizObject.questions[question].answers) {
            questionResponses.answers[answer] = false
        }
        studentResponseObj[quizObject.id].responses[question] = questionResponses
    }
    return studentResponseObj;
}

module.exports = studentQuizObjectConverter;