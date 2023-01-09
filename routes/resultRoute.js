const router = require('express').Router();
const { checkCurrentUser } = require('../middlewares/authorize')
const { setUserResults, getUserResults, getUserResultsPage } = require('../controllers/resultController');

router.route('/results')
      .get(checkCurrentUser, getUserResultsPage)

router.route('/results/:quizId')
      .post(setUserResults)
      .get(getUserResults)
 
module.exports = router;