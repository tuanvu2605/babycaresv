var mongoose = require('mongoose');
var NutritionTask = require('mongoose').model('NutritionTask');
var flash    = require('connect-flash');

exports.taskByMonth = function(req,res,next) {

    // var _month = req.body['month'];
    // console.log("month" + _month);
    NutritionTask.find({month : 6},function(err,tasks)
	{
        console.log(tasks);
        res.json({status : 1 , message : ["Thành công"] , data : tasks});
    })

}
exports.create = function(req,res,next) {

    var _month = req.body['month'];
    var _note = req.body['note'];
    var _content = req.body['content'];
    console.log("month" + _month);
    var task = new NutritionTask({ 
        month: _month ,
        note : _note ,
        content :_content});

    task.save(function (err , _baby) {
        console.log(_baby)
    })
}