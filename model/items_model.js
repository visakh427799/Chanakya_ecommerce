const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const Items_model=new Schema({

       itm_name:String,
       itm_prize:Number,
       itm_image:String,
       itm_category:String,
       itm_description:String,
       itm_Availability:Boolean,
       itm_stock:Number,

})
const Item=mongoose.model('Item',Items_model);
module.exports=Item;