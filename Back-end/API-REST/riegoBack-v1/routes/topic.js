const express = require('express');
const router = express.Router();
const topicController = require('../Controller/TopicSensorController');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('Topic Router');
});
router.get('/topics', topicController.findTopicDetails);
router.get('/list/:id', topicController.findTopicForId);
router.post('/registroTopic', topicController.registerTopics);
router.post('/update/:id', topicController.updateTopicDetails);
router.delete('/delete/TSensor/:id', topicController.DeleteTopicSensor);

module.exports = router;
