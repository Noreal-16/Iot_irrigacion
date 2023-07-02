const express = require('express');
const router = express.Router();
const SoilController = require('../Controller/SoilController');

router.post('/soil', SoilController.registerSoil);
router.get('/soil', SoilController.findCharacteristicSoil);
router.get('/data/soil', SoilController.findCharacteristicValueSoil);
router.get('/soilData/:id', SoilController.SoilIdDataUpdate);
router.post('/updateSoil/:id', SoilController.updateSoilDetails);
router.delete('/deleteSoil/:id', SoilController.DeleteTopicSoil);

module.exports = router;