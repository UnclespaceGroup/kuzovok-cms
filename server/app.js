var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
const bodyParser = require('body-parser')
const passport = require('passport')
const ModelCRUD = require('./routes/ModelCRUD')
const { Work, Report } = require('./sequelize')
const helmet = require('helmet')

var app = express()

require('./config/passport');
app.use(cors())
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());
app.use(passport.initialize());


require('./routes/auth/loginUser')(app);
require('./routes/auth/registerUser')(app);
require('./routes/auth/forgotPassword')(app);
require('./routes/auth/resetPassword')(app);
require('./routes/auth/updatePassword')(app);
require('./routes/auth/updatePasswordViaEmail')(app);
require('./routes/auth/findUsers')(app);
require('./routes/auth/deleteUser')(app);
require('./routes/auth/updateUser')(app);

ModelCRUD(app, '/work/', Work, passport)
ModelCRUD(app, '/report/', Report, passport)

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
