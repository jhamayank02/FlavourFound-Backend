const express = require('express');
const router = express.Router();

const { orderDelivered, allOrders, placeOrder } = require('../controllers/order');

// Place the order
router.post('/place-order', placeOrder)

// Return all the orders of a customer
router.post('/all-orders', allOrders)

// Mark the order as delivered
// router.post('/order-delivered', orderDelivered)

module.exports = router;