const expresss = require('express');
const Order   = require('../model/order_model');

const All_orders=async (req,res,next)=>{
  await Order.find({},(err,data)=>{
      if(err) console.log(err);
      else {
          console.log(data);
          res.render('admin_all_orders',{data})

      }
    
  })

}
module.exports={
    All_orders
}