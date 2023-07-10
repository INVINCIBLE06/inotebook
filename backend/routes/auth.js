const express = require('express');
const router = express.Router();
const authController = require('../controllers/user.controller');
const verifyBody =  require('../middlewares/reqValidator');


router.post('/signup', verifyBody.checkBodyPresentSignup, verifyBody.ValidateSignUpRequestBody, authController.signup);

router.post('/signin', authController.login);



module.exports = router;