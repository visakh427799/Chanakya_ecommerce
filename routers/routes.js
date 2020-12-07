const express= require('express');
const router = express.Router();
const Sign   = require('../controllers/register_control');
const Log  = require('../controllers/login_control');
const GoogleAuth=require('../controllers/google_auth_control');
const jwt       =require('jsonwebtoken')
const jwtKey = "my_secret_key"
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
                        }

                        else{
                                      
                           Mytoken=Mytoken.token;
                           jwt.verify(Mytoken, jwtKey,(err,decoded)=>{
                                 if(err){
                                       console.log(err)
                                 }
                                 else{
                                       console.log(decoded)
                                       console.log("Already logged in  go to next page")
                                 }

                           });
                           
                              
                        }
                  next();
                  }




router.get('/',(req,res)=>{
    res.send("Home page");
  })
router.get('/signup',(req,res)=>{
    res.render('signup.ejs');
  })
router.get('/login',tokenVerify,(req,res)=>{
      res.render('login.ejs');
  })
router.post('/google',tokenVerify,GoogleAuth.GoogAuth)
router.post('/signup',Sign.Signup);
router.post('/login',Log.Login);

module.exports=router;