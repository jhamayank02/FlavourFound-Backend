require('dotenv').config();
const { createCart } = require("./cart");
const passport = require('passport');
const jwt = require('jsonwebtoken');
const userModel = require('../Models/User');
const asyncErrorHandler = require('../utils/asyncErrorHandler');

const register = asyncErrorHandler(async (req, res) => {
    let userData = new userModel({
        name: req.body.name,
        contact_no: req.body.contact_no,
        email: req.body.email,
    })

    userModel.register(userData, req.body.password)
        .then((registeredUser) => {
            passport.authenticate("local", { failureRedirect: "/auth/failurejson" })(req, res, async () => {
                const created_cart = await createCart(req, res);

                const token = jwt.sign({
                    email: req.user.email,
                }, process.env.JWT_SECRET, { expiresIn: '1d' });

                res.status(200).json({
                    status: 200,
                    authenticated: true,
                    email: req.user.email,
                    id: req.user.id,
                    isAdmin: req.user.admin_rights,
                    token: token
                });
            })
        }).catch(err => {
            res.status(401).json({ status: 401, msg: err.message });
        })

})

const login = asyncErrorHandler(async (req, res) => {
    const token = jwt.sign({
        email: req.user.email,
    }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({
        status: 200,
        authenticated: true,
        email: req.user.email,
        id: req.user.id,
        isAdmin: req.user.admin_rights,
        token: token
    });
})

const logout = asyncErrorHandler(async (req, res) => {
    res.status(200).json({
        status: 200,
        authenticated: false
    });
})

const isLoggedIn = passport.authenticate('jwt', {session: false, failureRedirect: '/auth/login-failure'});

const loginFailure = (req, res) => {
    return res.status(401).json({ status: 401, msg: "You must be logged in to perform this operation" });
}

const failurejson = (req, res) => {
    return res.status(401).json({ status: 401, msg: "Make sure you have entered the correct credentials" });
}

module.exports = { register, login, logout, failurejson, isLoggedIn, loginFailure };