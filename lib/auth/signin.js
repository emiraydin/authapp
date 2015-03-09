var LocalStrategy = require('passport-local').Strategy;
var User = require('../../models/user');

module.exports = function(passport) {

    passport.use('signin', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {

        // Check if a user exists with the given email
        User.findOne({'email':  email }, function(err, user) {
            if (err)
                return done(err);
            if (!user)
                return done(null, false, req.flash('errorMessage', 'No user found. Please sign up.'));
            // If the user is found but the password is wrong
            if (!user.validPassword(password))
                return done(null, false, req.flash('errorMessage', 'Wrong password. Please try again.'));
            // If the account is not yet activated
            if (!user.active)
                return done(null, false, req.flash('errorMessage', 'Please activate your account by clicking the confirmation link we\'ve sent to your email.'));
            // All is well, return the user
            return done(null, user);
        });

    }));

};
