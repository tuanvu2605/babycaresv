

var http = require("http").Server(app);
var io = require("socket.io")(http);
var express = require(__dirname + '/config/express');
var mongoose = require('./config/mongoose');

var db = mongoose();

var app = express();

var passport = require('passport');
var flash    = require('connect-flash');
var morgan       = require('morgan');
var bodyParser   = require('body-parser');
var session      = require('express-session');

require('./config/apppassport')(passport);

app.set('port', (process.env.PORT || 3000));
// views is directory for all template files

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.get('/', function(request, response) {
  response.render('pages/home.html');
});
app.get('/blog/choconbu', function(request, response) {
  response.render('pages/ccb.html');
});
app.get('/blog/chiakhoahoctap', function(request, response) {
  response.render('pages/chiakhoahoctap.html');
});
app.get('/blog/cannang', function(request, response) {
  response.render('pages/cannang.html');
});




app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});





