authapp
===
Simple authentication app built with Node.js

## Setup Instructions

To run this application, `config/app.js` needs to be created with below contents. Fill in the variables with your information accordingly.

```javascript

var HOST_BASE_URL = 'http://example.com';
module.exports = {
	'MONGO_DB_URI': 'mongodb://user:password@example.com:34534/database',
	'BCRYPT_SALT_FACTOR': 8,
	'EXPRESS_SESSION_SECRET': 'mySecret',
	'FACEBOOK_CALLBACK_URL': HOST_BASE_URL + '/auth/facebook/callback',
	'FACEBOOK_APP_ID': 'INSERT_YOUR_FACEBOOK_APP_ID_HERE',
	'FACEBOOK_APP_SECRET': 'INSERT_YOUR_FACEBOOK_APP_SECRET_HERE',
	'GOOGLE_CALLBACK_URL': HOST_BASE_URL + '/auth/google/callback',
	'GOOGLE_CLIENT_ID': 'INSERT_YOUR_GOOGLE_CLIENT_ID_HERE',
	'GOOGLE_CLIENT_SECRET': 'INSERT_YOUR_GOOGLE_CLIENT_SECRET_HERE',	
	'MANDRILL_API_KEY': 'INSERT_YOUR_MANDRILL_API_KEY_HERE',
	'MANDRILL_FROM_EMAIL': 'user@example.com',
	'ACTIVATION_BASE_URL': HOST_BASE_URL + '/user/activate/',
	'RESET_BASE_URL': HOST_BASE_URL + '/password/reset/'
};

```

## How To Run

* After cloning this repository, `cd` into it and run `npm install` command.
* Then, you can run `npm start` command to run the server.
* Finally, you can access the site on your browser at http://localhost:3000


## Demo

A running demo is deployed at http://pure-garden-7297.herokuapp.com/


## Tools Used
* **Web Application framework:** [Express.js](http://expressjs.com/)
* **Front-end development framework:** [Semantic UI](http://semantic-ui.com/)
* **Authentication middleware:** [Passport](http://passportjs.org/)
* **Template Engine:** [Jade](http://jade-lang.com/)
* **Email Delivery Service:** [Mandrill](http://www.mandrill.com/)
* **Object Modeling for MongoDB database:** [Mongoose](http://mongoosejs.com/)


## Further Details

* The design is responsive - works just as well for mobile
* Users signed in through Facebook & Google don't need to confirm identity via confirmation email because Facebook & Google already confirms identity via email

