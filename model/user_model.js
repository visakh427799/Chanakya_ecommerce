const express  = require('express');
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
//creating a model for user registration using mongoose Schema
const UserSchema=new Schema({

 username:String,
 email:String,
 phone:Number,
 password:String,


});

const User=mongoose.model('User',UserSchema);
module.exports=User