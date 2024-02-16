const foodModel = require('../Models/FoodItem');
const userModel = require('../Models/User');
const asyncErrorHandler = require('../utils/asyncErrorHandler');

const all = asyncErrorHandler(async (req, res)=>{
    const foodItems = await foodModel.find({});

    res.status(200).json({
        status: 200,
        foodItems: foodItems
    })
})

const category = asyncErrorHandler(async (req, res)=>{
    const category = req.params.category;
    const foodItems = await foodModel.find({category: category});
    
    res.status(200).json({
        status: 200,
        foodItems: foodItems
    })
})

const filterFoods = asyncErrorHandler(async (req, res)=>{
    const category = req.body.category;
    const max_price = req.body.max_price;

    let findCondition = {};

    if(category === '' && max_price !== ''){
        findCondition = {
            price: {$lte: Number(max_price), $gte: 0}
        };
    }
    else if(max_price === '' && category !== ''){
        findCondition = {
            category: category.toLowerCase()
        };
    }
    else if(max_price === '' && category === ''){
        findCondition = {};
    }
    else{
        findCondition = {
            category: category.toLowerCase(),
            price: {$lte: Number(max_price), $gte: 0}
        };
    }

    const foodItems = await foodModel.find(findCondition);
    
    res.status(200).json({
        status: 200,
        foodItems: foodItems
    });
})

const details = asyncErrorHandler(async (req, res)=>{
    const id = req.params.id;

    const foodItem = await foodModel.findOne({_id: id})
    res.status(200).json({
        status: 200,
        foodItem: foodItem
    })
})

const rating = asyncErrorHandler(async (req, res)=>{
    const customer_id = req.body.customer_id;
    const food_item_id = req.body.food_item_id;
    const feedback = req.body.feedback;
    const stars = req.body.stars;

    const customer = await userModel.findOne({_id: customer_id});
    const food_item = await foodModel.findOne({_id: food_item_id});

    const reviews = food_item.reviews;
    reviews.push({
        customer_id: customer_id,
        feedback: feedback,
        stars: Number(stars),
        customer_name: customer.name
    })

    let totalStars = 0;
    reviews.forEach(review => totalStars+=review.stars)

    let averageRating = totalStars / reviews.length;

    const updatedReviewsList = await foodModel.findOneAndUpdate({_id: food_item_id}, {
        reviews: reviews,
        averageRating: averageRating
    }, {new: true});

    res.status(200).json({
        status: 200,
        msg: "Your response has been submitted successfully."
    })
})

const search = asyncErrorHandler(async (req, res)=>{
    const searchQuery = req.body.searchQuery;
    const regex = new RegExp('^'+searchQuery, "i")

    const result = await foodModel.find({$or: [{name: regex}, {description: regex}, {ingredients: regex}]});

    res.status(200).json({
        status: 200,
        result: result
    });
})

module.exports = {all, category, details, filterFoods, rating, search}