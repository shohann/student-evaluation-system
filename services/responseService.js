const { Response } = require('../utils/dbInit');

module.exports.fetchResponsesByUserId = async (userId) => {
    return await Response.findMany({
        where: {
            userId: userId
        }
    });
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