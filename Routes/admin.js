const express = require('express');
const multer = require('multer');
const fs = require('fs');

const asyncErrorHandler = require('../utils/asyncErrorHandler');
const { admins, addFood, updateFood, deleteFood, allOrders, pendingOrders, completedOrders, businessSummary, isAdmin, orderDetails, userDetails, updateOrder, users, updateUser, payments, salesAnalysis } = require('../controllers/admin');

// const {isLoggedIn} = require('../controllers/auth');

// let storage = multer.diskStorage({
//     destination: './public/food-items/images/',
//     filename: (req,file,cb)=>{
//         file.originalname = Date.now() + "_" + file.originalname;
//         cb(null, file.originalname);
//     }
// })

// let upload = multer({
//     storage: storage,
//     fileFilter: (req, file, cb)=>{
//         if(
//             file.mimetype == 'image/jpeg' ||
//             file.mimetype == 'image/jpg' ||
//             file.mimetype == 'image/png' ||
//             file.mimetype == 'image/gif' ||
//             file.mimetype == 'image/webp'
//         ){
//             cb(null, true);
//         }
//         else{
//             cb(null, false);
//             cb(new Error('Only jpeg,  jpg , png, and gif Image allow'));
//         }
//     },
//     onError: (err, next)=>{
//         console.log(err.message);
//         // next(err);
//     }
// });


const { storage } = require('../utils/storage');

const upload = multer({
    storage: storage
});

const router = express.Router();

router.use(express.static('public'));

router.post('/admins', isAdmin, admins)

router.post('/users', isAdmin, users)

router.post('/add-food', upload.array('images', 3), isAdmin, addFood)

router.post('/update-food', isAdmin, updateFood)

router.post('/delete-food', isAdmin, deleteFood)

router.post('/all-orders', isAdmin, allOrders)

router.post('/pending-orders', isAdmin, pendingOrders)

router.post('/completed-orders', isAdmin, completedOrders)

router.get('/business-summary', isAdmin, businessSummary)

router.get('/sales-analysis', isAdmin, salesAnalysis)

router.post('/order-details', isAdmin, orderDetails)

router.post('/user-details', isAdmin, userDetails)

router.post('/update-order', isAdmin, updateOrder)

router.post('/update-user', isAdmin, updateUser)

router.post('/payments', isAdmin, payments)

router.use((req,res)=>{
    res.sendStatus(404);
})

module.exports = router;