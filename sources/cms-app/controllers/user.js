var _ = require('lodash');
var async = require('async');
var crypto = require('crypto');
var passport = require('passport');

var userService = require('../services/user');

exports.getLogin = function (req, res) {
    if (req.user) {
        return res.redirect('/');
    }
    res.render('account/login', {
        title: 'Login'
    });
};

exports.postLogin = function (req, res, next) {
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('password', 'Password cannot be blank').notEmpty();
    req.sanitize('email').normalizeEmail({ remove_dots: false });

    var errors = req.validationErrors();

    if (errors) {
        req.flash('errors', errors);
        return res.redirect('/login');
    }

    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            req.flash('errors', info);
            return res.redirect('/login');
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            req.flash('success', { msg: 'Success! You are logged in.' });
            res.redirect(req.session.returnTo || '/');
        });
    })(req, res, next);
};

exports.logout = function (req, res) {
    req.logout();
    res.redirect('/');
};

exports.getSignup = function (req, res) {
    if (req.user) {
        return res.redirect('/');
    }
    res.render('account/signup', {
        title: 'Create Account'
    });
};

exports.postSignup = function (req, res, next) {
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('password', 'Password must be at least 4 characters long').len(4);
    req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);
    req.sanitize('email').normalizeEmail({ remove_dots: false });

    var errors = req.validationErrors();

    if (errors) {
        req.flash('errors', errors);
        return res.redirect('/signup');
    }

    var user = {
        email: req.body.email,
        password: req.body.password
    };

    userService.save(user, function (err, user) {
        if (err) {
            return next(err);
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            res.redirect('/');
        });
    });
};

exports.getAccount = function (req, res) {
    res.render('account/profile', {
        title: 'Account Management'
    });
};

exports.postUpdateProfile = function (req, res, next) {
    req.assert('email', 'Please enter a valid email address.').isEmail();
    req.sanitize('email').normalizeEmail({ remove_dots: false });

    var errors = req.validationErrors();

    if (errors) {
        req.flash('errors', errors);
        return res.redirect('/account');
    }

    userService.findById(req.user.id, function (err, user) {
        if (err) {
            return next(err);
        }

        user.email = req.body.email || '';
        user.name = req.body.name || '';
        user.location = req.body.location || '';
        user.website = req.body.website || '';
        
        userService.update(req.user.id, user, function (err) {
            if (err) {
                if (err.code === 11000) {
                    req.flash('errors', { msg: 'The email address you have entered is already associated with an account.' });
                    return res.redirect('/account');
                } else {
                    return next(err);
                }
            }
            req.flash('success', { msg: 'Profile information updated.' });
            res.redirect('/account');
        });
    });
};

exports.postDeleteAccount = function (req, res, next) {
    userService.remove(req.user.id, function (err) {
        if (err) {
            return next(err);
        }
        req.logout();
        req.flash('info', { msg: 'Your account has been deleted.' });
        res.redirect('/');
    });
};