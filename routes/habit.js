const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habit_controller');


router.post('/createHabit' , habitController.createHabit);
// this router is for the toggling status of the habit
router.get('/toggleStatus' , habitController.toogleStatus);


module.exports = router; 