const router = require('express').Router();

router.route('/quizes/:groupId')
    .get()
    .post()
    .delete()

module.exports = router;