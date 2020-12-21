const express = require('express');
const Address = require('../model/use_address_model');
const Cart  = require('../model/cart_model')
var P_key='pk_test_51HzOX8H1q928mWLKe7WnxPL2UBbFx52f5dIckwG2DZbJnLRhoBo4bhnPSUPgONhGO1dkjKF6vN41VXUlLJhLqOEN000x01Lm9U';
const Add_address=(req,res,next)=>{
let payload=res.user;
console.log(payload);
let u_id=payload.username.u_id;
var userObj={
    U_id:u_id,
    Name:req.body.name,
    Mobile:req.body.phone,
    Pincode:req.body.pin,
    Locality:req.body.loc,
    Address:req.body.address,
    City_Dist_Town:req.body.city,
    State:req.body.state,
 
}
let sum=0;
//console.log(userObj);

Address.findOne({U_id:u_id},(err,data)=>{
    if(data){
        console.log("Address found");

        Cart.find({user_id:u_id},(err,data)=>{
           // console.log(data)
           
            data.forEach((val)=>{
                sum+=val.item_prize*val.item_nos;
            })
            let key=P_key;
            res.render('payment_methods',{key});
            
         })
     
    }

    else{

                Address.create(userObj,(err,data)=>{
                    if(err){
                        console.log(err)
                    }
                    else{
                        console.log("successfullty inserted");
                        let key=P_key;
                        res.render('payment_methods',{key});
                    }
                })
       }

    
})

 
}
module.exports={
    Add_address
}