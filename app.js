const express = require('express');
const app = express();
const userRoute = require('./routes/userRoute');
const groupRoute = require('./routes/groupRoute');
const quizRoute = require('./routes/quizRoute');
const responseRoute = require('./routes/responseRoute');
const resultRoute = require('./routes/resultRoute');
const defaultConfig = require('./config/default');
const port = defaultConfig.port || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', './views');
app.set('view engine', 'ejs');

app.use('/api', userRoute);
app.use('/api', groupRoute);
app.use('/api', quizRoute);
app.use('/api', responseRoute);
app.use('/api', resultRoute);

app.listen(port, () => console.log(`Running Express Server at ${port}`));

