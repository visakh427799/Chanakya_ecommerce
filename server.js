const express  =require('express');
const bodyParser = require('body-parser')
const app      =express();
const routers  =require('./routers/routes')
const PORT     =8000||process.env.PORT;
const cors     =require('cors');
const cookieParser=require('cookie-parser')
require('./dbconnection'); 

app.use(bodyParser.urlencoded({extended:false}));
//app.use(express.static('public'));
app.set('views','./views');
app.set('view engine','ejs');

app.use(routers);//we wrote all routes in another file export and use it in server.js file using app.use
app.use(cors);
app.use(express.json())
app.use(bodyParser.json());
app.use(cookieParser)

//starting the server on port 8000 using app.listen() function
app.listen(PORT,(err)=>{
   if(err){
       console.log(err);
   }
   else{
       console.log("server started at PORT"+" "+PORT );
   }
})   
