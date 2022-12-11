const router = require('express').Router();
const { setUserResults, getUserResults } = require('../controllers/resultController')

router.route('/results/:quizId')
      .post(setUserResults)
      .get(getUserResults)
 
module.exports = router;