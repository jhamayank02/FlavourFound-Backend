const mongoose = require('mongoose');
const connectDB = require('../utils/connectDB');

connectDB();

const FoodItemSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is a required field!']
    },
    category: {
        type: String,
        required: [true, 'Category is a required field!']
    },
    ingredients: {
        type: Array,
        required: [true, 'Ingredients is a required field!']
    },
    description: {
        type: String,
        required: [true, 'Description is a required field!']
    },
    price: {
        type: Number,
        required: [true, 'Price is a required field!']
    },
    images: {
        type: Array,
        default: [],
        required: [true, 'Images is required field!'],
    },
    reviews: {
        type: Array,
        default: []
    },
    stock: {
        type: Number,
        required: [true, 'Stock is a required field!']
    },
    averageRating: {
        type: Number,
        default: 0
    }
}, {timestamps: true})

const FoodModel = mongoose.model('Food Items', FoodItemSchema);

module.exports = FoodModel;