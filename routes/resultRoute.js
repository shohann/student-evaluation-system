const router = require('express').Router();
const { checkCurrentUser } = require('../middlewares/authorize')
const { getUserResultDetailsPage, getUserResultsPage } = require('../controllers/resultController');

router.route('/results')
      .get(checkCurrentUser, getUserResultsPage)

router.route('/results/:quizId')
      .get(checkCurrentUser, getUserResultDetailsPage) // view
 
module.exports = router;