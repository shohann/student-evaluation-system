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

// Quiz details with DB
app.post('/db/quiz/add/:quizId', async (req, res) => {
    const quizId = req.params.quizId;
    const quiz = req.body.quiz;

    try {
        // const filterQuestionTexts = quiz.map(question => question.question_text); // Question Text
        const filterQuestionTexts = quiz.map(question => {
            return {
                question_text: question.question_text,
                quizId: quizId
            }
        }); // Question Text
        console.log(filterQuestionTexts);

        const createQuestions = await prisma.question.createMany({
            data: filterQuestionTexts,
        });

        const questions = await prisma.question.findMany({ where: { quizId: quizId }})

        console.log(questions);

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
        console.log(options);

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
        console.log(answers);

        const answersDB = await prisma.answer.createMany({
            data: answers,
        });

        res.send({
            questions: questions,
            quizId : quizId,
            quiz: quiz
        })
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

// Main
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
    });


    try {
        const questions = quiz.map(question => question.question_text); // Question Text
        let array = []; // options array
        let ansArray = [] // answer array

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

        console.log(questions);
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

