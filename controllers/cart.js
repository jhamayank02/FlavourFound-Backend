const userModel = require('../Models/User');
const cartModel = require('../Models/Cart');
const foodModel = require('../Models/FoodItem');
const asyncErrorHandler = require('../utils/asyncErrorHandler');

const cartDetails = asyncErrorHandler(async (req,res)=>{
    const customer_id = req.body.customer_id;

    const cartDetails = await cartModel.findOne({customer_id: customer_id});

    res.status(200).json({
        status: 200,
        cartDetails: cartDetails
    });
})

const createCart = asyncErrorHandler(async (req,res)=>{
    const customer_id = req.user.id;
    
    const created_cart = await cartModel.create({
        customer_id: customer_id,
    })

    const user = await userModel.findOneAndUpdate({_id: customer_id}, {cart: created_cart._id});
})

const addToCart = asyncErrorHandler(async (req,res)=>{
    const customer_id = req.body.customer_id;
    const food_id = req.body.food_id;

    const food_item = await foodModel.findOne({_id: food_id});
    const cart = await cartModel.findOne({customer_id: customer_id});

    let updated_cart_items = cart.cart_items;
    let updated_quantity = cart.quantity;
    let updated_cart_total = cart.cart_total;

    let prev_ind = updated_cart_items.findIndex((item)=> String(item.food_id) === String(food_item._id));

    if(prev_ind === -1){
       updated_cart_items.push({
        food_id: food_item._id,
        food_item: food_item.name,
        item_quantity: 1,
        item_price: Number(food_item.price),
        food_image: food_item.images[0].img_url,
        item_total_amount: Number(food_item.price)
       });
    }
    else{
       updated_cart_items[prev_ind].item_quantity++;
       updated_cart_items[prev_ind].item_total_amount += Number(food_item.price);
    }

    updated_quantity++;
    updated_cart_total += Number(food_item.price);

    const updatedCart = await cartModel.updateOne({customer_id: customer_id}, {
        cart_items: updated_cart_items,
        quantity: updated_quantity,
        cart_total: updated_cart_total
    }, {new: true})

    res.status(200).json({
        status: 200,
        msg: "Cart items has been updated successfully",
        updatedCart: updatedCart
    });
})

const deleteFromCart = asyncErrorHandler(async (req,res)=>{
    const customer_id = req.body.customer_id;
    const food_id = req.body.food_id;

    const cart = await cartModel.findOne({customer_id: customer_id});

    // TODO -> Handle
    if(cart === null){}

    let ind = cart.cart_items.findIndex(food => String(food.food_id) === String(food_id));

    // TODO - ind == -1
    if(ind != -1){

    let updated_cart_items;
    let updated_cart_total;
    let updated_quantity;

    updated_cart_total = cart.cart_total - cart.cart_items[ind].item_price;
    updated_cart_items = cart.cart_items;

    if(cart.cart_items[ind].item_quantity === 1){
        updated_cart_items.splice(ind, 1);
    }
    else{
        updated_cart_items[ind].item_quantity--;
    }
    
    updated_quantity = cart.quantity-1;

    const deletedItem = await cartModel.updateOne({customer_id: customer_id}, {
        cart_items: updated_cart_items,
        quantity: updated_quantity,
        cart_total: updated_cart_total
    })
        res.status(200).json({
            status: 200,
            deletedItem: deletedItem
        });
    }
    else{
        res.status(200).json({
            status: 200,
            msg: "The cart item you want to delete doesn't exist in the cart"
        })
    }
})

module.exports = {cartDetails, createCart, addToCart, deleteFromCart}