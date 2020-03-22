const Sequelize = require('sequelize')
const UserModel = require('./models/user')
const WorkModel = require('./models/work')
const ReportModel = require('./models/report')
const PaperModel = require('./models/paper')
const ServiceModel = require('./models/service')
const SlideModel = require('./models/slide')
const ContactModel = require('./models/contact')
const DataModel = require('./models/data')
const TestModel = require('./models/test')
const CardModel = require('./models/cards')

const connectionConfig = require('./constants/index')

const sequelize = new Sequelize(connectionConfig.database, connectionConfig.user, connectionConfig.password, {
  host: connectionConfig.host,
  dialect: 'mysql'
});

const User = UserModel(sequelize, Sequelize);
const Work = WorkModel(sequelize, Sequelize);
const Report = ReportModel(sequelize, Sequelize);
const Paper = PaperModel(sequelize, Sequelize);
const Service = ServiceModel(sequelize, Sequelize);
const Card = CardModel(sequelize, Sequelize)
const Slide = SlideModel(sequelize, Sequelize)
const Contact = ContactModel(sequelize, Sequelize)
const Data = DataModel(sequelize, Sequelize)
const Test = TestModel(sequelize, Sequelize)

sequelize.sync().then(() => {
  console.log('Users db and user table have been created');
});

module.exports = {
  User,
  Work,
  Report,
  Paper,
  Service,
  Card,
  Slide,
  Contact,
  Data,
  Test
};
