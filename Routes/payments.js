const express = require('express');
const router = express.Router();
const {paymentSecret, paymentStatus} = require('../controllers/payments');

router.post('/payment-secret', paymentSecret);

router.get('/payment-status', paymentStatus);

module.exports = router;