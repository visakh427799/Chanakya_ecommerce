const express = require('express');
const Address = require('../model/use_address_model');
const Cart   = require('../model/cart_model')
const Address_form=async (req,res,next)=>{

   
     const payload=res.user;
     let u_id=payload.username.u_id;
     console.log(u_id) ;
     await Address.findOne({U_id:u_id},(err,data)=>{
        
         if(err){
             console.log(err)
         }
         else if(data){
          //console.log(data);
                        Cart.find({user_id:u_id},(err,dta)=>{
                            //console.log(data)
                            let sum=0;
                            
                            dta.forEach((val)=>{
                                sum+=val.item_prize*val.item_nos;
                              
                            })
                
                        res.render('user_address_form',{data,sum})
                        })
        
         }
         else{
             let data=[];
            
             Cart.find({user_id:u_id},(err,dat)=>{
                //console.log(data)
                let sum=0;
                
                dat.forEach((val)=>{
                    sum+=val.item_prize*val.item_nos;
                  
                })
    
            res.render('user_address_form',{data,sum})
            })
            }
    
    
    })  

    
}

module.exports={Address_form}