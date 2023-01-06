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

// const fetchSingleQuizByQuizId = async (quizId) => {
//     const quiz =  await Quiz.findUnique({
//         where: {
//             id : quizId
//         },
//         include: {
//             questions: {
//                 include: {
//                     options: true
//                 }
//             }
//         }
//     });
//     console.log(quiz);
// };

// fetchSingleQuizByQuizId('ebfd42a8-ad40-455a-a76a-77126763ee49')

module.exports.fetchAllQuizesIdByGroupId = async (groupId) => {
    return await Quiz.findMany({
        where: {
            groupId: groupId
        }
    });
};


module.exports.createQuizByGroupId = async (groupId, name) => {
    return await Quiz.create({
        data: {
            name: name,
            full_marks: 40,
            pass_marks: 10,
            groupId: groupId
        }
    });
};

// createQuiz('959b2498-9dcd-4f55-b410-702bd52eeae0', 'Quiz-1')


