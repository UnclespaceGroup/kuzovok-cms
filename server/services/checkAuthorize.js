const CheckAuthorize = (req, res, next, passport) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      console.error(err);
    }
    if (info !== undefined) {
      console.error(info.message);
      res.status(403).send('Ошибка авторизации', info.message);
    } else {

    }
  })(req, res, next);
}

module.exports = CheckAuthorize
