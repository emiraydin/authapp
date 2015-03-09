var LocalStrategy = require('passport-local').Strategy;
var config = require('../../config/app');
var User = require('../../models/user');
var Email = require('../email');

module.exports = function(passport) {

    passport.use('signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, email, password, done) {

        process.nextTick(function() {

            // find a user whose email is the same as the forms email
            User.findOne({ 'email' :  email }, function(err, user) {
                if (err)
                    return done(err);
                // check the user exists
                if (user) {
                    return done(null, false, req.flash('errorMessage', 'This email already has an account.'));
                } else {
                    // Create a new user if the user does not exist
                    User.createUser(req.body.username, email, password, false, function(err, newUser) {
                        if (err) return done(err);
                        // Send an activation email to the user
                        Email.sendEmail(newUser.email, newUser.username, Email.messages.confirmation, function(err, success) {
                            if (err) return done(err);
                            if (success) return done(null, newUser, req.flash('successMessage', 'User successfully created. Please check your email for confirmation link.'));                            
                        }, {activationURL: config.ACTIVATION_BASE_URL + newUser.activationCode});

                    });
                }
            });

        });

    }));

};
