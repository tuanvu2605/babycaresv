
var mongoose = require('mongoose');

var noticeSchema = new mongoose.Schema(
{
	type : Number,
    content : String
    
},{timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

module.exports = mongoose.model('Notice', noticeSchema);