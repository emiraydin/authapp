var mandrill = require('mandrill-api/mandrill');
var config = require('../config/app');
var mandrillClient = new mandrill.Mandrill(config.MANDRILL_API_KEY);

// All types of email content is stored within this object
exports.messages = {
	// Welcome email template
	welcome: {
	    "message": {
	        "from_email": config.MANDRILL_FROM_EMAIL,
	        "to":[{"email": "", "name": ""}],
	        "subject": "Welcome: Emir's Authentication App",
	        "text": "Dear {username},\nWelcome to Emir's Authentication App!",
	        "html": "Dear {username},<br />Welcome to Emir's Authentication App!"
	    }
	},
	// Confirm account email template
	confirmation: {
	    "message": {
	        "from_email": config.MANDRILL_FROM_EMAIL,
	        "to":[{"email": "", "name": ""}],
	        "subject": "Please Confirm Your Account: Emir's Authentication App",
	        "text": "Dear {username},\nWelcome to Authentication App! Click here to confirm your account: {activationURL}",
	        "html": "Dear {username},<br />Welcome to Authentication App! Click here to confirm your account: {activationURL}"
	    }
	},
	// Reset password email template
	resetpassword: {
	    "message": {
	        "from_email": config.MANDRILL_FROM_EMAIL,
	        "to":[{"email": "", "name": ""}],
	        "subject": "Reset Your Password: Emir's Authentication App",
	        "text": "Dear {username},\nClick here to reset your password: {activationURL}",
	        "html": "Dear {username},<br />Click here to reset your password: {activationURL}"
	    }
	}	
};

// Process the message i.e. fill it with given options
var processMessage = function(message, options) {
	// If activation URL is given as an option, fill the template
	if (options.activationURL) {
		message["message"]["text"] = message["message"]["text"].replace("{activationURL}", options.activationURL);
		message["message"]["html"] = message["message"]["html"].replace("{activationURL}", options.activationURL);
	}

	// Fill the template with given email and name
	message["message"]["to"][0]["email"] = options.email;
	message["message"]["to"][0]["name"] = options.name;
	message["message"]["text"] = message["message"]["text"].replace("{username}", options.name);
	message["message"]["html"] = message["message"]["html"].replace("{username}", options.name);

	return message;

};

// Send email to provided email & name with given message object
exports.sendEmail = function(toEmail, toName, message, callback, options) {

	// Process the message with options
	var options = options || {};
	options.email = toEmail;
	options.name = toName;
	var processedMessage = processMessage(message, options);

	// Send the email and call the callback
	mandrillClient.messages.send(processedMessage, function(result) {
	    if (result[0].status === 'sent')
	    	callback(null, true);
	    else
	    	callback(true, false);
	}, function(e) {
	    console.log('A Mandrill error occurred: ' + e.name + ' - ' + e.message);
	});

};
