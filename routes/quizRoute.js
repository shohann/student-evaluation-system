const router = require('express').Router();
const { getQuizes, setQuiz } = require('../controllers/quizController');
const { checkCurrentUser } = require('../middlewares/authorize')

router.route('/quizes/:groupId')
      .get(checkCurrentUser, getQuizes)
      .post(setQuiz)
        // .delete()

module.exports = router;