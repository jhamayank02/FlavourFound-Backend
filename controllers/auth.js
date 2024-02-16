const { createCart } = require("./cart");
const passport = require('passport');
const userModel = require('../Models/User');
const asyncErrorHandler = require('../utils/asyncErrorHandler');

const register = asyncErrorHandler(async (req, res)=>{
    let userData = new userModel({
     name: req.body.name,
     contact_no: req.body.contact_no,
     email: req.body.email,
    })
 
    userModel.register(userData, req.body.password)
     .then((registeredUser)=>{
         passport.authenticate("local", {failureRedirect: "/auth/failurejson"})(req, res, async()=>{
             const created_cart = await createCart(req,res);
             res.status(200).json({
                status: 200,
                authenticated: true,
                email: req.user.email,
                id: req.user.id,
                isAdmin: req.user.admin_rights
            });
         })
     }).catch(err=>{
        res.status(401).json({status: 401, msg: err.message});
     })

})

const login = asyncErrorHandler(async (req,res)=>{
    res.status(200).json({
        status: 200,
        authenticated: true,
        email: req.user.email,
        id: req.user.id,
        isAdmin: req.user.admin_rights
    });
})

const logout = asyncErrorHandler(async (req, res)=>{
    req.logout((err)=>{
        if(err){
            throw Error(err);
        }
        else{
            res.status(200).json({
                status: 200,
                authenticated: false
            });  
        }
    })
})

// const isLoggedIn = asyncErrorHandler(async (req,res,next)=>{
//     if(req.isAuthenticated()){
//         return next();
//     }

//     res.status(200).json({
//         status: 200,
//         authenticated: false
//     });
// })

const failurejson = asyncErrorHandler((req, res)=>{
    res.status(401).json({status: 401, msg: "Make sure you have entered the correct credentials"});
})

// module.exports = {register, login, logout, isLoggedIn, failurejson}
module.exports = {register, login, logout, failurejson}