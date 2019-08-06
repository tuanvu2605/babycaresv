


var users = require('../../app/controllers/Users.Controller');
var growthInfo = require('../../app/controllers/GrowthInfo.Controller');
var posts = require('../../app/controllers/Posts.Controller');
var tasks = require('../../app/controllers/NutritionTask.Controller');
var push = require('../../app/controllers/Push');
var flash    = require('connect-flash');
const jwt = require('jsonwebtoken');

// app/routes.js
module.exports = function(app, passport) {

    app.post('/tasks/bymonth',tasks.taskByMonth);
    app.post('/tasks/create',tasks.create);
    app.post('/growthinfo/addnew',growthInfo.addNewInfo);
    app.post('/growthinfo/all',growthInfo.infoByBaby);
    app.get('/user/experts',users.getListExpert);
    app.get('/growthinfo/lastginfo',growthInfo.getLast);
    app.post('/user/info',users.userInfo);
    app.get('/post/all',posts.getAll);
    app.get('/push',push.push);
    app.post('/post/create',posts.createBlog);
    app.post('/user/babyinfo',users.babyInfo);
    

    app.get('/', function(req, res) {
        res.render('index.ejs'); // 
    });

    app.get('/loginError', function(req, res) {
        var responseJson = {
            'status' : 0 ,
            'message' : req.flash('_userMess')
        }
        console.log(responseJson);
        res.send(responseJson);
    });
    
   app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile',
        failureRedirect : '/loginError', 
        failureFlash : true
    }));

    app.get('/signupError', function(req, res) {
        console.log(req);
        var responseJson = {
            'status' : 0 ,
            'message' : req.flash('_userMess')
        }
        console.log(responseJson);
        res.send(responseJson);
    });

    // Xử lý form đăng ký ở đây
   app.post('/register', passport.authenticate('local-signup', {
        successRedirect : '/profile', // Điều hướng tới trang hiển thị profile
        failureRedirect : '/signupError', // Trở lại trang đăng ký nếu lỗi
        failureFlash : true 
    }));

    app.get('/profile', isLoggedIn, function(req, res) {
        console.log(req.user);
        const token = jwt.sign(req.user.toJSON(), 'your_jwt_secret');
        console.log(token);
        var responseJson = {
            'status' : 1 ,
            'message' : req.flash('_userMess'),
            'token' : token,
            'data' : req.user
        }
        res.send(responseJson);

    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

       //This is a protected route 
    app.get('/user/data', checkToken, (req, res) => {
        //verify the JWT token generated for the user
        jwt.verify(req.token, 'your_jwt_secret', (err, authorizedData) => {
            if(err){
                //If error send Forbidden (403)
                console.log('ERROR: Could not connect to the protected route');
                res.sendStatus(403);
            } else {
                //If token is successfully verified, we can send the autorized data 
                res.json({
                    message: 'Successful log in',
                    authorizedData
                });
                console.log('SUCCESS: Connected to protected route');
            }
        })
    });

};

//Check to make sure header is not undefined, if so, return Forbidden (403)
const checkToken = (req, res, next) => {
    const header = req.headers['authorization'];

    if(typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];

        req.token = token;
        next();
    } else {
        //If header is undefined return Forbidden (403)
        res.sendStatus(403)
    }
}

// Hàm được sử dụng để kiểm tra đã login hay chưa
function isLoggedIn(req, res, next) {
    // if (req.isAuthenticated())
        return next();
    // res.redirect('/');
}