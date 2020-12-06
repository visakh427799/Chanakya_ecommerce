const express= require('express');
const router = express.Router();
const Sign   = require('../controllers/register_control');
const Log  = require('../controllers/login_control')
//setting up of routes

router.get('/',(req,res)=>{
    res.send("Home page");
  })
router.get('/signup',(req,res)=>{
    res.render('signup.ejs');
  })
router.get('/login',(req,res)=>{
      res.render('login.ejs');
  })

router.post('/signup',Sign.Signup);
router.post('/login',Log.Login);

module.exports=router;