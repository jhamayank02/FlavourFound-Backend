const mongoose = require('mongoose');
const connectDB = require('../utils/connectDB');

connectDB();

const cartSchema = mongoose.Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    cart_total: {
        type: mongoose.Schema.Types.Number,
        default: 0
    },
    cart_items: {
        type: Array,
        default: []
    },
    quantity: {
        type: mongoose.Schema.Types.Number,
        default: 0
    }
}, {timestamps: true})

const cartModel = mongoose.model("Cart", cartSchema);

module.exports = cartModel;