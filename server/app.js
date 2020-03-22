var express = require('express');
var cors = require('cors')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser')
const passport = require('passport')
const helmet = require('helmet')
const path  = require("path");
const { Test, Paper, Slide, Data, Card, Service, Work, Report, Contact } = require('./sequelize')
const routeFactory = require('./routes/routeFactory')

var app = express()

app.use(cors())

require('./config/passport');
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());

app.use(passport.initialize());

app.use(express.static(path.join(__dirname, 'public')))

const routeFactoryData = {
  app,
  passport,
  rootDirectory: __dirname,
}

require('./routes/auth/loginUser')(app);
// require('./routes/auth/registerUser')(app);
// require('./routes/auth/forgotPassword')(app);
// require('./routes/auth/resetPassword')(app);
// require('./routes/auth/updatePassword')(app);
// require('./routes/auth/updatePasswordViaEmail')(app);
require('./routes/auth/findUsers')(app);
// require('./routes/auth/deleteUser')(app);
// require('./routes/auth/updateUser')(app);

require('./routes/fileUpload')(app, passport, __dirname);

routeFactory({
  ...routeFactoryData,
  routePath: '/contact/',
  Model: Contact
})

routeFactory({
  ...routeFactoryData,
  routePath: '/report/',
  Model: Report,
  parentFolder: 'works',
  filesFolder: 'reports'
})

/** Работы */
routeFactory({
  ...routeFactoryData,
  routePath: '/work/',
  Model: Work,
  filesFolder: 'works'
})

/** Услуги */
routeFactory({
  ...routeFactoryData,
  routePath: '/service/',
  Model: Service,
  filesFolder: 'services'
})

/** Карточки*/
routeFactory({
  ...routeFactoryData,
  routePath: '/cards/',
  Model: Card,
  filesFolder: 'card'
})

/** Данные */
routeFactory({
  ...routeFactoryData,
  routePath: '/data/',
  Model: Data,
  filesFolder: 'data'
})
/** Слайды */
routeFactory({
  ...routeFactoryData,
  routePath: '/slide/',
  Model: Slide,
  filesFolder: 'slide'
})

/** Статьи */
routeFactory({
  ...routeFactoryData,
  routePath: '/paper/',
  Model: Paper,
  filesFolder: 'paper'
})

/** Тестовый роут */
routeFactory({
  ...routeFactoryData,
  routePath: '/test/',
  Model: Test,
  filesFolder: 'test'
})

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
