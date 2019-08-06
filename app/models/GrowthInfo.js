
var mongoose = require('mongoose');

var growthInfoSchema = new mongoose.Schema(
{
	weight : Number,
	height : Number,
	babyId : { type: mongoose.Schema.Types.ObjectId, ref: 'Baby' },
	date : { type: String, required: true },
	notices :  [{content : String, _type : Number}]

},{timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});
module.exports = mongoose.model('GrowthInfo', growthInfoSchema);