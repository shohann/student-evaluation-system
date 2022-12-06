const router = require('express').Router();
const { signUpPost, signUpGet, signInPost, signInGet } = require('../controllers/userControllers')

router.route('/signup')
      .post(signUpPost)
      .get(signUpGet);

router.route('/signin')
      .post(signInPost)
      .get(signInGet);
      
 
module.exports = router;