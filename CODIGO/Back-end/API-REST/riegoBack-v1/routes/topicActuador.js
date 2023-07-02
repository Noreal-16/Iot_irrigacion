const express = require('express');
const router = express.Router();
const topicActuatorController = require('../Controller/TopicActuatorController');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('Topic Router');
});
router.get('/topicsActuador', topicActuatorController.findTopicDetails);
router.get('/list/:id', topicActuatorController.findTopipForID);
router.post('/registroTopicActuador', topicActuatorController.registerTopics);
router.post('/updateActuador/:id', topicActuatorController.updateTopicDetails);
router.delete('/deletetopic/:id', topicActuatorController.DeleteTopicActuator);

module.exports = router;
