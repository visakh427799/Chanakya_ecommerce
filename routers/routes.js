const express= require('express');
const router = express.Router();
const Sign   = require('../controllers/register_control');
const Log  = require('../controllers/login_control');
const GoogleAuth=require('../controllers/google_auth_control');
const FacebookbAuth    =require('../controllers/facebook_auth_control');
const jwt       =require('jsonwebtoken')
const Items_add = require('../controllers/items_add_control')
const Item_list = require('../controllers/items_display_control_admin');
const Item_list_u = require('../controllers/items_display_control_user');
const cartAdd    = require('../controllers/cart_add_control');
const CartShow  =require('../controllers/cart_show_controll');
const cart_plus = require('../controllers/add_cart_number_controll');
const remove_cart=require('../controllers/remove_from_cart_controll');
const admin_users=require('../controllers/all_user_show_controll');
const cart_minus = require('../controllers/minus_cart_number_controll');
const add_address = require('../controllers/user_address_controll');
const Check =require('../controllers/payment_control');
const Add_form = require('../controllers/user_address_form_controll');
const Orders   = require('../controllers/order_control');
const All_order=require('../controllers/all_orders_show_controll');
//setting up of routes

//middleares for cookie 

            const getAppCookies = (req) => {
                  // We extract the raw cookies from the request headers
                  if( req.headers.cookie)
                  {
                  const rawCookies = req.headers.cookie.split('; ');
                  // rawCookies = ['myapp=secretcookie, 'analytics_cookie=beacon;']
              
                  const parsedCookies = {};
                  rawCookies.forEach(rawCookie=>{
                  const parsedCookie = rawCookie.split('=');
                  // parsedCookie = ['myapp', 'secretcookie'], ['analytics_cookie', 'beacon']
                  parsedCookies[parsedCookie[0]] = parsedCookie[1];
                  });
                  return parsedCookies;

                }
            };
          //token verification middleware
                  function tokenVerify(req,res,next){
                  let Mytoken = getAppCookies(req);
                  console.log(Mytoken);
                  
                
                  if(Mytoken===undefined){
                              console.log("No token ")
                              res.render('user_login')
                        }

                        else{
                                      
                           Mytoken=Mytoken.token;
                           jwt.verify(Mytoken, process.env.SECRET_KEY,(err,decoded)=>{
                                 if(err){
                                       console.log("Token validity expired")
                                       res.render('user_login')
                                 }
                                 else{
                                      // console.log(decoded)
                                       //console.log("Already logged in  go to next page");
                                       //let email=""
                                       res.user=decoded;
                                      next()
                                      
                                 }

                           });
                           
                              
                        }
                  
                  }


//routes

router.get('/',Item_list_u.Item_show_u)
router.get('/admin',tokenVerify,Item_list.Item_show)
router.get('/admin/allusers',tokenVerify,admin_users.UserShow)
router.get('/admin/allorders',tokenVerify,All_order.All_orders)
router.get('/admin/add-products',tokenVerify,(req,res)=>{
      res.render('add_products');
    })    

router.get('/signup',(req,res)=>{
    res.render('signup.ejs');
  })
router.get('/login',tokenVerify,Item_list_u.Item_show_u)
router.get('/logout',(req,res)=>{
      res.clearCookie('token');
      res.redirect("login")
})
router.get('/addtocart/:item',tokenVerify,cartAdd.cart_add);
router.get('/cart',tokenVerify,CartShow.Cart_show);
router.get('addcartitem/cart',tokenVerify,CartShow.Cart_show);
router.get('/addcartitem/:id',cart_plus.addNumber);
router.get('/minuscartitem/:id',cart_minus.minusCart);
router.get('/removecartitem/:id',remove_cart.removeCart); 
router.get('/cart/address',tokenVerify,Add_form.Address_form);
router.get('/cart/address/order',tokenVerify,Orders.Order_item);
router.get('/cart/address/confirm',(req,res)=>{
    res.render('confirm')
});
router.get('/cart/address/success',(req,res)=>{
      res.render('success')
  });
router.get('/success',(req,res)=>{
      res.render('success');
})
router.get('/cancel',(req,res)=>{
      res.render('cancel');
})

router.post('/google',GoogleAuth.GoogAuth);
router.post('/signup',Sign.Signup);
router.post('/login',Log.Login);
router.post('/facebook',FacebookbAuth.FbAuth);
router.post('/additems',Items_add.ItemAdd);
router.post('/cart/address',tokenVerify,add_address.Add_address);
router.post('/payment',Check.Check_out);

module.exports=router;