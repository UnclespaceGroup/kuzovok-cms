const Sequelize = require('sequelize')
const UserModel = require('./models/user')
const WorkModel = require('./models/work')
const ReportModel = require('./models/report')
const connectionConfig = require('./constants/index')

const sequelize = new Sequelize(connectionConfig.database, connectionConfig.user, connectionConfig.password, {
  host: connectionConfig.host,
  dialect: 'mysql'
});

const User = UserModel(sequelize, Sequelize);
const Work = WorkModel(sequelize, Sequelize);
const Report = ReportModel(sequelize, Sequelize);

sequelize.sync().then(() => {
  console.log('Users db and user table have been created');
});

module.exports = {
  User,
  Work,
  Report
};
