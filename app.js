const express = require('express');
const { PrismaClient } = require('@prisma/client');
const app = express();
const prisma = new PrismaClient;

const userRoute = require('./routes/userRoute');
const groupRoute = require('./routes/groupRoute');
const quizRoute = require('./routes/quizRoute');
const responseRoute = require('./routes/responseRoute');
const resultRoute = require('./routes/resultRoute');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', './views');
app.set('view engine', 'ejs');

app.use('/api', userRoute);
app.use('/api', groupRoute);
app.use('/api', quizRoute);
app.use('/api', responseRoute);
app.use('/api', resultRoute);





// Quiz details with DB
app.post('/db/quiz/add/:quizId', async (req, res) => {
    const quizId = req.params.quizId;
    const quiz = req.body.quiz;

    try {
        const filterQuestionTexts = quiz.map(question => {
            return {
                question_text: question.question_text,
                quizId: quizId
            }
        }); // Question Text

        const createQuestions = await prisma.question.createMany({
            data: filterQuestionTexts,
        });

        const questions = await prisma.question.findMany({ where: { quizId: quizId }})


        let options = []; // options array
        let answers = [] // answer array

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

        const optionsDB = await prisma.option.createMany({
            data: options,
        });

        // Answers array
        const quizAnswers = quiz.map(answer => {
            return answer.answer
        });

        for (let i = 0; i < quizAnswers.length; i++) {
            answers.push(
                { quizId: quizId, questionId: questions[i].id, answer_text: quizAnswers[i]}
            )
        }

        const answersDB = await prisma.answer.createMany({
            data: answers,
        });

        res.send('Quiz Created')
    } catch(error) {
        res.send(error);
    };
});

// Response
app.post('/response/:quizId', async (req, res) => {
    const quizId = req.params.quizId;
    const response = req.body.response;

    try {
        const answers = await prisma.answer.findMany({
            where: {
              quizId: quizId,
            },
        });
        const answerArray = answers.map(answer => answer.answer_text);
        console.log(answerArray)
        const fullMarks = 10;
        const marksPerQuestion = 5;
        let actualMarks = 0;

        for (let i = 0; i < response.length; i++) {
            if (response[i] === answerArray[i]) {
                actualMarks = actualMarks + marksPerQuestion;
            }
        }

        res.send({
            response,
            answerArray,
            actualMarks
        });
    } catch(error) {
        console.log(error);
        res.send(error);
    }

});

// Main
app.post('/create', async (req, res, next) => {
    const { name } = req.body;

    try {
        const quiz = await prisma.quiz.create({
            data: {
                name: name
            },
        });
        res.status(200).send(quiz);
    } catch(error) {
        res.send(error);
    }

    res.status(200).send('works');
})

app.listen(3001, () => {    
    console.log(`Running Express Server at 3001`);
})

