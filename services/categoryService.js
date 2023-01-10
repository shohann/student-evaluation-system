const { Category } = require('../utils/dbInit');


module.exports.createCategoryByQuizId = async (quizId, categoryName) => {
    return await Category.create({
        data: {
            name: categoryName,
            quizId: quizId
        }
    });
}

// const createCategoryByQuizId = async (quizId, categoryName) => {
//     const category = await Category.create({
//         data: {
//             name: categoryName,
//             quizId: quizId
//         }
//     });

//     console.log(category);
// }

