const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/FlavourFound");

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
        type: String,
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
})

const orderModel = mongoose.model("Orders", orderSchema);

module.exports = orderModel;