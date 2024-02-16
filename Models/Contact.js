const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/FlavourFound');

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
})

const contactModel = mongoose.model("Contact", contactSchema);

module.exports = contactModel;