const { Result } = require('../utils/dbInit');

module.exports.fetchResultsByUserId = async (userId) => {
    return await Result.findMany({
        where: {
            userId: userId
        }
    });
};

module.exports.createResult = async (userId, quizId, responseId, marks) => {
    return await Result.create({
        data: {
            userId: userId,
            quizId: quizId,
            responseId: responseId,
            marks: marks
        }
    });
}

// const createResult = async (userId, quizId, responseId, marks) => {
//     const userResult = await Result.create({
//         data: {
//             userId: userId,
//             quizId: quizId,
//             responseId: responseId,
//             marks: marks
//         }
//     });

//     console.log(userResult);
// };

// createResult('1ada1270-9bb2-4774-bc65-a568bf4448d2', '8c5ffba0-bef6-4fbc-8733-c442a3e3c1fb', '1bb51a99-cde7-4845-af8f-e1216989ed53', 50);


  