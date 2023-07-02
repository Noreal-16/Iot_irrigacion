'use strict';

const Rol = require('../Models/Rol');
exports.RegisterRol = (req, res)=>{
    const rol = Rol({
        nameRol: req.body.nombreRol
    });
    rol.save().then((resul)=>{
        res.send({
            message:'Rol registrado correctamente',
            data: rol
        })
    }).catch((error)=>{
        res.send({
            message:'Ocurrio un Error al registrar Rol',
            error: error
        })
    })
}

exports.findDataRol = (req, res)=>{
    Rol.findById('62e047199e67c00ba5b1cd0e').then((result)=>{
        res.send({
            message:'Consulta de rol correcta',
            data: result
        })
    }).catch((error)=>{
        res.send({
            message:'Ocurrio un error en la consulta',
            error: error
        })
    })
}