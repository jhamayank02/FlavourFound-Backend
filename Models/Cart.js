const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/FlavourFound');

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
})

const cartModel = mongoose.model("Cart", cartSchema);

module.exports = cartModel;