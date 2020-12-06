const express  =require('express');
const bdp      =require('body-parser');
const app      =express();
const routers  =require('./routers/routes')
const PORT     =8080||process.env.PORT;
const cors     =require('cors');
require('./dbconnection'); 

app.use(bdp.urlencoded({extended:true}));
//app.use(express.static('public'));
app.set('views','./views');
app.set('view engine','ejs');

app.use(routers);//we wrote all routes in another file export and use it in server.js file using app.use
app.use(cors)

//starting the server on port 8000 using app.listen() function
app.listen(PORT,(err)=>{
   if(err){
       console.log(err);
   }
   else{
       console.log("server started at PORT"+" "+PORT );
   }
})   
