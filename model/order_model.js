const express = require('express');

const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const Order_Schema=new Schema({
    U_id:String,
    Items:Array,
    Date:Date,
    Total:Number,
    Address:Object,
    Payment_status:Boolean,
    Order_status:Boolean,
    Payment_method:String,



})
const Order= mongoose.model('Order',Order_Schema);
module.exports=Order;