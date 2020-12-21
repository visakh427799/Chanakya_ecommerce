const express = require('express');

const Address=require('../model/use_address_model');
const Order = require('../model/order_model');
const Cart = require('../model/cart_model');




const Order_item=(req,res,next)=>{


    //console.log("Hiiii")
    let payload=res.user;//taking value from decoded
    let u_id=payload.username.u_id;
    

    Cart.find({user_id:u_id},(err,cartArray)=>{
        if(err){
            //console.log("err");
        }
        else{

            Address.findOne({U_id:u_id},(err,userAddress)=>{
                if(err){
                    console.log("err");
                }
                else{
                    //console.log(data);
                    
                    const obj={
                        U_id:u_id,
                        Items:cartArray,
                        Date:2020-12-09,
                        Total:700,
                        Address:userAddress,
                        Payment_status:false,
                        Order_status:false,
                        Payment_method:"COD",
                    }
                
                    Order.create(obj,(err,data)=>{
                        if(err){
                            console.log(err)
                        }
                        else{
                            //console.log("Sucess")
                            res.redirect('/cart/address/success')

                        }
                    })
                
                
                }
            })
        
        
        }
    })
  
    
   
}

module.exports={
    Order_item
}