const GitHubStrategy = require('passport-github2')
const passport = require('passport')
const User = require('../models/User')

const initializePassport = () => {

    passport.serializeUser ((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser (async (id, done) => {
        let user = await User.findById (id);
        done ( null, user);
    })
}

module.exports = initializePassport