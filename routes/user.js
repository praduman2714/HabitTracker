const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');

router.get('/signUp', userController.signUp); // router for signUp
router.get('/sign-in' , userController.signIn); // ruoter for signIN


module.exports = router;