const router = require('express').Router();
const { checkCurrentUser } = require('../middlewares/authorize');
const {   getUserResponseDetailsPage, getMemberResponseDetailsPage } = require('../controllers/responseController')

router.route('/responses/:quizId')
      .get(checkCurrentUser ,getUserResponseDetailsPage)

router.route('/responses/:userId/:quizId')
      .get(checkCurrentUser , getMemberResponseDetailsPage)


module.exports = router;