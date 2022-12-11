const { fetchAllQuizesIdByGroupId,
        createQuizByGroupId } 
        = require('../services/quizService');
const { createQuestions, 
        fetchQuestionsByQuizId } 
        = require('../services/questionService');
const { createOptions } = require('../services/optionSevice');
const { createAnswers } = require('../services/answerService');

// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient;

// fetchAllGroupIdByGroupId('959b2498-9dcd-4f55-b410-702bd52eeae0');
module.exports.getQuizes = async (req, res) => {
    const groupId = req.params.groupId;

    try {
        const quizes = await fetchAllQuizesIdByGroupId(groupId);
        res.send(quizes);
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
    let options = [];

    // Options array
    const quizOptions = quiz.map(options => {
        const filterdOption = options.options.map(option => {
            return option // option.id = "jkdsd"
        })
        return options.options
    });
    

    for (let i = 0; i < quizOptions.length; i++) {
        for (let j = 0; j < quizOptions.length; j++) {
            quizOptions[i][j].questionId = questions[i].id
            options.push(quizOptions[i][j]);
        }
    }

    return options
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

        // const createQuestions = await prisma.question.createMany({
        //     data: filterQuestionTexts(quiz, newQuiz),
        // });
        // // const questions = await prisma.question.findMany({ where: { quizId: newQuiz.id }})


        // const optionsDB = await prisma.option.createMany({
        //     data: filterOptions(quiz, questions),
        // });

        // const answersDB = await prisma.answer.createMany({
        //     data: filterAnswers(quiz, questions, newQuiz),
        // });


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