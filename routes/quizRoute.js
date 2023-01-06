const router = require('express').Router();
const { getQuizes, setQuiz, renderSetQuiz, renderSetQuizForm, setQuizForm } = require('../controllers/quizController');
const { checkCurrentUser, authorize } = require('../middlewares/authorize')

router.route('/quizes/:groupId')
      .get(checkCurrentUser, getQuizes)
      .post(checkCurrentUser,setQuiz)
        // .delete()

router.route('/quizes/set-quizes/:groupId')
      .get(checkCurrentUser, renderSetQuiz);

router.route('/quizes/set-quiz-form/:quizId')
      .get(checkCurrentUser, renderSetQuizForm)
      .post(checkCurrentUser, setQuizForm);

module.exports = router;

