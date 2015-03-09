module.exports = function(passport){

  var router = require('express').Router();
  var userActions = require('../lib/actions/user');
  var authActions = require('../lib/actions/auth')(passport);

  // GET Login page
  router.get('/', userActions.getIndex);
 
  // POST Login Authenticate
  router.post('/login', authActions.postLogin);
 
  // GET Registration Page
  router.get('/register', userActions.getRegistration);
 
  // POST Registration Authenticate
  router.post('/signup', authActions.postSignup);

  // GET Logout
  router.get('/logout', userActions.getLogout);

  // GET Facebook Login Authenticate & Callback
  router.get('/auth/facebook', authActions.getFacebookAuth);
  router.get('/auth/facebook/callback', authActions.getFacebookCallback);

  // GET Google Login Authenticate & Callback
  router.get('/auth/google', authActions.getGoogleAuth);
  router.get('/auth/google/callback', authActions.getGoogleCallback);

  // GET Homepage
  router.get('/home', userActions.isLoggedIn, userActions.getHomepage);

  // GET Activate Account
  router.get('/user/activate/:code', userActions.getActivateAccount);

  // GET Forgot Password Page & POST the form
  router.get('/user/forgotpassword', userActions.getForgotPassword);
  router.post('/user/forgotpassword', userActions.postForgotPassword);

  // GET Reset Password From Email & POST the form
  router.get('/password/reset/:code', userActions.getResetPassword);
  router.post('/password/reset', userActions.postResetPassword);
  
  return router;
  
};
