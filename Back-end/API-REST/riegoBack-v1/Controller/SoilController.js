'use stricts';
const Soil = require('../Models/Soild');
/**
 * Metodo para registrar características de Suelo
 * @param req Clase de suelo,CC, PMP
 * @param res registro caracteristicas de suelo
 */
exports.registerSoil = (req, res) => {
    const soil = Soil({
        textureClass: req.body.textureClass,
        arcilla: req.body.ac,
        limo: req.body.limo,
        arena: req.body.ar,
        capacidadCampo: 0.48 * parseFloat(req.body.ac) + 0.162 * parseFloat(req.body.limo) + 0.023 * parseFloat(req.body.ar) + 2.62,
        puntoMarchitez: 0.302 * parseFloat(req.body.ac) + 0.102 * parseFloat(req.body.limo) + 0.0147 * parseFloat(req.body.ar)
    });
    soil.save().then((result) => {
        if (result) {
            res.send({
                message: 'Características de suelo registradas correctamente',
                data: result
            })
        } else {
            res.send({
                message: 'Ocurrio un error al registrar características de suelo',
            })
        }
    }).catch((error) => {
        res.send({
            message: 'Ocurrio un error al realizar la consulta',
            error: error
        })
    })
}
/**
 * Metodo para buscar todos los suelos
 * @param req all
 * @param res data soil
 */
exports.findCharacteristicSoil = (req, res) => {
    Soil.find({}).then((result) => {
        res.send({
            message: 'Success',
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
 * Metodo para buscar todos los suelos
 * @param req all
 * @param res valor y label
 */
exports.findCharacteristicValueSoil = (req, res) => {
    Soil.find({}).then((result) => {
        if (result) {
            let dataSoil = [];
            result.forEach((dataS) => {
                const data = {
                    value: dataS._id,
                    label: dataS.textureClass
                }
                dataSoil.push(data)
            })

            res.status(200).send(dataSoil)
        }
    }).catch((error) => {
        res.send({
            message: 'Error en la consulta',
            error: error
        })
    })
}
/**
 * Actualizar tipos de suelo
 * @param req
 * @param res
 * @constructor
 */
exports.SoilIdDataUpdate = (req, res) => {
    Soil.findById({_id: req.params.id}).then((result) => {
        console.log(req.params.id)
        if (result) {
            res.send({
                message: 'Consulta Correcta',
                data: result
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
 * Metodo para actualizar caracteristicas de suelo
 * @param req id
 * @param res datos actualizados
 */
exports.updateSoilDetails = (req, res) => {
    Soil.findById({_id: req.params.id}).then((result) => {
        result.textureClass = req.body.textureClass;
        result.arcilla = req.body.ac;
        result.limo = req.body.limo;
        result.arena = req.body.ar;
        result.capacidadCampo = 0.48 * parseFloat(req.body.ac) + 0.162 * parseFloat(req.body.limo) + 0.023 * parseFloat(req.body.ar) + 2.62;
        result.puntoMarchitez = 0.302 * parseFloat(req.body.ac) + 0.102 * parseFloat(req.body.limo) + 0.0147 * parseFloat(req.body.ar);
        result.save().then((dataUpdate) => {
            res.send({
                message: 'Data Actualizada correctamente',
                data: dataUpdate
            })
        }).catch((error) => {
            res.send({
                message: 'Error al actualizar Suelo',
                error: error
            })
        })
    }).catch((error) => {
        res.send({
            message: 'Ocurrio un error al realizar la consulta',
            error: error
        })
    })
}
/**
 * Metodo para eliminar topic de suelo
 * @param req id
 * @param res delete tipo suelo
 * @constructor
 */
exports.DeleteTopicSoil = (req, res) => {
    Soil.findOneAndDelete({_id: req.params.id}, (err, result) => {
        if (!err) {
            res.send({
                message: 'Tipo suelo eliminado correctamente',
                data: result
            })
        } else {
            res.send({
                message: 'Error al eliminar Tipo Suelo',
                error: error
            })
        }
    })
}