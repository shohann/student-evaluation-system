const { fetchResponseByIds } = require('../services/responseService');

module.exports.studentParticipation = async (req, res, next) => {
    const userId = req.user.id;
    const quizId = req.params.quizId;
    const method = req.method;

    try {
        const participation = await fetchResponseByIds(userId, quizId);

        if (method === 'GET') {
            if (!participation) {
                console.log(participation);
                req.participation = false;
                next();
            }
            req.participation = true;
            next();
        } else {
            if (participation) {
                return res.status(301).json({ massage: "Forbidden"})
            } 
            next()
        }
    } catch (error) {
        console.log(error);
        res.send(error)
    }
}