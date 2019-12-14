const { User } = require('../sequelize')

const CheckAuthorize = (req, res, next, passport) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      console.error(err);
    }
    if (info !== undefined) {
      console.error(info.message);
      res.status(403).send(info.message);
    } else {
      User.findOne({
        where: {
          username: req.body.username,
        },
      }).then((userInfo) => {
        if (userInfo != null) {
          console.log('user found in db');
        } else {
          console.error('no user exists in db to update');
          res.status(404).json('no user exists in db to update');
        }
      });
    }
  })(req, res, next);
}

module.exports = CheckAuthorize
