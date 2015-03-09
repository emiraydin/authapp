var repl = require("repl");
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// app specific modules
var User = require("../models/user");
var Email = require('../lib/email');
 
// connect to the database
mongoose.connect(require('../config/app').MONGO_DB_URI, function(err){
  if (err){ throw err; }
 
  var envName = process.env.NODE_ENV || "dev";
 
  // open the repl session
  var replServer = repl.start({
    prompt: "console (" + envName + ") > ",
  });
 
  var exit = function() { process.exit(0); };

  // attach my modules to the repl context
  replServer.context.mongoose = mongoose;
  replServer.context.bcrypt = bcrypt;
  replServer.context.User = User;
  replServer.context.Email = Email;
  replServer.context.exit = exit;
  
});
