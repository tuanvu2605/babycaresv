
var mongoose = require('mongoose');

var babySchema = new mongoose.Schema(
{
	// userId : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	name : String,
	gender : Number,
	bornPlace : String,
	monthWhenBorn : Number,
	bornWeight : Number,
	bornHeight : Number,
	birthDay : String
	

},{timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

module.exports = mongoose.model('Baby', babySchema);