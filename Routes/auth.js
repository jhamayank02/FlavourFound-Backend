const express = require('express');
const passport = require('passport');

const userModel = require('../Models/User');

const { logout, login, failurejson, register, loginFailure } = require('../controllers/auth');
const { passportLocalConfig, passportJwtConfig } = require('../utils/passportUtils');

const router = express.Router();

router.use(passport.initialize());

passportLocalConfig(passport);
passportJwtConfig(passport);

passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

router.post('/register', register);

router.get('/failurejson', failurejson);

router.get('/login-failure', loginFailure);

router.post('/login', passport.authenticate("local", { session: false, failureRedirect: '/auth/failurejson' }), login);

router.post('/login-with-token', passport.authenticate("jwt", { session: false, failureRedirect: '/auth/failurejson' }), (req, res) => {
    res.status(200).json({
        status: 200,
        authenticated: true,
        email: req.user.email,
        id: req.user.id,
        isAdmin: req.user.admin_rights
    })
});

router.get('/logout', logout);

router.use((req, res) => {
    res.sendStatus(404);
})

module.exports = router;