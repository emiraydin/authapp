module.exports = function(passport) {

	var User = require('../../models/user');
	// User serialization & deserialization
	passport.serializeUser(function(user, done) {
	  done(null, user._id);
	});
	passport.deserializeUser(function(id, done) {
	  User.findById(id, function(err, user) {
	    done(err, user);
	  });
	});

	// Sign in and sign up strategies
	require('./signin')(passport);
	require('./signup')(passport);
	require('./facebook')(passport);
	require('./google')(passport);

};
