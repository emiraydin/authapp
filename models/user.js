var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var config = require('../config/app');
var crypto = require('crypto');

// Create the schema for user model
var userSchema = mongoose.Schema({
	username: String,
	email: String,
	password: String,
    activationCode: String,
    active: Boolean
});

// Generate hash of a password
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(config.BCRYPT_SALT_FACTOR), null);
};

// Check if a given password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// Generate activation or password reset code
userSchema.methods.generateCode = function() {
    // Hash current date with a random number to ensure uniqueness
    var current_date = (new Date()).valueOf().toString();
    var random = Math.random().toString();
    return crypto.createHash('sha1').update(current_date + random).digest('hex');
};

// Reset password
userSchema.statics.resetActivationCode = function(email, callback) {
    var User = mongoose.model('User', userSchema);
    // Find the user with the given email
    User.findOne({'email': email}, function(err, user) {
        if (err) {
            callback(err, false);
        }
        if (!user) {
            callback(err, false);
        } else {
            // If the user exists, generate a new activation code and save it
            user.activationCode = user.generateCode();
            user.save(function(err) {
                if (err) callback(err, null);
                callback(err, user);
            });            
        }
    });  
};

// Check if the given activation code exists
userSchema.statics.checkActivationCode = function(code, callback) {
    var User = mongoose.model('User', userSchema);
    User.findOne({'activationCode': code}, function(err, user) {
        if (err) callback(err, false);
        if (!user) callback(err, false);
        else callback(err, true);
    });  
};

// Reset password, given reset code and new password
userSchema.statics.resetPassword = function(code, password, callback) {
    var User = mongoose.model('User', userSchema);
    // Find the user with the given activation code
    User.findOne({'activationCode': code}, function(err, user) {
        if (err) callback(err, false);
        if (!user) {
            callback(err, false);
        } else  {
            // If the user exists, save the new given password
            user.password = user.generateHash(password);
            user.save(function(err) {
                if (err) callback(err, false);
                callback(err, true);
            });  
        }
    });
};

// Activate account given activation code
userSchema.statics.activateAccount = function(activationCode, callback) {
    var User = mongoose.model('User', userSchema);
    // Find a user with the given activation code
    User.findOne({'activationCode': activationCode}, function(err, user) {
        if (err) callback(err, false);

        if (!user) callback(err, false);

        // If the user is found and is not active and given activation code matches
        if (!user.active && user.activationCode == activationCode) {
            // Activate the user and save
            user.active = true;
            user.save(function(err) {
                if (err) callback(err, false);
                callback(err, user);
            });
        } else {
            // The user exists and is active or activation codes don't match
            callback(null, false);
        }
    });
};

// Create a new user
userSchema.statics.createUser = function(username, email, password, active, callback) {
	var User = mongoose.model('User', userSchema);
    // Create a new model with given properties
    var newUser = new User();
    newUser.username = username;
    newUser.activationCode = newUser.generateCode();
    newUser.active = active;
    newUser.email = email;
    newUser.password = newUser.generateHash(password);

    // Save the user
    newUser.save(function(err) {
        if (err)
            throw err;
        callback(null, newUser);
    });

};

module.exports = mongoose.model('User', userSchema);
