module.exports = function(passport) {

	// POST Login Authenticate
	var postLogin = passport.authenticate('signin', {
	    successRedirect: '/home',
	    failureRedirect: '/',
	    failureFlash : true 
	});

	// POST Registration Authenticate
	var postSignup = passport.authenticate('signup', {
	    successRedirect: '/',
	    failureRedirect: '/register',
	    failureFlash : true
	});

	// GET Facebook Login Authenticate & Callback
	var getFacebookAuth = passport.authenticate('facebook', { scope: 'email' });
	var getFacebookCallback = passport.authenticate('facebook', {
	    successRedirect: '/home',
	    failureRedirect: '/',
	    failureFlash: true
	});

	// GET Google Login Authenticate & Callback
	var getGoogleAuth = passport.authenticate('google', { scope: ['profile','email'] });
	var getGoogleCallback = passport.authenticate('google', {
	    successRedirect: '/home',
	    failureRedirect: '/',
	    failureFlash: true
	});

	return {
		postLogin: postLogin,
		postSignup: postSignup,
		getFacebookAuth: getFacebookAuth,
		getFacebookCallback: getFacebookCallback,
		getGoogleAuth: getGoogleAuth,
		getGoogleCallback: getGoogleCallback
	};

};
