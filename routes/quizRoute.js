const router = require('express').Router();
const { getQuizes, setQuiz, renderSetQuiz, renderSetQuizForm, setQuizForm, removeQuiz } = require('../controllers/quizController');
const { checkCurrentUser, authorize } = require('../middlewares/authorize');
const { studentParticipation } = require('../middlewares/quizParticipation')
const { creator } = require('../middlewares/creator');

// /add
router.route('/quizes/:groupId')
      .get(checkCurrentUser, getQuizes)
      .post(checkCurrentUser,setQuiz)

router.route('/quizes/remove/:groupId/:quizId')
      .delete(checkCurrentUser, creator, removeQuiz)

router.route('/quizes/set-quiz-form/:groupId/:quizId')
      .get(checkCurrentUser, renderSetQuizForm) 
      .post(checkCurrentUser, studentParticipation, setQuizForm); 

router.route('/quizes/set-quizes/:groupId')
      .get(checkCurrentUser, renderSetQuiz);



module.exports = router;








// router.route('/quizes/set-quiz-form/:groupId/:quizId')
//       .get(checkCurrentUser, renderSetQuizForm) // problem with student participation in admin mode
//       .post(checkCurrentUser, studentParticipation, setQuizForm); // participation(student) + protection(teacher entry denied)

