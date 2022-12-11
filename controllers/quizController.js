const { fetchAllQuizesIdByGroupId,
        createQuizByGroupId } 
        = require('../services/quizService');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient;

// fetchAllGroupIdByGroupId('959b2498-9dcd-4f55-b410-702bd52eeae0');
module.exports.getQuizes = async (req, res) => {
    const groupId = req.params.groupId;

    try {
        const quizes = await fetchAllQuizesIdByGroupId(groupId);
        res.send(quizes);
    } catch (error) {
        console.log(error);
        res.send(error)
    }
};

module.exports.setQuiz = async (req, res) => {
    const groupId = req.params.groupId;
    const name = req.body.name;

    try {
        const newQuiz = createQuizByGroupId(groupId, name);
        res.send(newQuiz)
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}