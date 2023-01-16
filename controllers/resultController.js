const { createResult, fetchResultsByUserId } = require('../services/resultService');
const { fetchSingleQuizByQuizId } = require('../services/quizService');


module.exports.getUserResultsPage = async (req, res) => {
    const userId = req.user.id;
    try {
        const studentResult = await fetchResultsByUserId(userId);
        // console.log(studentResult);
        res.render('results', { results: studentResult })
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

module.exports.getGroupResultsPage = async (req, res) => {

}






