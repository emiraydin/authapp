var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var config = require('../../config/app');
var User = require('../../models/user');
var Email = require('../email');

module.exports = function(passport) {

	passport.use('google', new GoogleStrategy({
		passReqToCallback: true,
		clientID: config.GOOGLE_CLIENT_ID,
		clientSecret: config.GOOGLE_CLIENT_SECRET,
		callbackURL: config.GOOGLE_CALLBACK_URL
	}, function(req, token, refreshToken, profile, done) {

		process.nextTick(function() {

			var username = profile.displayName;
			var email = profile.emails[0].value;

			// Check if a user exists with the given email
			User.findOne({'email': email}, function(err, user) {

				if (err)
					return done(err);

				if (!user) {
					// Create a new user if user is not found
					User.createUser(username, email, token, true, function(err, newUser) {
						if (err) return done(err);
						if (!newUser)
							return done(null, false, req.flash('errorMessage', 'Could not create the user.'));
						// Send a welcome email to the newly created user
						Email.sendEmail(email, username, Email.messages.welcome,
							function(err, success) {
							if (err) return done(err);
							if (success) return done(null, newUser);							
						});

					});
				} else {
					return done(null, user);
				}

			});

		});

	}));

};