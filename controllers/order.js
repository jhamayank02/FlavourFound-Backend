const userModel = require('../Models/User');
const cartModel = require('../Models/Cart');
const orderModel = require('../Models/Order');
const asyncErrorHandler = require('../utils/asyncErrorHandler');

const placeOrder = asyncErrorHandler(async (req, res)=>{
    const customer_id = req.body.customer_id;
    const shipping_address = req.body.shipping_address;

    const customer = await userModel.findOne({_id: customer_id});

    const cart_details = await cartModel.findOne({customer_id: customer_id});

    // Delivered in 2 hours
    const curr_time = new Date();
    curr_time.setHours(curr_time.getHours() + 2);

    // If the cart has items
    if(cart_details !== undefined && cart_details.quantity > 0){  
        // Create a new order based on the cart items of the customer  
        const new_order = await orderModel.create({
            customer_id: customer._id,
            customer_name: customer.name,
            shipping_address: shipping_address,
            total_amount: cart_details.cart_total,
            ordered_items: cart_details.cart_items,
            delivered_by: curr_time.toLocaleString() 
        })
        
        // Make the customer cart empty after placing the order
        const clear_cart = await cartModel.updateOne({customer_id: customer_id}, {
            cart_items: [],
            cart_total: 0,
            quantity: 0
        })

        res.status(200).json({
            status: 200,
            msg: "Your order has been placed successfully",
            order: new_order
        });
    }
    // If the cart is empty
    else{
        res.status(200).json({
            status: 200,
            msg: "Add items in your cart to place order"
        });
    }
})

const allOrders = asyncErrorHandler(async (req, res)=>{
    const customer_id = req.body.customer_id;

    const orders = await orderModel.find({customer_id: customer_id});

    res.status(200).json({
        status: 200,
        orders: orders
    });
})

const orderDelivered = asyncErrorHandler(async (req,res)=>{
    const order_id = req.body.order_id;

    const order_fulfilled = await orderModel.findOneAndUpdate({_id: order_id}, {
       delivered: true,
       delivered_on: Date.now()
    }, {new: true})

    console.log("HERE", order_fulfilled)

    res.status(200).json({
        status: 200,
        msg: "Your order has been delivered successfully",
        order_fulfilled: order_fulfilled
    });
})

const createOrder = async (customer_id, shipping_address)=>{
    const customer = await userModel.findOne({_id: customer_id});
    const cart_details = await cartModel.findOne({customer_id: customer_id});

    // Delivered in 2 hours
    const curr_time = new Date();
    const delivered_by_time = curr_time.getHours() + 2;
    
    const new_order = await orderModel.create({
        customer_id: customer._id,
        customer_email: customer.email,
        customer_name: customer.name,
        shipping_address: shipping_address,
        total_amount: cart_details.cart_total,
        ordered_items: cart_details.cart_items,
        delivered_by: delivered_by_time 
    })

    // Make the customer cart empty after placing the order
    const clear_cart = await cartModel.updateOne({customer_id: customer_id}, {
        cart_items: [],
        cart_total: 0,
        quantity: 0
    })

    return new_order;
}

module.exports = {allOrders, placeOrder, orderDelivered, createOrder}