'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const collection = new Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    password:{
        type: String,
        require: true
    },
    Status:{
        type: Boolean,
        default: true
    },
    person:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Person'
    },
    rol:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Rol'
    },
},{
    timestamps:{
        createdAt:'createdAt',
        updatedAt:'updatedAt'
    }
});
module.exports= mongoose.model('Account', collection);