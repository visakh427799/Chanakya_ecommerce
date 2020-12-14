const express = require('express');
const Items   = require('../model/items_model');

const Item_show_u=(req,res,next)=>{
    let item_id=req.params.item;
    //console.log(item_id);
    let payload=res.user;//taking value from decoded
    console.log(payload);
    let name;
    if(payload){
     name=payload.username.name;
    }
    else{
        name="Account"
    }
    Items.find({},(err,data)=>{
        if(data){
            //console.log(data)
            let info=false;
            res.render('welcome_user',{data,info,name})
        }
    })


}
module.exports={
    Item_show_u
}