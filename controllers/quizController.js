const { fetchAllQuizesIdByGroupId,
        createQuizByGroupId } 
        = require('../services/quizService');
const { createQuestions, 
        fetchQuestionsByQuizId } 
        = require('../services/questionService');
const { createOptions } = require('../services/optionSevice');
const { createAnswers } = require('../services/answerService');

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
    const quiz = req.body.quiz;

    try {
        const newQuiz = await createQuizByGroupId(groupId, name);
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
}