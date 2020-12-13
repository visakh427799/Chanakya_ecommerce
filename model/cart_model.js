const express= require('express');
const mongoose= require('mongoose');
const Schema  = mongoose.Schema;

const cartSchema=new Schema({

    user_id:String,
    item_id:String,
    item_name:String,
    item_prize:Number,
    item_desc:String,
    item_image:String,
    item_category:String,
    item_nos:Number,




})

const cart=mongoose.model('cart',cartSchema);
module.exports=cart;
