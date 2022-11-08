const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {    
    res.send('Hello');
});

app.post('/quiz', async (req, res) => { 

    const { name } = req.body;
        
    try {
        const quiz = await prisma.quiz.create({
            data: {
                name: name
            },
        })

        const question = await prisma.question.create({
            data: {
                quizId: quiz.id,
                question_text: req.body.question_text
            },
        })


        res.send({ quiz, question })
    } catch(error) {
        console.log(error)
        res.send(error);
    }
});

app.listen(3001, () => {    
    console.log(`Running Express Server at 3001`);
})

