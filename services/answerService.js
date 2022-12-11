const { Answer }  = require('../utils/dbInit');

module.exports.createAnswers = async (answers) => {
    return await Answer.createMany({
        data: answers
    });
};