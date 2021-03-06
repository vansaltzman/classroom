const studentQuizObjectConverter = function (quizObject) {
    var studentResponseObj = {};
    studentResponseObj.id = quizObject.id;
    studentResponseObj.isFinished = false;
    studentResponseObj.currentQuestion = -1;
    studentResponseObj.responses = {};
    for (var question in quizObject.questions) {
        let questionResponses = {};
        questionResponses.id = question;
        questionResponses.time = null;
        questionResponses.answers = {};
        for (var answer in quizObject.questions[question].answers) {
            questionResponses.answers[answer] = false
        }
        studentResponseObj.responses[question] = questionResponses
    }
    return studentResponseObj;
}

module.exports = studentQuizObjectConverter;