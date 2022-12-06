const router = require('express').Router();
const { signUp } = require('../controllers/userControllers')

router.route('/signup')
      .post(signUp);

// router.route('/signin')
//     .post(signIn);
 
module.exports = router;