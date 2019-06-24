var express = require('express');
var router = express.Router();

var mainController = require('../Controller/mainController');

/* GET index page. */
router.get('/', mainController.index);

/* GET login page. */
router.get('/login', mainController.login);

/* Perform login POST. */
router.post('/login', mainController.post_login);

/* GET logout page. */
router.get('/logout', mainController.logout);

/* GET dashboard page. */
router.get('/dashboard', mainController.dashboard);
 
module.exports = router;    