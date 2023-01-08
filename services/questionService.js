const { Question } = require('../utils/dbInit')

module.exports.createQuestions = async (questions) => {
    return await Question.createMany({
        data: questions
    });
};

module.exports.fetchQuestionsByQuizId = async (quizId) => {
    return Question.findMany({
        where: {
            quizId: quizId
        }
    });
};

module.exports.fetchAllQuestionsByQuizId = async (quizId) => {
    return await Question.findMany({
        where: {
            quizId: quizId,
        },
        include: {
            options: true
        }
    })
}




// app.post('/db/quiz/add/:quizId', async (req, res) => {
//     const quizId = req.params.quizId;
//     const quiz = req.body.quiz;

//     try {
//         const filterQuestionTexts = quiz.map(question => {
//             return {
//                 question_text: question.question_text,
//                 quizId: quizId
//             }
//         }); // Question Text

//         const createQuestions = await prisma.question.createMany({
//             data: filterQuestionTexts,
//         });

//         const questions = await prisma.question.findMany({ where: { quizId: quizId }})


//         let options = []; // options array
//         let answers = [] // answer array

//         // Options array
//         const quizOptions = quiz.map(options => {
//             const filterdOption = options.options.map(option => {
//                 return option // option.id = "jkdsd"
//             })
//             return options.options
//         });
        

//         for (let i = 0; i < quizOptions.length; i++) {
//             for (let j = 0; j < quizOptions.length; j++) {
//                 quizOptions[i][j].questionId = questions[i].id
//                 options.push(quizOptions[i][j]);
//             }
//         }

//         const optionsDB = await prisma.option.createMany({
//             data: options,
//         });

//         // Answers array
//         const quizAnswers = quiz.map(answer => {
//             return answer.answer
//         });

//         for (let i = 0; i < quizAnswers.length; i++) {
//             answers.push(
//                 { quizId: quizId, questionId: questions[i].id, answer_text: quizAnswers[i]}
//             )
//         }

//         const answersDB = await prisma.answer.createMany({
//             data: answers,
//         });

//         res.send('Quiz Created')
//     } catch(error) {
//         res.send(error);
//     };
// });
