const router = require('express').Router();
const { checkCurrentUser } = require('../middlewares/authorize')
const {  getUserResultsPage, getGroupResultsPage } = require('../controllers/resultController');

router.route('/results')
      .get(checkCurrentUser, getUserResultsPage);

router.route('/results/:quizId')
      .get(checkCurrentUser, getGroupResultsPage);

 
module.exports = router;