const Sequelize = require('sequelize')
const UserModel = require('./models/user')
const connectionConfig = require('./constants/index')

const sequelize = new Sequelize(connectionConfig.database, connectionConfig.user, connectionConfig.password, {
  host: connectionConfig.host,
  dialect: 'mysql'
});

const User = UserModel(sequelize, Sequelize);

sequelize.sync().then(() => {
  // eslint-disable-next-line no-console
  console.log('Users db and user table have been created');
});

module.exports = User;
