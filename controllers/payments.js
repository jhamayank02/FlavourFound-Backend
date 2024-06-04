require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const userModel = require('../Models/User');
const cartModel = require('../Models/Cart');
const paymentModel = require('../Models/Payment');
const {createOrder} = require('../controllers/order');
const asyncErrorHandler = require('../utils/asyncErrorHandler');

// Indian test card
// 4000003560000008 

const paymentPublishableKey = asyncErrorHandler(async (req, res)=>{
    res.status(200).json({
        status: 200,
        publishable_key: process.env.STRIPE_PUBLISHABLE_KEY
    })    
})

const paymentSecret = asyncErrorHandler(async (req, res)=>{
    const {line, postal_code, city, state, country, customer_id} = req.body;

    const user = await userModel.findOne({_id: customer_id});
    const cart_details = await cartModel.findOne({_id: user.cart});

    const customer = await stripe.customers.create({
        name: user.name,
        address: {
            line1: line,
            postal_code: postal_code,
            city: city,
            state: state,
            country: country,
        },
    })
    
    const paymentIntent = await stripe.paymentIntents.create({
        amount: cart_details.cart_total * 100,
        currency: 'INR',
        payment_method_types: ['card'],
        customer: customer.id,
        description: 'FlavourFound Food Services',
        metadata: {
            customer_id: String(user._id),
            shipping_address: `${line}, ${postal_code}, ${city}, ${state}, ${country}`
        },
    })

    res.status(200).json({
        status: 200,
        client_secret: paymentIntent.client_secret
    });
})

const paymentStatus = asyncErrorHandler(async (req, res)=>{
    const payment_intent = req.query.payment_intent;
    const paymentStatusData = await stripe.paymentIntents.retrieve(payment_intent);

    if(paymentStatusData.status === 'succeeded'){
        const createdOrder = await createOrder(paymentStatusData.metadata.customer_id, paymentStatusData.metadata.shipping_address);

        const createdPayment = await paymentModel.create({
            payment_id: paymentStatusData.id,
            amount: paymentStatusData.amount / 100,
            currency: paymentStatusData.currency,
            customer_id: paymentStatusData.metadata.customer_id,
            status: paymentStatusData.status,
            order_id: createdOrder._id
        })
        
        // res.redirect('http://localhost:3000/#/payment-success');
        res.redirect('https://jhamayank02.github.io/FlavourFound/#/payment-success');
    }
    else{
        res.redirect('https://jhamayank02.github.io/FlavourFound/#/payment-failed');
        // res.redirect('http://localhost:3000/#/payment-failed');
    }
})

module.exports = {paymentSecret, paymentStatus, paymentPublishableKey};