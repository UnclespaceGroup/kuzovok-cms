var passport = require('passport')
const { UserModel } = require('../auth/userModel')
var JwtStrategy = require('passport-jwt').Strategy
var ExtractJwt = require('passport-jwt').ExtractJwt;

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
opts.issuer = 'accounts.examplesoft.com';
opts.audience = 'yoursite.net';

const jwtStrategy = new JwtStrategy(opts, (payload, done) => {
    const result = UserModel.auth(payload)
    if (!result.status) {
      done(null, false, result.message)
    } else {
      done(null, result.login)
    }
  }
)

passport.use('jwt', jwtStrategy);

const authenticate = passport.authenticate('jwt', {session: false});

module.exports = function (app, pool) {
  app.get('/login/',
    function (req, res) {
      res.send({
        status: false,
        message: 'is get'
      })
    })
  app.post('/login/',
    // authenticate,
    function (req, res) {
      const { user: { passwd, login } = {} } = req.body
      res.send(login)
    })
}