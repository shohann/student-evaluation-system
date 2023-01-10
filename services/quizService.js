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

// createQuiz('959b2498-9dcd-4f55-b410-702bd52eeae0', 'Quiz-1')


