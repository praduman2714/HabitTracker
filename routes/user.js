const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/user_controller');

router.get('/signUp', userController.signUp); // router for signUp
router.get('/sign-in' , userController.signIn); // ruoter for signIN

router.post('/create', userController.create); // router for creating user
//router for logging in into home page
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), userController.createSession); 
// used for deleting the user
router.get('/sign-out' , userController.destroySession);
router.use('/habit' , require('./habit')); // it is for habits, Habit is also part of user

// these are for forgetPassowrd. one router will redirect to forgetPassword Page, and other will change the password
router.use('/forgetPassword' , userController.forgetPasswordPage);
router.use('/forgetPasswordPage', userController.forgetPasswordLink);

module.exports = router;