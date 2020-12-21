const express = require('express');

const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const AddressModel=new Schema({

  U_id:String,
  Name:String,
  Mobile:Number,
  Pincode:String,
  Locality:String,
  Address:String,
  City_Dist_Town:String,
  State:String,
 

});

const Address=mongoose.model('Address',AddressModel);
module.exports=Address;