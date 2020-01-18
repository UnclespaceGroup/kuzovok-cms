var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
const bodyParser = require('body-parser')
const passport = require('passport')
const ModelCRUD = require('./routes/ModelCRUD')
const { Paper } = require('./sequelize')
const helmet = require('helmet')
const path  = require("path");
var session = require('express-session')

var app = express()

// const whitelist = [
//   'http://cms.mdf-center.ru/',
//   'http://test.mdf-center.ru/',
//   'http://localhost:3000',
//   'http://localhost:3003',
// ];
// const corsOptions = {
//   origin: (origin, callback) => {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   optionsSuccessStatus: 200,
// };

require('./config/passport');
app.use(cors())
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')))

require('./routes/auth/loginUser')(app);
require('./routes/auth/registerUser')(app);
require('./routes/auth/forgotPassword')(app);
require('./routes/auth/resetPassword')(app);
require('./routes/auth/updatePassword')(app);
require('./routes/auth/updatePasswordViaEmail')(app);
require('./routes/auth/findUsers')(app);
require('./routes/auth/deleteUser')(app);
require('./routes/auth/updateUser')(app);

require('./routes/fileUpload')(app, passport, __dirname);

ModelCRUD(app, '/paper/', Paper, passport, __dirname)

require('./routes/works')(app, passport, __dirname)
require('./routes/services')(app, passport, __dirname)
require('./routes/report')(app, passport, __dirname)
require('./routes/pages')(app, passport, __dirname)

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
