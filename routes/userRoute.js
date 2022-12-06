const router = require('express').Router();
const { signUpPost, signUpGet } = require('../controllers/userControllers')

router.route('/signup')
      .post(signUpPost);

router.route('/signup')
      .get(signUpGet);
 
module.exports = router;