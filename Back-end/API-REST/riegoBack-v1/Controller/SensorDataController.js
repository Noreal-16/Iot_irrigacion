'use strict';
const Sensores = require('../Models/Sensor');
const SensorCaudal = require('../Models/SensorCaudal');
const {log} = require("debug");

/**
 * Metodo para buscar datos de caudal
 * @param req topic
 * @param res data sesnores
 */
exports.dataForSensorDetail = (req, res) => {
    SensorCaudal.find({topic: req.params.topic}, (err, result)=>{
        if (err){
            res.status(404).send({message: `Error en la consulta Caudald ${err}`});
        }
        res.status(200).send({message: "Consulta correcta", result})
    })
}
/**
 * Metodo para obtener datos de sensores por topic
 * @param req id_ topic
 * @param res data sensores
 */
exports.dataHistoricSensor =(req, res)=>{
    Sensores.find({topic: req.params.topic}, (err, result)=>{
        if (err){
            res.status(404).send({message: `Error en la consulta Topic ${err}`})
        }
        const dataComplete = [];
        result.forEach((data)=>{
            const objData ={
                message: data.message,
                date: data.Date
            }
            dataComplete.push(objData)
        })
        res.status(200).send({message: "Consulta correcta ", result})
    })
}