const foodModel = require('../Models/FoodItem');
const orderModel = require('../Models/Order');
const userModel = require('../Models/User');
const paymentModel = require('../Models/Payment');
const asyncErrorHandler = require('../utils/asyncErrorHandler');
const cloudinary = require('cloudinary').v2;

const admins = asyncErrorHandler(async (req, res)=>{
    const allAdmins = await userModel.find({admin_rights: true});

    res.status(200).json({
        status: 200,
        allAdmins: allAdmins
    })
})

const users = asyncErrorHandler(async (req, res)=>{
    const allUsers = await userModel.find({});

    res.status(200).json({
        status: 200,
        allUsers: allUsers
    })
})

const addFood = asyncErrorHandler(async (req, res)=>{
    
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    const stock = req.body.stock;
    const ingredients = req.body.ingredients;
    const category = req.body.category.toLowerCase();

    let images = [];
    req.files.forEach(img => {
        images.push({
            img_id: img.filename,
            img_url: img.path
        });
    });

    const addedFoodItem = await foodModel.create({
        name: name,
        price: price,
        description: description,
        stock: stock,
        ingredients: ingredients,
        images: images,
        category: category
    })
    
    res.status(201).json({
        status: 201,
        msg: "The food item has been added successfully",
        food_item: addedFoodItem
    })
})

// CATCH ERROR
const deleteFood = asyncErrorHandler(async (req,res)=>{
    const id = req.body.id;

    const deletedItem = await foodModel.findOneAndDelete({_id: id});
    // Deleting the images
    const images = deletedItem.images;
    // images.forEach(img_name=>{
    //     fs.unlink('./public/food-items/images/' + img_name, (err)=>{
    //         // throw err;
    //     })
    // })
    
    images.forEach(async (img)=>{
        await cloudinary.uploader.destroy(img.img_id);
    })

    res.status(200).json({
        status: 200,
        msg: "The food item has been deleted successfully",
        deletedItem: deletedItem
    });
})

const allOrders = asyncErrorHandler(async (req,res)=>{
    const all_orders = await orderModel.find({});

    res.status(200).json({
        status: 200,
        all_orders: all_orders
    })
})

const pendingOrders = asyncErrorHandler(async (req,res)=>{
    const pending_orders = await orderModel.find({delivered: false});

    res.status(200).json({
        status: 200,
        pending_orders: pending_orders
    })
})

const completedOrders = asyncErrorHandler(async (req,res)=>{
    const completed_orders = await orderModel.find({delivered: true});

    res.status(200).json({
        status: 200,
        completed_orders: completed_orders
    })
})

const businessSummary = asyncErrorHandler(async (req,res)=>{
    const summary = {};
    
    // Get the count of total registered users
    const users = await userModel.find({});
    summary.total_users = users.length;
    summary.admin_rights = users.filter(user=> user.admin_rights === true).length;

    // Get the count of total listed food items
    const food_items = await foodModel.countDocuments({});
    summary.food_items_count = food_items;

    // Get the count of total sales and orders
    const orders = await orderModel.find({});

    let total_sales = 0;
    orders.forEach(order=>{
        total_sales += order.ordered_items.length;
    })
    summary.total_sales = total_sales;
    summary.total_orders = orders.length;

    // Get sales data for current month
    const today_date = new Date();
    const sales_this_month = await orderModel.find({
        ordered_at: {
            $gte: new Date(today_date - 86400*31*1000)
        }
    }).count();

    summary.sales_this_month = sales_this_month;

    res.status(200).json({
        status: 200,
        summary: summary
    });
})

// CATCH ERROR
// const salesAnalysis = asyncErrorHandler(async (req,res)=>{
//     const analysis = {};
    
//     const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//     const monthWiseData = {'Jan': 0, 'Feb': 0, 'Mar': 0, 'Apr': 0, 'May': 0, 'Jun': 0, 'Jul': 0, 'Aug': 0, 'Sep': 0, 'Oct': 0, 'Nov': 0, 'Dec': 0};
//     const today_date = new Date();

//     for(let i=0; i<12; i++){

//         const salesCount = await orderModel.find({
//             ordered_at: {
//                 // $gte: new Date(today_date -  (i+1)*(86400*31*1000)),
//                 // $lte: new Date(today_date -  (i)*(86400*31*1000))
//                 $gte: new Date(`1 ${i} ${today_date.getFullYear()}`),
//                 $lte: new Date(today_date -  (i)*(86400*31*1000))
//             }
//         }).count();

//         monthWiseData[months[i]] = salesCount;
//     }

//     res.json(monthWiseData);
// })

const orderDetails = asyncErrorHandler(async (req,res)=>{
    const order_id = req.body.order_id;

    const order_details = await orderModel.findOne({_id: order_id});

    res.status(200).json({
        status: 200,
        order_details: order_details
    });
})

const userDetails = asyncErrorHandler(async (req,res)=>{
    const customer_id = req.body.customer_id;

    const customer_details = await userModel.findOne({_id: customer_id});

    res.status(200).json({
        status: 200,
        customer_details: customer_details
    });
})

const updateOrder = asyncErrorHandler(async (req,res)=>{
    const order_id = req.body.order_id;
    const shipping_address = req.body.shipping_address;
    const delivered = req.body.delivered;

    const updatedOrder = await orderModel.findOneAndUpdate({_id: order_id}, {
        shipping_address: shipping_address,
        delivered: delivered,
        delivered_on: Date.now()
    }, {new: true});

    res.status(200).json({
        status: 200,
        msg: "Order details has been updated successfully",
        updatedOrder: updatedOrder
    });
})

const updateUser = asyncErrorHandler(async (req,res)=>{
    const customer_id = req.body.customer_id;
    const admin_rights = req.body.admin_rights;
    const contact_no = req.body.contact_no;

    const updatedUser = await userModel.findOneAndUpdate({_id: customer_id}, {
        admin_rights: admin_rights === 'true' || admin_rights === 'false' ? admin_rights : false,
        contact_no: contact_no
    }, {new: true});

    res.status(200).json({
        status: 200,
        msg: "User details has been updated successfully",
        updatedUser: updatedUser
    });
})

const updateFood = asyncErrorHandler(async (req,res)=>{
    const food_id = req.body.food_id;
    const stock = req.body.stock;
    const description = req.body.description;
    const price = req.body.price;

    const updatedFood = await foodModel.findOneAndUpdate({_id: food_id}, {
        description: description,
        stock: stock,
        price: price
    }, {new: true});

    res.status(200).json({
        status: 200,
        msg: "Food item has been updated successfully",
        updatedFood: updatedFood
    });
})

const isAdmin = asyncErrorHandler(async (req, res, next)=>{
    const user_id = req.body.user_id;
    const user_details = await userModel.findOne({_id: user_id});

    if(user_details !== null && user_details.admin_rights){
        next();
    }
    else{
        res.status(401).json({
            status: 401,
            msg: "You are not authorized to access this route"
        })
    }
})

const payments = asyncErrorHandler(async (req, res)=>{
    const payments = await paymentModel.find({});

    res.status(200).json({
        status: 200,
        payments: payments
    });
})

module.exports = {admins, users, addFood, updateFood, deleteFood, allOrders, pendingOrders, completedOrders, businessSummary, isAdmin, orderDetails, userDetails, updateOrder, updateUser, payments};