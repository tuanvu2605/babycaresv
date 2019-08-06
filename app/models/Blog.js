var mongoose = require('mongoose');
var blogSchema = new mongoose.Schema(
{
	
	title :String,    
	content :String,
	userId : String

},{timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});
module.exports = mongoose.model('Blog', blogSchema);