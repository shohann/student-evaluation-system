const express = require('express');
const { PrismaClient } = require('@prisma/client');
const path = require('path'); 

const app = express();
const prisma = new PrismaClient;
const user = {
 name: "Shohanur Rahman",
 id: 822
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', './views');
app.set('view engine', 'ejs');

// app.get('/', (req, res) => { 
//     res.render('index', user);
// });

//login page route
app.get('/', (req,res) => {
    res.render(path.join(__dirname, 'views/login.ejs'), {url: '/login'});
})
  
// login handler route
app.post('/login', (req,res)=>{
    const {email, password} = req.body;
      
    findUser(email, password) ?
        // if user is registered
        // generate a dynamic url
        // redirect to user
        res.redirect(301, `/dashboard/${email}`) :
        res.status(401).end();
  
});
  
// dashboard route
app.get('/dashboard/:email', (req, res)=>{
    const {email} = req.params;
    res.render(path.join(__dirname, 'views/dashboard.ejs'), {email: email})
});
  
// damy user db
const users = [
    {
        name: "Raktim Banerjee",
        email: "raktim@email.com",
        password: "Raktim"
    },
    {
        name: "Arpita Banerjee",
        email: "arpita@email.com",
        password :"Arpita"
    }
];
  
// find user 
const findUser = (email, password)=> users.some(user => 
      user.email === email && user.password === password 
)

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

