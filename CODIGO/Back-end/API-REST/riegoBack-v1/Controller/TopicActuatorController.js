'use strict';
const TopicActuator = require('../Models/TopicActuator');
/**
 * Metodo para registrar topics para actuadores
 * @param req req.body
 * @param res reistro topic
 */
exports.registerTopics = (req, res) => {
    const topic = TopicActuator({
        nameTopicActuator: req.body.nameTopicActuador,
        nameActuator: req.body.nameActuador
    });
    topic.save().then((result) => {
        res.send({
            message: 'TopicActuator de Actuador registrado correctamente',
            data: result
        })
    }).catch((error) => {
        res.send({
            message: 'Ocurrio un error al registrar TopicActuator del Actuador',
            error: error
        })
    })
}
/**
 * Metodo para buscar todos los topics para actuadores
 * @param req
 * @param res topics actuadores
 */
exports.findTopicDetails = (req, res) => {
    TopicActuator.find({}).then((result) => {
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
 * Metodo para buscar topics por ID
 * @param req id
 * @param res result topics actuadores
 */
exports.findTopipForID = (req, res) => {
    TopicActuator.findById({_id: req.params.id}).then((result) => {
        if (result) {
            res.send({
                message: 'Busqueda de topics correcta',
                data: result
            })
        } else {
            res.send({
                message: 'No se encontraron topics registrados',
            })
        }
    }).catch((error) => {
        res.send({
            message: 'Error en la consulta de topics Actuadores',
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
    TopicActuator.findById({_id: req.params.id}).then((result) => {
        result.nameTopicActuator = req.body.nameTopicActuador;
        result.nameActuator = req.body.nameActuador;
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
exports.DeleteTopicActuator = (req, res) => {
    TopicActuator.findOneAndDelete({_id: req.params.id}, (err, result) => {
        if (!err) {
            res.send({
                message: 'Topic eliminado correctamente',
                data: result
            })
        } else {
            res.send({
                message: 'Error al eliminar topic',
                error: error
            })
        }
    })
}