const express = require('express');
const app = express();
app.use(express.static('.'));

var P_key='pk_test_51HzOX8H1q928mWLKe7WnxPL2UBbFx52f5dIckwG2DZbJnLRhoBo4bhnPSUPgONhGO1dkjKF6vN41VXUlLJhLqOEN000x01Lm9U';
var S_key='sk_test_51HzOX8H1q928mWLKq4HcmpBQaOuBF68cLjqf9pi5x6JHVOm9f9sVilyPehPgmfOS5Wwsh1UOeqHgjJIXP6ZTuy1L00XxemoSJp';
const stripe = require('stripe')(S_key);

const Check_out=(req,res,next)=>{

    stripe.customers.create({ 
        email: req.body.stripeEmail, 
        source: req.body.stripeToken, 
        name: 'Gautam Sharma', 
        address: { 
            line1: 'TC 9/4 Old MES colony', 
            postal_code: '110092', 
            city: 'New Delhi', 
            state: 'Delhi', 
            country: 'India', 
        } 
    }) 
    .then((customer) => { 

        return stripe.charges.create({ 
            amount: 7000,    // Charing Rs 25 
            description: 'Web Development Product', 
            currency: 'USD', 
            customer: customer.id 
        }); 
    }) 
    .then((charge) => { 
        res.send("Success") // If no error occurs 
    }) 
    .catch((err) => { 
        res.send(err)    // If some error occurs 
    }); 

}  


module.exports={
    Check_out
}