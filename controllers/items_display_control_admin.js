const express = require('express');
const Items   = require('../model/items_model');

const Item_show=(req,res,next)=>{

    Items.find({},(err,data)=>{
        if(data){
            console.log(data)
            res.render('welcome_admin',{data})
        }
    })


}
module.exports={
    Item_show
}