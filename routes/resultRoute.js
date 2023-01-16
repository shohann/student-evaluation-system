const router = require('express').Router();
const { checkCurrentUser } = require('../middlewares/authorize')
const {  getUserResultsPage } = require('../controllers/resultController');

router.route('/results')
      .get(checkCurrentUser, getUserResultsPage)

 
module.exports = router;