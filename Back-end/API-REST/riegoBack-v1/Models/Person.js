'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const collection = new Schema({
    nameU: {
        type: String,
        require: true,
    },
    lastName:{
        type: String,
        require: true
    },
    telephone:{
        type: String,
    },
    direction:{
        type: String,
    }
},{
    timestamps:{
        createdAt:'createdAt',
        updatedAt:'updatedAt'
    }
});
module.exports= mongoose.model('Person', collection);