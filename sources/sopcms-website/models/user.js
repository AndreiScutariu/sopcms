var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');

function User(user) {
    this.id = user.Id;
    this.name = user.Name;
    this.email = user.Email;
    this.password = user.Password;
    this.location = user.Location;
    this.website = user.Website;
}

User.prototype.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        cb(err, isMatch);
    });
};

User.prototype.encryptPassword = function (user, next) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            user.password = hash;
            next(user);
        });
    });
}

User.prototype.gravatar = function(size) {
    if (!size) {
        size = 200;
    }
    if (!this.Email) {
        return 'https://gravatar.com/avatar/?s=' + size + '&d=retro';
    }
    var md5 = crypto.createHash('md5').update(this.email).digest('hex');
    return 'https://gravatar.com/avatar/' + md5 + '?s=' + size + '&d=retro';
};

module.exports = User;
