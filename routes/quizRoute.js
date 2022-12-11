const router = require('express').Router();
const { getQuizes, setQuiz } = require('../controllers/quizController')

router.route('/quizes/:groupId')
      .get(getQuizes)
      .post(setQuiz)
        // .delete()

module.exports = router;