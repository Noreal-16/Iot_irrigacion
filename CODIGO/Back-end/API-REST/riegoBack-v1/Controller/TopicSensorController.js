'use strict';
const TopicSensor = require('../Models/TopicSensor');
const TopicActuator = require("../Models/TopicActuator");
/**
 * Metodo para regitar topics de sensor
 * @param req req.body
 * @param res resull save topic sensor
 */
exports.registerTopics = (req, res) => {
    const topic = TopicSensor({
        nameTopic: req.body.nameTopic,
        nameSensor: req.body.nameSensor
    });
    topic.save().then((result) => {
        res.send({
            message: 'TopicSensor registrado correctamente',
            data: result
        })
    }).catch((error) => {
        res.send({
            message: 'Ocurrio un error al registrar TopicSensor',
            error: error
        })
    })
}
/**
 * Metodo para buscar todos los topics
 * @param req
 * @param res result topics
 */
exports.findTopicDetails = (req, res) => {
    TopicSensor.find({}).then((result) => {
        res.send({
            message: 'Consulta Correcta',
            data: result
        })
    }).catch((error) => {
        res.send({
            message: 'Error en la consulta',
            error: error
        })
    })
}
/**
 * Metodo para buscar topics de sensores por id
 * @param req id
 * @param res data de sensor topic
 */
exports.findTopicForId = (req, res) => {
    TopicSensor.findById({_id: req.params.id}).then((result) => {
        if (result) {
            res.send({
                message: 'Consulta de topic correcta',
                data: result
            })
        } else {
            res.send({
                message: 'No se encontraron topics registrados',
            })
        }
    }).catch((error) => {
        res.send({
            message: 'Error en la consulta',
            error: error
        })
    })
}
/**
 * Metodo para actualizar topic
 * @param req id
 * @param res topic actualizado
 */
exports.updateTopicDetails = (req, res) => {
    TopicSensor.findById({_id: req.params.id}).then((result) => {
        console.log(result)
        result.nameTopic = req.body.nameTopic;
        result.nameSensor = req.body.nameSensor;
        result.save().then((updateData) => {
            if (updateData) {
                res.send({
                    message: 'Topic actualizado correctamente',
                    data: updateData
                })
            }
        }).catch((error) => {
            res.send({
                message: 'Ocurrio un error al actualizar el topic',
                error: error
            })
        })
    })
}


/**
 * Metodo para eliminar topic de sensores
 * @param req id
 * @param res delete Topic
 * @constructor
 */
exports.DeleteTopicSensor =  (req, res) => {
     TopicSensor.findOneAndDelete({_id: req.params.id}, (error, result) => {
        if (!error) {
            res.send({
                message: 'Topic eliminado correctamente',
                data: result
            })
        }else {
            res.send({
                message: 'Ocurrio un error al eliminar dato',
                error: error
            })
        }

    })
}