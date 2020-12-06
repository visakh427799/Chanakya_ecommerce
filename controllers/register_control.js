const express= require('express');
const bcrypt   = require('bcrypt');

const User     = require('../model/user_model');
//Function for  Signup

const Signup=(req,res,next)=>{
 //taking form values from req.body
     let username =req.body.username;
     let email    =req.body.email;
     let phone    =Number(req.body.phone);
     let pass1    =req.body.pass1;
     let pass2    =req.body.pass2;

      if(pass1!==pass2){
         res.status(403).send("Password mismatch")
      }

     else{
                let pass=pass2;
                //console.log("Password matched")
                //hashing the input password using bcrypt
                bcrypt.hash(pass,10,(err,hashedPass)=>{
                if(err){
                    res.json({
                        "Error":err,
                        })
                }
     //checking that the email id already exist or not
     
                User.findOne({email:email},(err,data)=>{
                    if(data){
                        res.json({
                            "Message":"An account with this email id already exist"
                        })
                    }
                    else{
                        //storing the datas and hashed passord into an object and inserting it into collection 'User'
                        const userData={
                            username:username,
                            email:email,
                            phone:phone,
                            password:hashedPass,
                        }
                        User.create(userData,(err,data)=>{
                            if(err){
                                res.json({
                                    "Error":err
                                })
                            }
                            else{
                                res.json({
                                    "Message":"Registration success",
                                    "Data":data
                                })
                            }
                        })

                    }

                    
                })
            
   })
        
  }
  
}




module.exports={
    Signup
}