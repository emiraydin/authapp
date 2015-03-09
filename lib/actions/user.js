var config = require('../../config/app');
var User = require('../../models/user');
var Email = require('../email');

// GET the homepage
exports.getIndex = function(req, res) {
  // Display the Login page with any flash message, if any
  res.render('index', {
    title: 'Emir\'s Authentication App',
    successMessage: req.flash('successMessage'),
    errorMessage: req.flash('errorMessage')
  });
};

// GET the registration page
exports.getRegistration = function(req, res){
  res.render('register', {
    title: 'Create a New Account',
    successMessage: req.flash('successMessage'),
    errorMessage: req.flash('errorMessage')
  });
};

// GET the logout page
exports.getLogout = function(req, res) {
  req.logout();
  res.redirect('/');
};

// Check if the user is authenticated
exports.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
};

// GET Homepage
exports.getHomepage = function(req, res){
  res.render('home', {
    title: 'Welcome | Logged In',
    user: req.user });
};

// GET Activate Account
exports.getActivateAccount = function(req, res) {
    var code = req.params.code;
    // Attempt activating the account with the given code
    User.activateAccount(code, function(err, user) {
      if (user) {
        // If successful, send welcome email
        Email.sendEmail(user.email, user.username, Email.messages.welcome, function(err, success) {
          if (success)
            res.render('activation', {successMessage: 'Your account has been activated. You can log in now.'});
          else
            res.render('activation', {errorMessage: 'Activation was not successful. An error occured.'});
        });
      }
    });
};

// GET Forgot Password Page
exports.getForgotPassword = function(req, res) {
  res.render('forgotpassword');
};

// POST Forgot Password Page
exports.postForgotPassword = function(req, res) {
    var email = req.body.email;
    // Reset the activation code in the database
    User.resetActivationCode(email, function(err, user) {
      if (!user)
        return res.render('forgotpassword', {errorMessage: 'An error occured. Email could not be sent.'}); 
      // Send the reset password email to the user
      Email.sendEmail(email, user.username, Email.messages.resetpassword, function(err, success) {
        if (success)
          return res.render('forgotpassword', { successMessage: 'A password reset email has been sent to the provided email.'});
      }, {activationURL: config.RESET_BASE_URL + user.activationCode});

    });
};

// GET Reset Password Page
exports.getResetPassword = function(req, res) {
    User.checkActivationCode(req.params.code, function(err, response) {
      res.render('resetpassword', {codeExists: response, resetCode: req.params.code});
    });
};

// POST Reset Password Page
exports.postResetPassword = function(req, res) {
    var code = req.body.code;
    var password = req.body.password;
    User.resetPassword(code, password, function(err, success) {
      if (success)
        res.render('resetpassword', {successMessage: 'Your password has been successfully changed.', submitted: true});
      else
        res.render('resetpassword', {errorMessage: 'An error occured. Password could not be reset.', submitted: true});      
    });
};
