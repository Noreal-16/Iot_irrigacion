const express = require('express');
const router = express.Router();
const SensorController = require('../Controller/SensorDataController');

router.get('/data/:topic', SensorController.dataForSensorDetail);
router.get('/dato/:topic', SensorController.dataHistoricSensor)


module.exports = router;