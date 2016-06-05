var needle = require('needle');
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');

var userModel = require('./../models/user');

var host = 'http://localhost:9001/api/users'

function encryptPassword(user, next) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            user.password = hash;
            next(user);
        });
    });
}

function getUserByEmail(email, callback) {
    var getCbk = function (err, resp) {
        if(resp == undefined) {
            callback(err, undefined);
        };
        callback(err, new userModel(resp.body));
    }
    needle.get(host + '?email=' + email, getCbk);
}

function getUserById(id, callback) {
    var getCbk = function (err, resp) {
        if(resp === undefined && resp.body === undefined) {
            callback(err, undefined);
        };
        callback(err, new userModel(resp.body));
    }
    needle.get(host + '/' + id, getCbk);
}

function saveUser(user, callback) {
    encryptPassword(user, function(user) {
        var postCbk = function (err, resp, body) {
            callback(err, new userModel(resp.body));
        }
        needle.post(host, user, postCbk);
    });
}

function updateUser(id, user, callback) {
    var cbk = function(err, resp) {
        callback(err);
    };
    needle.put(host + '/' + id, user, cbk);
}

function deleteUser(id, callback) {
    var cbk = function(err, resp) {
        callback(err);
    };
    needle.delete(host + '/' + id, null, cbk);
}

var UserService = {
    findByEmail: getUserByEmail,
    findById: getUserById,
    save: saveUser,
    update: updateUser,
    remove: deleteUser
}

module.exports = UserService
