const userModel = require('../Models/User');

require('dotenv').config();
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const passportJwtConfig = (passport) => {
    passport.use(
        new JwtStrategy(
            {
                secretOrKey: process.env.JWT_SECRET,
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
            },
            (jwt_payload, next) => {
                // Verify user
                userModel.findOne({ email: jwt_payload?.email })
                    .then((user) => {
                        if (user) {
                            next(null, user);
                        }
                        else {
                            next(null, false);
                        }
                    })
                    .catch((err) => {
                        next(err);
                    })
            })
    )
}

const passportLocalConfig = (passport) => {
    passport.use(
        new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        }, userModel.authenticate())
    )
}

module.exports = { passportJwtConfig, passportLocalConfig }