const express=require('express');
const jwt    =require('jsonwebtoken');
const jwtKey = "my_secret_key"



const FbAuth=(req,res,next)=>{

     console.log ("Fb login success") 
     console.log (req.headers.useremail) 
     console.log (req.headers.username) 
     let user={
         name:req.headers.username,
         email:req.headers.useremail
     } 
     const token = jwt.sign({user}, jwtKey, {
        algorithm: "HS256",
        expiresIn: "60d",
    })
    //console.log(token );
    res.cookie('token',token);
   /* res.json({
        "Message":"An account with this email id already exist  and cokie set"
    })*/
    res.render('welcome')
    next();

}


module.exports={
    FbAuth
}