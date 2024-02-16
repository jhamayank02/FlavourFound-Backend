const express = require('express');
const router = express.Router();

const { details, category, all, filterFoods, rating, search } = require('../controllers/foods');

// Get list of all the available food items
router.get('/all', all)

// Get list of all the available food items based on the category
router.get('/category/:category', category)

// Get list of all the available food items based on the category and price
router.post('/filter', filterFoods)

// Get details of the particular food item
router.get('/details/:id', details)

// Rate a food item
router.post('/rating', rating)

// Search a food item
router.post('/search', search)

module.exports = router;