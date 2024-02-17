const express = require('express');
const router = express.Router();
const {paymentSecret, paymentStatus, paymentPublishableKey} = require('../controllers/payments');

router.get('/payment-publishable-key', paymentPublishableKey);

router.post('/payment-secret', paymentSecret);

router.get('/payment-status', paymentStatus);

module.exports = router;