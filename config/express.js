
var config = require('./config'),
	express = require('express');
	morgan = require('morgan');
	compress = require('compression'),
	bodyParser = require('body-parser'), 
	methodOverride = require('method-override'),
	esession = require('express-session');

var passport = require('passport');
var path = require('path');
var appDir = path.dirname(require.main.filename);
var flash    = require('connect-flash');

// express.js
// config enviroment for server side	
module.exports = function()
{
	var app = express();

	if (process.env.NODE_ENV === 'development') {

		app.use(morgan('dev'));
	}else if(process.env.NODE_ENV === 'production')
	{
		app.use(compress());
	}

	app.use(bodyParser.urlencoded({

		extended:true
	}));

	app.use(bodyParser.json());
	app.use(methodOverride());
	app.use(esession({
	  secret: 'keyboard cat',
	  resave: true,
	  saveUninitialized: true,
	  cookie: { secure: false }
	}));
	app.set('views','./app/views');
	app.set('view engine','ejs');
	app.use(flash());
	app.use(passport.initialize());
	app.use(passport.session());
	app.use('/uploads', express.static(appDir + '/uploads'));
	console.log(appDir);
	require('../app/routes/routes.js')(app,passport);
	require('../app/routes/common.js')(app);



	return app;
};
