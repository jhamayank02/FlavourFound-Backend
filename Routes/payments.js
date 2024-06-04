const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../controllers/auth');
const {paymentSecret, paymentStatus, paymentPublishableKey} = require('../controllers/payments');

router.get('/payment-publishable-key', isLoggedIn, paymentPublishableKey);

router.post('/payment-secret', isLoggedIn, paymentSecret);

router.get('/payment-status', paymentStatus);

module.exports = router;