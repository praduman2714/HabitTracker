const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habit_controller');


router.post('/createHabit' , habitController.createHabit);



module.exports = router; 