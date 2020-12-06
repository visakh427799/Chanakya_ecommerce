const express= require('express');
const bcrypt = require('bcrypt');
const User   = require('../model/user_model');


const Login=(req,res,next)=>{

    let email=req.body.email;
    let password=req.body.pass;

    User.findOne({email:email},(err,data)=>{
        if(data){
            
            bcrypt.compare(password,data.password,(err,value)=>{
               if(value){
                   res.json({
                       "Message":"Login success"
                   })
               }
               else{
                res.json({
                    "Message":"password Mismatch"
                })  
               }
            })
        }

        else{
            res.json({
                "Message":"User with this email id not exist"
            })
        }
    })





}

module.exports={
    Login
}

