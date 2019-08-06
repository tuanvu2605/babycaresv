'use strict';

// Load the module dependencies
var	config = require('./config'),
	mongoose = require('mongoose');

// Define the Mongoose configuration method
module.exports = function() {

	mongoose.Promise = global.Promise;
	var db = mongoose.connect('mongodb://localhost/bbc-service',{ useNewUrlParser: true });
	
	require('../app/models/Notice.js');
	require('../app/models/User.js');
	require('../app/models/Comment.js');
	require('../app/models/Post.js');
	require('../app/models/Baby.js');
	require('../app/models/GrowthInfo.js');
	require('../app/models/NutritionTask.js');
	require('../app/models/Blog.js');
	
	
	
	return db;
}