var _ = require('lodash');
var passport = require('passport');
var request = require('request');
var localStrategy = require('passport-local').Strategy;
var userService = require('../services/user');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {;
    userService.findById(id, function(err, user) {
        done(err, user);
    });
});


passport.use(new localStrategy({ usernameField: 'email' }, function(email, password, done) {
    userService.findByEmail(email.toLowerCase(), function(err, user) {
        if (!user) {
            return done(null, false, { msg: 'Email ' + email + ' not found.' });
        }
        user.comparePassword(password, function(err, isMatch) {
            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, { msg: 'Invalid email or password.' });
            }
        });
    });
}));

exports.isAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

exports.isAuthorized = function(req, res, next) {
    var provider = req.path.split('/').slice(-1)[0];
    if (_.find(req.user.tokens, { kind: provider })) {
        next();
    } else {
        res.redirect('/auth/' + provider);
    }
};
