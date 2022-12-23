const router = require('express').Router();
const { signUp, renderSignUp, signIn, renderSignIn } = require('../controllers/userControllers');
const { checkUser } = require('../middlewares/checkUser');

router.route('/users/signup')
      .post(signUp)
      .get(renderSignUp);

router.route('/users/signin')
      .post(checkUser,signIn)
      .get(checkUser,renderSignIn);
      
 
module.exports = router;