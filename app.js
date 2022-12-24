const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const userRoute = require('./routes/userRoute');
const groupRoute = require('./routes/groupRoute');
const quizRoute = require('./routes/quizRoute');
const responseRoute = require('./routes/responseRoute');
const resultRoute = require('./routes/resultRoute');
const defaultConfig = require('./config/default');
const port = defaultConfig.port || 3005;
 
const { checkCurrentUser } = require('./middlewares/authorize')

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('views', './views');
app.set('view engine', 'ejs');

app.use('/api', userRoute);
app.use('/api', groupRoute);
app.use('/api', quizRoute);
app.use('/api', responseRoute);
app.use('/api', resultRoute);

app.get('/', checkCurrentUser,(req, res) => res.render('home'));
app.get('/smoothies', checkCurrentUser, (req, res) => res.render('smoothies'));

app.listen(port, () => console.log(`Running Express Server at ${port}`));

