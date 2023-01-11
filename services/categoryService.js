const { Category } = require('../utils/dbInit');


module.exports.createCategoryByQuizId = async (quizId, categoryName) => {
    return await Category.create({
        data: {
            name: categoryName,
            quizId: quizId
        }
    });
}


