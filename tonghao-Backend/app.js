var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');




var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const bodyParser = require('body-parser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


//让中间件中的代码在应用程序启动时就进行
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//路由重定向
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', require('./routes/login')); // changed
app.use('/registry', require('./routes/registry')); // openid check
app.use('/postPosting', require('./routes/postPosting'))
app.use('/postActivity', require('./routes/postActivity'))
app.use('/deleteSinglePost', require('./routes/deleteSinglePost'))
app.use('/deleteSingleActivity', require('./routes/deleteSingleActivity'))
app.use('/getAllActivity', require('./routes/getAllActivity'))
app.use('/getAllPosting', require('./routes/getAllPosting'))
app.use('/getActivityByOpenid', require('./routes/getActivityByOpenid'))
app.use('/getPostByOpenid', require('./routes/getPostByOpenid'))
app.use('/getSingleActivity', require('./routes/getSingleActivity'))
app.use('/getSinglePosting', require('./routes/getSinglePosting'))
app.use('/getPostByCategory', require('./routes/getPostByCategory'))
app.use('/getActivityByCategory', require('./routes/getActivityByCategory'))


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
