module.exports = {
    // 1 = quiz ID
    1 : {
        responses: {
            // 2 = question ID
            1: {
                time: 2,
                answers: {
                    1: false,
                    2: true,
                    3: false,
                    4: false
                },
            2: {
                time: 2,
                answers: {
                    1: true,
                    2: false,
                    3: false,
                    4: false
                }

            }
        }
    },
    currentQuestion: 2
    }
}

// called function (response obj, studentId, quizId, classId)
// 