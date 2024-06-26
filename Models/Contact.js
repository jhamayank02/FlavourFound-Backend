const mongoose = require('mongoose');
const connectDB = require('../utils/connectDB');

connectDB();

const contactSchema = mongoose.Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'Customer id is a required field!']
    },
    contact_email: {
        type: String,
        required: [true, 'Customer email id is a required field!']
    },
    contact_no: {
        type: String,
        required: [true, 'Contact number is a required field!']
    },
    contact_query: {
        type: String,
        required: [true, 'Query is a required field!']
    }
}, {timestamps: true})

const contactModel = mongoose.model("Contact", contactSchema);

module.exports = contactModel;