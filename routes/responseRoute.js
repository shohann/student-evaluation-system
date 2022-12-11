const router = require('express').Router();
const { setUserResponses, getUserResponses } = require('../controllers/responseController')

router.route('/responses/:quizId')
      .post(setUserResponses)
      .get(getUserResponses)

module.exports = router;