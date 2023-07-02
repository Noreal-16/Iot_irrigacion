'use strict';
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var collection = new Schema({
    nameRol:{
        type:String,
        required:true,
        unique: true
    },
    status:{
        type:Boolean,
        default:true
    }
}, {
    timestamps:{
        createdAt:'createdAt',
        updatedAt:'updatedAt'
    }
});


module.exports= mongoose.model('Rol', collection);