const express= require('express');
const bcrypt = require('bcrypt');
const User   = require('../model/user_model');
const jwt    = require('jsonwebtoken');

const jwtExpirySeconds = 300
const Login=(req,res,next)=>{

    let email=req.body.email;
    let password=req.body.pass;
    let usr={
        name:email,
        u_id:"admin",

    }
if(email==="admin@gmail.com"||password==="admin")
{
    const token = jwt.sign({ usr}, process.env.SECRET_KEY, {
        algorithm: "HS256",
        expiresIn: "60d",
    })
    console.log("token:", token)
      
      res.cookie('token',token);
      res.redirect('/admin')
}
else{
    User.findOne({email:email},(err,data)=>{
        if(data){
            
            bcrypt.compare(password,data.password,(err,value)=>{
               if(value){
                   
               const username={
                   name:data.username,
                   u_id:data._id,
             
               }

              const token = jwt.sign({ username }, process.env.SECRET_KEY, {
                algorithm: "HS256",
                expiresIn: "60d",
            })
            console.log("token:", token)
              
              res.cookie('token',token);
              
             // res.send("Cookie Set ,and login success"); 
              res.redirect('/login')

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



}

module.exports={
    Login
}

