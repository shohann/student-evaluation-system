const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient;

const questionsWithId = [
    { id: "76f43cff-1b0a-4908-9105-68af808f49f1", question_text: "What animal is this" },
    { id: "830561c3-983d-4316-b84e-d3fa3da4c36b", question_text: "What is this" }
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {    
    res.send('Hello');
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

app.get('/answers/:quizId', async (req, res) => {
    const quizId = req.params.quizId;

    try {
        const answers = await prisma.answer.findMany({
            where: {
              quizId: quizId,
            },
          })
        res.send(answers)
    } catch(error) {
        console.log(error);
        res.send(error);
    }
});

app.post('/quiz/add/:quizId', async (req, res) => {
    const quizId = req.params.quizId;
    const quiz = req.body.quiz;
    const quizOptions = quiz.map(options => {
        const filterdOption = options.options.map(option => {
            return option // option.id = "jkdsd"
        })
        return options.options
    });
    const quizAnswers = quiz.map(answer => {
        return answer.answer
    })

    try {
        // const questions = quiz.map(question => question.question_text);
        // console.log(quizOptions);

        console.log('\n');

        let array = [];
        let ansArray = []

        for (let i = 0; i < quizOptions.length; i++) {
            for (let j = 0; j < quizOptions.length; j++) {
                quizOptions[i][j].id = questionsWithId[i].id
                array.push(quizOptions[i][j]);
            }
        }

        for (let i = 0; i < quizAnswers.length; i++) {
            ansArray.push(
                { quizId: quizId, questionId: questionsWithId[i].id, ans: quizAnswers[i]}
            )
        }

        console.log(array);
        console.log(ansArray);

        // console.log(questionsWithId);

        res.send({
            array
        })
    } catch(error) {
    console.log(error);
    res.send(error);
    }
});

app.post('/quiz', async (req, res) => { 

    const { name } = req.body;
        
    try {
        const quiz = await prisma.quiz.create({
            data: {
                name: name
            },
        });

        const question = await prisma.question.create({
            data: {
                quizId: quiz.id,
                question_text: req.body.question_text
            },
        });

        const filteredOptionsArray = req.body.options.map((option) => {
            return {
                questionId: question.id,
                option: option.option,
                txt: option.txt
            }
        });

        const options = await prisma.option.createMany({
            data: filteredOptionsArray,
            skipDuplicates: true, 
        });

        const answer = await prisma.answer.create({
            data: {
                questionId: question.id,
                answer_text: req.body.answer,
                quizId: quiz.id
            },
        });

        res.send({ quiz, question, options, answer })
    } catch(error) {
        console.log(error)
        res.send(error);
    };
});

app.listen(3001, () => {    
    console.log(`Running Express Server at 3001`);
})

