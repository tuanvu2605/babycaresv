var mongoose = require('mongoose');
var postSchema = new mongoose.Schema(
{
	
	title :String,    
	description :String,
	thumbnail : String,
	user : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	url : String

},{timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});
module.exports = mongoose.model('Post', postSchema);