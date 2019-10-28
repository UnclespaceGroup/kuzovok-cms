var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var works = require('./routes/works')
var report = require('./routes/report')
var services = require('./routes/services')
var cors = require('cors')
const connectionConfig = require('./constants/index')
const passport = require('passport')


const whitelist = [
  'http://localhost:3000',
  'http://localhost:3002',
  'http://localhost:3003',
  'http://localhost:8060',
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};

function authenticationMiddleware () {
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/')
  }
}


var app = express()

const mysql = require("mysql2")
require('./config/passport');

const pool = mysql.createPool(connectionConfig);

app.use(passport.initialize());
app.use(cors(corsOptions))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const authenticate = passport.authenticate('jwt', { session: false })

require('./routes/auth/loginUser')(app);
require('./routes/auth/registerUser')(app);
require('./routes/auth/forgotPassword')(app);
require('./routes/auth/resetPassword')(app);
require('./routes/auth/updatePassword')(app);
require('./routes/auth/updatePasswordViaEmail')(app);
require('./routes/auth/findUsers')(app);
require('./routes/auth/deleteUser')(app);
require('./routes/auth/updateUser')(app);

works(app, pool, authenticate)
report(app, pool, authenticate)
services(app, pool, authenticate)


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
