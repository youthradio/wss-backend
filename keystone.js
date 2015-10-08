// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').load();

// Require keystone
var keystone = require('keystone');
var handlebars = require('express-handlebars');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({

	'name': 'wss-backend',
	'brand': 'wss-backend',

	'sass': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'hbs',

	'custom engine': handlebars.create({
		layoutsDir: 'templates/views/layouts',
		partialsDir: 'templates/views/partials',
		defaultLayout: 'default',
		helpers: new require('./templates/views/helpers')(),
		extname: '.hbs'
	}).engine,

	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User'
});

// Load your project's Models
keystone.import('models');

// CORS
keystone.set('cors allow origin', true);

// Google Map Creds
keystone.set(process.env.GOOGLE_SERVER_KEY, process.env.GOOGLE_BROWSER_KEY);

// S3 settings:
keystone.set('s3 config', {
	bucket: process.env.S3_BUCKET,
	key: process.env.S3_KEY,
	secret: process.env.S3_SECRET,
	// region: process.env.S3_REGION,
	'default headers':  {
    'x-amz-meta-X-Default-Header': 'Custom Default Value'
  }
});


// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js

keystone.set('locals', {
	_: require('underscore'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable
});

// Load your project's Routes

keystone.set('routes', require('./routes'));

// Configure the navigation bar in Keystone's Admin UI

keystone.set('nav', {
	'users': 'users',
	'posts' : 'posts'
});

// Start Keystone to connect to your database and initialise the web server

keystone.start();
