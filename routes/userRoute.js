const router = require('express').Router();
const { signUp, renderSignUp, signIn, renderSignIn, logout, getProfilePage } = require('../controllers/userControllers');
const { checkCurrentUser } = require('../middlewares/authorize');

router.route('/users/signup')
      .post(checkCurrentUser,signUp)
      .get(checkCurrentUser,renderSignUp);

router.route('/users/signin')
      .post(checkCurrentUser,signIn)
      .get(checkCurrentUser,renderSignIn);

router.route('/users/profile')
      .get(checkCurrentUser, getProfilePage)

router.route('/logout')
      .get(checkCurrentUser,logout);
      
module.exports = router;