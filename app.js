var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require("fs");
var xlsx = require("node-xlsx");

var index = require('./routes/index');
var users = require('./routes/users');
var test = require('./routes/test');

var filePath = "d:\\学习\\血透机\\零部件统计.xlsx";
var obj = xlsx.parse(filePath);
var excelObj = obj[1].data;
var parts = [];
var i = 2;
while(i<excelObj.length){
    parts.push(excelObj[i][1]);
    i++;
}
var app = express();
app.locals.parts = parts;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/test',test);
app.get('/parts',function(req,res){
    res.json(JSON.stringify(app.locals.parts));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
