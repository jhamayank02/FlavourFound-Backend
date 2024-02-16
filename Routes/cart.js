const express = require('express');
const router = express.Router();

const { deleteFromCart, addToCart, createCart, cartDetails } = require('../controllers/cart');

router.all('/cart-details', cartDetails);

router.post('/create-cart', createCart);

router.post('/add', addToCart);

router.post('/delete', deleteFromCart);

module.exports = router;
