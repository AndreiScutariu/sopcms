var needle = require('needle');

var host = 'http://localhost:9001/api/token'

function createToken(email, password, next) {
    var cbk = function(err, resp) {
        next(err, resp);
    }
    needle.post(host, {email: email, password: password}, cbk);
}

function isValid(token, next) {
    var cbk = function(err, resp) {
        next(err, resp);
    }
    needle.get(host + '/' + token, cbk);
}

var tokenService = {
    create: createToken,
    validate: isValid
}

module.exports = tokenService