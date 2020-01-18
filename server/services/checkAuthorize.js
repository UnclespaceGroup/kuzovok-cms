const CheckAuthorize = (req, res, next, passport) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    console.log('auth', err, user, info)
    if (err) {
      console.error(err);
      res.status(403).send('Авторизации пизда', info.message)
    }
    if (info !== undefined) {
      console.error(info.message);
      res.status(403).send('Ошибка авторизации', info.message);
    } else {

    }
  })(req, res, next);
}

module.exports = CheckAuthorize
