'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const collection = new Schema({
    nameTopic: {
        type: String,
        require: true,
        unique: true
    },
    nameSensor:{
        type: String,
        require: true
    },
    status:{
        type: Boolean,
        default: true
    },
},{
    timestamps:{
        createdAt:'createdAt',
        updatedAt:'updatedAt'
    }
});
module.exports= mongoose.model('TopicSensor', collection);