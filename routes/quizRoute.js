const router = require('express').Router();
const { getQuizes, setQuiz, renderSetQuiz } = require('../controllers/quizController');
const { checkCurrentUser, authorize } = require('../middlewares/authorize')

router.route('/quizes/:groupId')
      .get(checkCurrentUser, getQuizes)
      .post(checkCurrentUser,setQuiz)
        // .delete()

router.route('/quizes/set-quizes/:groupId')
      .get(checkCurrentUser, renderSetQuiz);

module.exports = router;

