const router = require('express').Router();
const { checkCurrentUser } = require('../middlewares/authorize');
const {   getUserResponseDetailsPage } = require('../controllers/responseController')

router.route('/responses/:quizId')
      .get(checkCurrentUser ,getUserResponseDetailsPage)


module.exports = router;