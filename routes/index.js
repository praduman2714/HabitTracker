const express = require('express'); // requring express
const router = express.Router(); // requring router
const homeController = require('../controllers/home_controller'); // requring homeController.

console.log("Router is loded");
// This is the main router, form here all the router will be distributed.

router.get('/' , homeController.home);
router.use('/users' , require('./user'));
// router.use('/habit' , require('./habit'));

module.exports = router;