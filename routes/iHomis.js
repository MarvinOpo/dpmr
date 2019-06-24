var express = require('express');
var router = express.Router();

var iHomisAPIController = require('../controller/iHomisAPIController');

/* Insert data to hospital_encounter table. */
router.post('/ihomis/save_encounter', iHomisAPIController.insert_encounter);

/* Insert data to hospitals table. */
router.post('/ihomis/save_hospital', iHomisAPIController.insert_hospital);

/* GET data by hospitals. */
router.post('/ihomis/get_hospital_data', iHomisAPIController.get_hospital_data);

module.exports = router;
