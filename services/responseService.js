const { Response } = require('../utils/dbInit');

module.exports.fetchResponsesByUserId = async (userId) => {
    // fetchAllResponsesByUserId
    return await Response.findMany({
        where: {
            userId: userId
        }
    });
};

// compund key -> userId_quizId
module.exports.fetchResponseByIds = async (userId, quizId) => {
    return await Response.findUnique({
        where: {
            userId_quizId: {
                userId: userId,
                quizId: quizId
            }
        }
    })
};


module.exports.createResponse = async (userId, quizId, response) => {
    return await Response.create({
        data: {
            userId: userId,
            quizId: quizId,
            student_response: response
        }
    });
};

// const createResponse = async (userId, quizId, response) => {
//     const userResponse = await Response.create({
//         data: {
//             userId: userId,
//             quizId: quizId,
//             student_response: response
//         }
//     });
//     console.log(userResponse);
// };

// createResponse('1ada1270-9bb2-4774-bc65-a568bf4448d2',
//                '8c5ffba0-bef6-4fbc-8733-c442a3e3c1fb', 
//                ["A", "B"]
//               )