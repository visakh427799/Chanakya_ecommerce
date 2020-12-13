const express= require('express');
const User = require('../model/user_model');



const UserShow=(req,res,next)=>{

      User.find({},(err,data)=>{
          res.render('welcome_admin_allusers',{data})
      })


}

module.exports={
    UserShow    
}