const { createResult, fetchResultsByUserId } = require('../services/resultService');

module.exports.getUserResultsPage = async (req, res) => {
    // const userId = req.params.userId;
    try {
        res.render('results')
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

module.exports.getUserResults = async (req, res) => {
    try {
        const userId = '1ada1270-9bb2-4774-bc65-a568bf4448d2';
        const results = await fetchResultsByUserId(userId);

        res.send(results)
    } catch (error) {
        console.log(error);
        res.send(error);
    }
};



module.exports.setUserResults = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
    }
};