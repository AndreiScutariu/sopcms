var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport'),
    identity3Strategy = require('passport-identityserver3').Strategy;

NODE_TLS_REJECT_UNAUTHORIZED=0

passport.use(new identity3Strategy('sopcms-demo', {
    configuration_endpoint: 'https://localhost:44333/.well-known/openid-configuration',
    client_id: 'sopcms',
    client_secret: '61B754C541BBCFC6A45A9E9EC5E47D8702B78C29',
    callback_url: '/login/callback',
    scopes: ['profile'],
    transformIdentity: function (identity) {
        return identity;
    },
    onEndSession: function (req, res) {
    }
}));

passport.serializeUser(function (user, done) {
    console.log('In Serializer');
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    console.log('In DeSerializer');
    done(null, user);
});

//Add middlewares
app.use(cookieParser());

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', function (req, res) {
    res.send('hello world');
});
app.get('/secure', ensureAuthenticated, function (req, res) {
    res.send('you have access to secured resources');
});
app.get('/login', passport.authenticate('passport-identityserver3'));

app.post('/login/callback', passport.authenticate('passport-identityserver3'),
    function (req, res) {
        res.redirect('/secure');
    }
);
app.listen(3000, function () {
    console.log('Server started at port 3000');
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

var User = function (user) {
    this.id = user['http://schemas.microsoft.com/ws/2008/06/identity/claims/primarysid'];
    this.email = user.email;
};