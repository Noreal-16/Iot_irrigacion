'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const collection = new Schema({
    topic: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'TopicSensor'
    },
    message:{
        type: String,
        require: true
    },
    Date:{
        type: Date
    },

}, {
    timestamps:{
        createdAt:'createdAt',
        updatedAt:'updatedAt'
    }
});
module.exports= mongoose.model('Sensor', collection);