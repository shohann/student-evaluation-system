const { fetchAllQuizesIdByGroupId,
        fetchSingleQuizByQuizId,
        createQuizByGroupId,
        deleteQuizById } 
        = require('../services/quizService');
const { createQuestions, 
        fetchQuestionsByQuizId } 
        = require('../services/questionService');
const { fetchAllQuestionsByQuizId } = require('../services/questionService');
const { createOptions } = require('../services/optionSevice');
const { createAnswers } = require('../services/answerService');
const { createResponse } = require('../services/responseService');
const { createResult } = require('../services/resultService');
const { fetchCreatorMembershipStatus } = require('../services/groupMembershipService');

module.exports.renderSetQuizForm = async (req, res) => {
    const quizId = req.params.quizId;
    const participation =  req.participation;

    try {
        const { creator } = await fetchCreatorMembershipStatus(req.user.id);
        const quiz = await fetchSingleQuizByQuizId(quizId);
        const questions = quiz.questions;
        res.render('quiz-form', { questions: questions, quizId : quizId, creator: creator, participation: participation});
    } catch(error) {
        res.send(error);
        console.log(error);
    }
};

const calculateMarks = (questions, userResponse) => {
    let marks = 0;
    
    for (let i = 0; i < userResponse.length; i++) {
        if (userResponse[i] === 'A') {
            marks = marks + questions[i].options[0].mark;

        } else if (userResponse[i] === 'B') {
            marks = marks + questions[i].options[1].mark;

        } else if (userResponse[i] === 'C') {
            marks = marks + questions[i].options[2].mark;
        } else {
            marks = marks + questions[i].options[3].mark;
        }
    }

    return marks;
};

module.exports.setQuizForm = async (req, res) => {
    const userResponse = req.body.response;
    const quizId = req.params.quizId;
    const userId = req.user.id;

    try {
        const questions = await fetchAllQuestionsByQuizId(quizId)
        const marks = calculateMarks(questions, userResponse);
        const response = await createResponse(userId, quizId, userResponse);
        const result = await createResult(userId, quizId, response.userId_quizId, marks);
        res.send(result);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
};


module.exports.getQuizes = async (req, res) => {
    const groupId = req.params.groupId;

    try {
        const quizes = await fetchAllQuizesIdByGroupId(groupId);
        res.render('group-details', { quizes: quizes, groupId: groupId });
        // res.send(quizes);
    } catch (error) {
        console.log(error);
        res.send(error)
    }
};



const filterQuestionTexts = (quiz, newQuiz) => {
    return quiz.map(question => {
        return {
            question_text: question.question_text,
            quizId: newQuiz.id
        }
    }); // Question Text
};

const filterOptions = (quiz, questions) => {
    let finalOptions = [];

    for (let i = 0; i < quiz.length; i++) {
        let questionId = questions[i].id;
        for (let j = 0; j < quiz[i].options.length; j++) {
            quiz[i].options[j].questionId = questionId;
            finalOptions.push(quiz[i].options[j])
        }
    }

    return finalOptions;
}

const filterAnswers = (quiz, questions, newQuiz) => {
    let answers = [];

    const quizAnswers = quiz.map(answer => {
        return answer.answer
    });

    for (let i = 0; i < quizAnswers.length; i++) {
        answers.push(
            { quizId: newQuiz.id, questionId: questions[i].id, answer_text: quizAnswers[i]}
        )
    }

    return answers

}

module.exports.renderSetQuiz = async (req, res) => {
    try {
        // render set quiz
        // ****
        // res.render('quiz');
        res.render('create-quiz');
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

module.exports.setQuiz = async (req, res) => {
    const groupId = req.params.groupId;
    const name = req.body.name;
    const category = req.body.category;
    const quiz = req.body.quiz;

    try {
        const newQuiz = await createQuizByGroupId(groupId, name, category);
        const questions = filterQuestionTexts(quiz, newQuiz);
        const createdQuestions = await createQuestions(questions); // no var
        const fetchedQuestions = await fetchQuestionsByQuizId(newQuiz.id);
        const options = filterOptions(quiz, fetchedQuestions);
        const newOptions = await createOptions(options);
        const answers = filterAnswers(quiz, fetchedQuestions, newQuiz);
        const newAnswers = await createAnswers(answers);

        res.send({
            newQuiz,
            createdQuestions,
            newOptions,
            newAnswers
        });
    } catch (error) {
        console.log(error);
        res.send(error);
    }
};

module.exports.removeQuiz = async (req, res) => {
    const quizId = req.params.quizId;
    try {
        const deletedQuiz = await deleteQuizById(quizId);
        res.send(deletedQuiz);
    } catch (error) {
        console.log(error);
        res.send(error)
    }
};