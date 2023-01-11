const { Quiz } = require('../utils/dbInit');

module.exports.fetchSingleQuizByQuizId = async (quizId) => {
    return await Quiz.findUnique({
        where: {
            id : quizId
        },
        include: {
            questions: {
                include: {
                    options: true
                }
            }
        }
    });
};

module.exports.fetchAllQuizesIdByGroupId = async (groupId) => {
    return await Quiz.findMany({
        where: {
            groupId: groupId
        }
    });
};

module.exports.createQuizByGroupId = async (groupId, name, category) => {
    return await Quiz.create({
        data: {
            name: name,
            category_name: category,
            full_marks: 40,
            pass_marks: 10,
            groupId: groupId
        }
    });
};

module.exports.deleteQuizById = async (quizId) => {
    return await Quiz.delete({
        where: {
            id: quizId
        }
    })
};



