const router = require('express').Router();
const { getQuizes, setQuiz } = require('../controllers/quizController');
const { checkCurrentUser, authorize } = require('../middlewares/authorize')

router.route('/quizes/:groupId')
      .get(checkCurrentUser, getQuizes)
      .post(checkCurrentUser,setQuiz)
        // .delete()

module.exports = router;