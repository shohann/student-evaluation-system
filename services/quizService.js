const { Quiz } = require('../utils/dbInit');


module.exports.fetchQuizById = async (quizId) => {
    return await Quiz.findUnique({
        where: {
            id: quizId
        }
    })
}

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

module.exports.createQuizByGroupId = async (groupId, name, category, totalMarks) => {
    return await Quiz.create({
        data: {
            name: name,
            category_name: category,
            full_marks: totalMarks,
            pass_marks: Math.ceil(totalMarks/3),
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



