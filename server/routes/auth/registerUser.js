// const passport = require('passport')
const { User } = require('../../sequelize')
const bcrypt = require('bcrypt')

const BCRYPT_SALT_ROUNDS = 12;

module.exports = app => {
  app.post('/registerUser', (req, res, next) => {
    bcrypt
      .hash(req.body.password, BCRYPT_SALT_ROUNDS)
      .then((hashedPassword) => {
        var user = new User({ email: req.body.email, username: req.body.username, password: hashedPassword});
        user.save(function(err) {
          return err
            ? next(err)
            : req.logIn(user, function(err) {
              return err
                ? next(err)
                : res.send('OK');
            })
        })
      })
      .then(() => {
        console.log('add user');
        res
          .status(200)
          .send({ auth: true, message: 'add user' });
      });
  });
};
