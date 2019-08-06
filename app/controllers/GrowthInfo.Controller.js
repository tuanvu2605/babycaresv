var mongoose = require('mongoose');
var GrowthInfo = require('mongoose').model('GrowthInfo');
var flash    = require('connect-flash');
var Notice = require('mongoose').model('Notice');


exports.infoByBaby = function(req,res,next) {

    var _babyId = req.body['bbId'];
    // console.log("month" + _month);
    var bId =  mongoose.Types.ObjectId(_babyId);
    GrowthInfo.find({babyId : bId},function(err,info)
	{
        console.log(info);
        res.json({status : 1 , message : ["Thành công"] , data : info});
    })

}

exports.getLast = function(req,res,next) {
    GrowthInfo.findOne({}, {}, { sort: { 'created_at' : -1 } }, function(err, info) {
        console.log(info);
        res.json({status : 1 , message : ["Thành công"] , data : {weight : info["weight"] , height : info["height"]}});
      });
}


exports.addNewInfo = function(req,res,next) {

    console.log(req)
    var _weight = req.body['weight'];
    var _height =  req.body['height'];
    var _babyId = req.body['babyId'];
    var _date = req.body['date'];

    var bId =  mongoose.Types.ObjectId(_babyId);
    var notice1 = {content : "Cân nặng so với tuổi của bé Beckham đang ở ngưỡng bình thường" , _type : 1};
    var notice2 = {content : "Bé X đang cao vượt trội so với tuổi. Đây hiếm khi là một vấn đề trong tăng trưởng, trừ khi cao quá mức có thể là biểu hiện của rối loạn nội tiết, chẳng hạn do tăng tiết hormone tăng trưởng do u. Bạn nên đưa bé X đi khám nếu nghi ngờ có sự rối loạn nội tiết (nếu ba mẹ có chiều cao bình thường" , _type : 0};
    var gInfo = new GrowthInfo({
        weight : _weight ,
        height :_height ,
        babyId : bId ,
        date : _date,
        notices : [notice1,notice2]
    });
        GrowthInfo.remove({ date: _date }, function(err) {

            gInfo.save(function (err , _gInfo) {
                console.log(err)
                if (err) return handleError(err);
                req.flash('congrats', 'Cân nặng so với tuổi của bé Beckham đang ở ngưỡng bình thường');
                req.flash('warning', 'Bé X đang cao vượt trội so với tuổi. Đây hiếm khi là một vấn đề trong tăng trưởng, trừ khi cao quá mức có thể là biểu hiện của rối loạn nội tiết, chẳng hạn do tăng tiết hormone tăng trưởng do u. Bạn nên đưa bé X đi khám nếu nghi ngờ có sự rối loạn nội tiết (nếu ba mẹ có chiều cao bình thường).');
                
                res.json({status : 1 , message : ["Thành công"] , congrats : req.flash('congrats') , warning : req.flash('warning')});
            });

        });

        
}



