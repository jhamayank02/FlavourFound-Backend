const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/FlavourFound');

const paymentSchema = mongoose.Schema({
    payment_id: {
        type: String,
        required: [true, 'Payment id is a required field']
    },
    amount: {
        type: Number,
        required: [true, 'Amount is a required field']
    },
    currency: {
        type: String,
        required: [true, 'Currency is a required field']
    },
    customer_id: {
        type: String,
        required: [true, 'Customer id is a required field']
    },
    order_id: {
        type: String,
        required: [true, 'Order id is a required field']
    },
    status: {
        type: String,
        required: [true, 'Status is a required field']
    }
})

const paymentModel = mongoose.model('Payments', paymentSchema);

module.exports = paymentModel;