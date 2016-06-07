var _ = require('lodash');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var userService = require('../services/user');
var tokenService = require('../services/token');

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    userService.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(new localStrategy({ usernameField: 'email' }, function (email, password, done) {
    userService.findByEmail(email.toLowerCase(), function (err, user) {
        if (!user) {
            return done(null, false, { msg: 'Email ' + email + ' not found.' });
        }
        user.comparePassword(password, function (err, isMatch) {
            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, { msg: 'Invalid email or password.' });
            }
        });
    });
}));

exports.isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated() && req.user.email !== undefined) {
        return next();
    }
    res.redirect('/login');
};

exports.isAuthorized = function (req, res, next) {

    if (!req.isAuthenticated()) {
        req.flash('info', { msg: 'You need to login first.' });
        res.redirect('/login');
    }

    if (tokenService.validate(req.session.token, function (err, resp) {
        if (resp.statusCode == 200) {
            console.log("existing valid token: " + req.session.token)
            next()
        } else {
            tokenService.create(req.user.email, req.user.password, function (t_err, resp) {
                console.log("create new token: " + resp.body.Value)
                req.session.token = resp.body.Value
                next()
            })
        }
    }));
};
