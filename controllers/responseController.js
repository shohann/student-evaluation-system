const { createResponse, fetchResponsesByUserId } = require('../services/responseService');

module.exports.getUserResponses = async (req, res) => {
    try {
        const userId = '1ada1270-9bb2-4774-bc65-a568bf4448d2';
        const results = await fetchResponsesByUserId(userId);

        res.send(results)
    } catch (error) {
        console.log(error);
        res.send(error);
    }
};

// getQuizResults

module.exports.setUserResponses = async (req, res) => {

};