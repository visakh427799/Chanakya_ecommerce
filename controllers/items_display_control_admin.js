const express = require('express');
const Items   = require('../model/items_model');

const Item_show=(req,res,next)=>{

    Items.find({},(err,data)=>{
        if(data){
            let payload=res.user;//taking value from decoded
            let name=payload.username.name;
            console.log(data)
            res.render('welcome_admin',{data,name})
        }
    })


}
module.exports={
    Item_show
}