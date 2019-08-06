var mongoose = require('mongoose');
var User = require('mongoose').model('User');
var Baby = require('mongoose').model('Baby');
var flash    = require('connect-flash');

exports.babyInfo = function(req,res,next) {
    // console.log(req);
    var _yourname = req.body['yourname'];
    var _name = req.body['name'];
    var _gender =  req.body['gender'];
    var _bornPlace = req.body['bornplace'];
    var _monthWhenBorn = req.body['monthwhenborn'];
    var _birthDay = req.body['birthday'];
    var _userId = req.body['userId'];
    var _relationship =  req.body['relationship'];
    var _bornWeight =  req.body['bornWeight'];
    var _bornHeight =  req.body['bornHeight'];

    var userId = mongoose.Types.ObjectId(_userId);
    // console.log(req.body)

    var baby = new Baby({ name: _name ,
                       gender : _gender ,
                       bornPlace :_bornPlace ,
                       monthWhenBorn : _monthWhenBorn ,
                       birthDay : _birthDay,
                       bornHeight: _bornHeight,
                       bornWeight : _bornWeight
                    });

    baby.save(function (err , _baby) {
        if (err) return handleError(err);
        console.log(_baby.id);
        User.findById(userId,function(err ,foundeduser)
	    {
            if (err) return handleError(err);
            var babies = foundeduser.babies;
            if (babies.length < 1) {
                foundeduser.babies = [_baby.id];
            }else{
                babies.push(_baby.id);
                foundeduser.babies = babies;

            }
            foundeduser.name = _yourname;
            foundeduser.relationship = _relationship;

            foundeduser.save(function(err , update){
                if (err) return handleError(err);
                res.json({status : 1 , message : ["Thành công"] , data : _baby} );

            });
        });
    });
}


exports.getListExpert = function(req , res , next)
{
    User.find({ isExpert : true},function(err,experts)
	{
		res.json({status : 1 , message : ["Thành công"] , data : experts});
	})
}


exports.userInfo = function(req , res , next)
{
    var _id = req.body['uid'];
    console.log(_id);
    var babyId = mongoose.Types.ObjectId(_id);

	User.findById(babyId).populate('babies').exec(function(err , user)
		{
			if (err) return handleError(err);
			res.json({status : 1 , message : ["Thành công"] , data : user});

		}) ;
}

