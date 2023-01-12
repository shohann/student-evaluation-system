const { fetchQuizById } = require('../services/groupService');

module.exports.validQuiz = async (req, res, next) => {
    quizId = req.params.quizId;

    try {
        const quiz = await fetchQuizById(quizId);
        next();
    } catch (error) {
        console.log(error);
        res.send(error)
    }
};