var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var works = require('./routes/works')
var report = require('./routes/report')
var cors = require('cors')
const connectionConfig = require('./constants/index')


var app = express();

const mysql = require("mysql2");

const pool = mysql.createPool(connectionConfig);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors())

works(app, pool)
report(app, pool)

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
});


app.listen(3002, function(){
  console.log("Сервер ожидает подключения...");
});

module.exports = app;
