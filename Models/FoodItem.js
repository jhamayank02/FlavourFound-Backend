const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/FlavourFound');

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
        type: String,
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
        type: String,
        required: [true, 'Stock is a required field!']
    },
    averageRating: {
        type: Number,
        default: 0
    }
})

const FoodModel = mongoose.model('Food Items', FoodItemSchema);

module.exports = FoodModel;