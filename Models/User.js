const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/FlavourFound");

const userSchema = mongoose.Schema({

    email: {
        type: String,
        required: [true, 'Email id is a required field'],
        unique: true
    },
    password: {
        type: String
    },
    contact_no: {
        type: String,
        required: [true, 'Contact no. is a required field'],
        unique: true
    },
    name: {
        type: String,
        required: [true, 'Name is a required field']
    },
    orders: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart"
    },
    admin_rights: {
        type: Boolean,
        default: false
    }
})

userSchema.plugin(passportLocalMongoose, {
    usernameField: 'email'
});

const userModel = mongoose.model('Users', userSchema);

module.exports = userModel;