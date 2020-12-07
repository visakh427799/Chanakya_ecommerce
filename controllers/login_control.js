const express= require('express');
const bcrypt = require('bcrypt');
const User   = require('../model/user_model');
const jwt    = require('jsonwebtoken');
const jwtKey = "my_secret_key"
const jwtExpirySeconds = 300
const Login=(req,res,next)=>{

    let email=req.body.email;
    let password=req.body.pass;

    User.findOne({email:email},(err,data)=>{
        if(data){
            
            bcrypt.compare(password,data.password,(err,value)=>{
               if(value){
                   
               const username={
                   name:data.username,
             
               }

              const token = jwt.sign({ username }, jwtKey, {
                algorithm: "HS256",
                expiresIn: "60d",
            })
            console.log("token:", token)
              
              res.cookie('token',token);
              res.send("Cookie Set ,and login success"); 

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

