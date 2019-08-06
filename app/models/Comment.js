
var mongoose = require('mongoose');
var commentSchema = new mongoose.Schema(
{
	
	comment :String,    
	url :String,
	user : { type: mongoose.Schema.Types.ObjectId, ref: 'User' }

},{timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});
module.exports = mongoose.model('Comment', commentSchema);