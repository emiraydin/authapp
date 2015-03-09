var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Set up the MongoDB connection
var mongoose = require('mongoose');
var config = require('./config/app');
mongoose.connect(config.MONGO_DB_URI);

// Express and view engine set up
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Enable gzip compression
var compress = require('compression');
app.use(compress());

// Enable flash messages
var flash = require('connect-flash');
app.use(flash());

// Configure Passport and sessions
var passport = require('passport');
var expressSession = require('express-session');
app.use(expressSession({secret: config.EXPRESS_SESSION_SECRET,
saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());
require('./lib/auth/init')(passport);

// Express options
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Include routes
var routes = require('./config/routes')(passport);
app.use('/', routes);

// Error handlers
require('./config/error')(app);

module.exports = app;
