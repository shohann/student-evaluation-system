const { createResult, fetchResultsByUserId } = require('../services/resultService');
const { fetchSingleQuizByQuizId } = require('../services/quizService')

module.exports.getUserResultsPage = async (req, res) => {
    const userId = req.user.id;
    try {
        const studentResult = await fetchResultsByUserId(userId);
        res.render('results', { results: studentResult })
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

module.exports.getGroupResultsPage = async (req, res) => {

}

module.exports.getUserResultDetailsPage = async (req, res) => {
    const userId = req.user.id;
    const quizId = req.params.quizId
    try {
        const quiz = await fetchSingleQuizByQuizId(quizId)
        console.log(quiz);
        
        res.status(200).render('student-result', { quizId: quizId })
    } catch (error) {
        console.log(error);
        res.send(error);
    }
};



