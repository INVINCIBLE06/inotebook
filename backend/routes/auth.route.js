const express = require('express');
const router = express.Router();
const authController = require('../controllers/user.controller');
const verifyBody =  require('../middlewares/reqValidator');


router.post('/signup',
verifyBody.checkSignupBodyPresent,
verifyBody.ValidateSignUpRequestBody,
verifyBody.checkDuplicateEntryWhileSignup,
authController.signup
);

router.post('/signin', 
authController.login);



module.exports = router;