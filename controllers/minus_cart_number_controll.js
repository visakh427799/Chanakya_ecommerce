const express = require('express');
const Cart  = require('../model/cart_model');


const minusCart=(req,res,next)=>{
      
    let id=req.params.id;
    console.log(id)
    Cart.findOne({item_id:id},(err,data)=>{
        console.log(data)
        let nos=data.item_nos;
        nos=nos-1;
        console.log(nos)
       let newObj={
       
            user_id:data.user_id,
            item_id:data.item_id,
            item_name:data.item_name,
            item_prize:data.item_prize,
            item_desc:data.item_desc,
            item_image:data.item_image,
            item_category:data.item_category,
            item_nos:nos,
            }
          Cart.deleteOne({item_id:id},(err,data)=>{
              if(err){
                  console.log(err)
              }
              else{
                     console.log(newObj)
                      
                     Cart.create(newObj,(err,data)=>{
                        if(err) console.log(err)
            
                        else{
                            console.log(data)
                            Cart.find({},(err,data)=>{
                                let nos=0;
                                let sum=0;
                                data.forEach((val)=>{
                                  
                                    sum+=val.item_prize;
                                    nos=val.item_nos;
                                })
                                sum*=nos;
                                res.redirect('/cart')
                            
                                })
                            }
                       }) 
              }
                  //console.log(data)
     
        })  
        
    })
    
                       
    
    
    
    
    

}


module.exports={
    minusCart
}