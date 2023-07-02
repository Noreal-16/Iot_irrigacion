'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const collection = new Schema({
    textureClass: {
        type: String,
        require: true,
    },
    arcilla:{
        type: String,
        require: true
    },
    limo:{
        type: String,
        require: true
    },
    arena:{
        type: String,
        require: true
    },
    capacidadCampo:{
        type: String,
        require: true
    },
    puntoMarchitez:{
        type: String,
        require: true
    }
},{
    timestamps:{
        createdAt:'createdAt',
        updatedAt:'updatedAt'
    }
});
module.exports= mongoose.model('Soil', collection);