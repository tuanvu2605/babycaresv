var mongoose = require('mongoose');
var Post = require('mongoose').model('Post');
var Blog = require('mongoose').model('Blog');
var flash    = require('connect-flash');

exports.getAll = function(req , res , next)
{
    Post.find({},function(err,posts)
	{
		res.json({status : 1 , message : ["Thành công"] , data : posts});
	})
}

exports.createBlog = function(req , res , next){
console.log(req)
	var _title = req.body['title'];
	var _content = req.body['content'];
	var _userId = req.body['userId'];

	var blog = new Blog({
		title : _title,
		content : _content,
		userId : _userId
	})
	blog.save(function(err , blog){
		console.log(err)
		if (err) return handleError(err);
		res.json({status : 1 , message : ["Thành công"] });
	})
}