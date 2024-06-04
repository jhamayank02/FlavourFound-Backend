const mongoose = require('mongoose');
const connectDB = require('../utils/connectDB');

connectDB();

const orderSchema = mongoose.Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'Customer id is a required field']
    },
    customer_name: {
        type: String,
        required: [true, 'Customer name is a required field']
    },
    customer_email: {
        type: String,
        required: [true, 'Customer email is a required field']
    },
    ordered_at: {
        type: Date,
        default: new Date()
    },
    shipping_address: {
        type: String,
        required: [true, 'Shipping address is a required field']
    },
    total_amount: {
        type: mongoose.Schema.Types.Number,
        required: [true, 'Total amount is a required field']
    },
    ordered_items: {
        type: Array,
        required: [true, 'Ordered items is a required field']
    },
    delivered: {
        type: Boolean,
        default: false
    },
    delivered_by: {
        type: Date
    },
    delivered_on: {
        type: Date
    }
}, {timestamps: true})

const orderModel = mongoose.model("Orders", orderSchema);

module.exports = orderModel;