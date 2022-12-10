const router = require('express').Router();
const { signUp, renderSignUp, signIn, renderSignIn } = require('../controllers/userControllers')

router.route('/signup')
      .post(signUp)
      .get(renderSignUp);

router.route('/signin')
      .post(signIn)
      .get(renderSignIn);
      
 
module.exports = router;