const router = require('express').Router();
const { signUp, renderSignUp, signIn, renderSignIn } = require('../controllers/userControllers');

router.route('/users/signup')
      .post(signUp)
      .get(renderSignUp);

router.route('/users/signin')
      .post(signIn)
      .get(renderSignIn);
      
 
module.exports = router;