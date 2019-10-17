var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var getTariffs = require('./routes/getTariffs')
var works = require('./routes/works')
var cors = require('cors')


var app = express();

const mysql = require("mysql2");

const pool = mysql.createPool({
  connectionLimit: 5,
  host: "unclespace.beget.tech",
  user: "unclespace_test",
  database: "unclespace_test",
  password: "Rooom131!"
});

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors())

getTariffs(app, pool)
works(app, pool)

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
