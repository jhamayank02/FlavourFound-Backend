const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; 

const userModel = require('../Models/User');
// const { logout, login, failurejson, register, isLoggedIn } = require('../controllers/auth');
const { logout, login, failurejson, register } = require('../controllers/auth');

const router = express.Router();

router.use(session({
    secret: 'jdkjfkfd(*3jkdf83^#(HJDS*#84',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 60*60*1000} // 1 hour
}))

// router.use(express.urlencoded({ extended: true }));
router.use(passport.initialize());
router.use(passport.session());

// passport.use(userModel.createStrategy());
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, userModel.authenticate()));

passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

// router.use(isLoggedIn);

router.post('/register', register);

router.get('/failurejson', failurejson);

router.post('/login', passport.authenticate("local", {
        failureRedirect: "/auth/failurejson"
    }), login);

router.get('/logout', logout);

router.use((req,res)=>{
    res.sendStatus(404);
})

module.exports = router;