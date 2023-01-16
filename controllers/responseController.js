const { createResponse, fetchResponsesByUserId, fetchQuizResponseByIds } = require('../services/responseService');

// useless
module.exports.getUserResponses = async (req, res) => {
    try {
        const userId = '1ada1270-9bb2-4774-bc65-a568bf4448d2';
        const results = await fetchResponsesByUserId(userId);

        res.send(results)
    } catch (error) {
        console.log(error);
        res.send(error);
    }
};

const getResponseStatus = (responses, questions, answers) => {
    const correct = 'CORRECT';
    const wrong = 'WRONG';
    let marks = [];
    let verdicts = [];

    for (let i = 0; i < responses.length; i++) {
        let response = responses[i];
        let mark;

        if (response === 'A') mark = questions[i].options[0].mark;
        else if (response === 'B') mark = questions[i].options[1].mark;
        else if (response === 'C') mark = questions[i].options[2].mark;
        else mark = questions[i].options[3].mark;
        
        if (response === answers[i].answer_text) verdicts.push(correct);
        else verdicts.push(wrong);

        marks.push(mark);
    }

    return {
        marks: marks,
        verdicts: verdicts
    }

}


module.exports.getUserResponseDetailsPage = async (req, res) => {
    const userId = req.user.id;
    const quizId = req.params.quizId
    try {
        const responses = await fetchQuizResponseByIds(userId, quizId);
        const studentResponses = responses.student_response;
        const questions = responses.quiz.questions;
        const answers = responses.quiz.answers;
        const { marks, verdicts } = getResponseStatus(studentResponses, questions, answers);

        res.status(200).render('student-result', { questions: questions, answers: answers, responses: studentResponses ,marks: marks, verdicts: verdicts });
    } catch (error) {
        console.log(error);
        res.send(error);
    }
};


module.exports.getMemberResponseDetailsPage = async (req, res) => {
    const userId = req.params.userId;
    const quizId = req.params.quizId;
    try {
        const responses = await fetchQuizResponseByIds(userId, quizId);
        const studentResponses = responses.student_response;
        const questions = responses.quiz.questions;
        const answers = responses.quiz.answers;
        const { marks, verdicts } = getResponseStatus(studentResponses, questions, answers);

        res.status(200).render('student-result', { questions: questions, answers: answers, responses: studentResponses ,marks: marks, verdicts: verdicts });
    } catch (error) {
        console.log(error);
        res.send(error);
    }
};

