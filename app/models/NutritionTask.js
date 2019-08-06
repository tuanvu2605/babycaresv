
var mongoose = require('mongoose');

var nutritionTaskSchema = new mongoose.Schema(
{
	// userId : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	month : Number,
	content : String,
	note : String
	

},{timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

module.exports = mongoose.model('NutritionTask', nutritionTaskSchema);