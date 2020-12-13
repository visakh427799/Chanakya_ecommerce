const express = require('express');
const Cart    = require('../model/cart_model');



const Cart_show=async (req,res,next)=>{
    let payload=res.user;//taking value from decoded
    let u_id=payload.username.u_id
    await Cart.find({user_id:u_id},(err,data)=>{
       console.log(data)
       let sum=0;
       data.forEach((val)=>{
           sum+=val.item_prize*val.item_nos;
       })

          res.render('cart_show',{data,sum})
    })
}


module.exports={
    Cart_show
}