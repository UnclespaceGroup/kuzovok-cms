var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var works = require('./routes/works')
var report = require('./routes/report')
var services = require('./routes/services')
var cors = require('cors')
const connectionConfig = require('./constants/index')
const auth = require('./routes/auth')
const passport = require('passport')



var app = express()

const mysql = require("mysql2")
require('./config/passport');

const pool = mysql.createPool(connectionConfig);

app.use(passport.initialize());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors())

require('./routes/auth/loginUser')(app);
require('./routes/auth/registerUser')(app);
require('./routes/auth/forgotPassword')(app);
require('./routes/auth/resetPassword')(app);
require('./routes/auth/updatePassword')(app);
require('./routes/auth/updatePasswordViaEmail')(app);
require('./routes/auth/findUsers')(app);
require('./routes/auth/deleteUser')(app);
require('./routes/auth/updateUser')(app);

works(app, pool)
report(app, pool)
services(app, pool)
auth(app, pool)

require('./routes/auth')

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
});


app.listen(3003, function(){
  console.log("Сервер ожидает подключения...");
});

module.exports = app;
