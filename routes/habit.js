const express = require('express'); // requireing the express
const router = express.Router(); // requiring Router
const habitController = require('../controllers/habit_controller'); // requiring habit_Controller, for calling its function.


router.post('/createHabit' , habitController.createHabit);
// this router is for the toggling status of the habit
router.get('/toggleStatus' , habitController.toogleStatus);
// this router is for keeping the habit in favorites or not.
router.get('/favorite' , habitController.toggleFavourite);
// this router is for deleting the habits
router.get('/remove' , habitController.removeHabit);


module.exports = router; 