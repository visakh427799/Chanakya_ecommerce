const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
const User   = require('../model/user_model');



const GoogAuth=(req,res,next)=>{
const jwt     =require('jsonwebtoken')
   //receiving google token from client side
   let token=req.headers.token;
   //console.log(token)
   //call verifyToken function

   async function verify() {
         const ticket = await client.verifyIdToken({
             idToken: token,
             audience:process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
             // Or, if multiple clients access the backend:
             //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
         });
         const payload = ticket.getPayload();
         const userid = payload['sub'];
         const email = payload.email;
         username:payload.given_name
         console.log(payload)
         let userobj={
         username:payload.given_name,
         email:payload.email,
         phone:null,
         password:null,
    
       }
       console.log(userobj);
       //saving values in mongodb
                    User.findOne({email:email},(err,data)=>{
                        if(data){
                            
                            let uname=data.username;
                            let email=data.email;
                            const username={
                                name:uname,
                          
                            }
             
                            const token = jwt.sign({ username },process.env.SECRET_KEY, {
                                algorithm: "HS256",
                                expiresIn: "60d",
                            })
                            console.log(token );
                            res.cookie('token',token);
                            
                           /* res.json({
                                "Message":"An account with this email id already exist  and cokie set"
                            })*/
                            res.redirect('/login')
                        }
                        else{
                            //storing the datas and hashed passord into an object and inserting it into collection 'User'
                            
                            User.create(userobj,(err,data)=>{
                                if(err){
                                    res.json({
                                        "Error":err
                                    })
                                }
                                else{
                                    let email=data.email;
                                    const username={
                                        name:data.username,
                                  
                                    }
                     
                                    const token = jwt.sign({ username }, jwtKey, {
                                        algorithm: "HS256",
                                        expiresIn: "60d",
                                    })
                                    //console.log(token );
                                    res.cookie('token',token);
                                    //res.send("Registration success and Cookie Set"); 
                                    res.redirect('/login')
                                }
                            })

                        }

                        
                    })

         
        
       }
       verify().catch(console.error);

}

module.exports={
    GoogAuth
}