const Sequelize = require('sequelize')
const UserModel = require('./models/user')
const WorkModel = require('./models/work')
const ReportModel = require('./models/report')
const PaperModel = require('./models/paper')
const ServiceModel = require('./models/service')
const PageModel = require('./models/page')
const AdvantagesMainModel = require('./models/advantagesMain')
const mainPageCardsModel = require('./models/mainPageCards')
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
const Page = PageModel(sequelize, Sequelize);
const AdvantagesMain = AdvantagesMainModel(sequelize, Sequelize)
const MainPageCards = mainPageCardsModel(sequelize, Sequelize)

sequelize.sync().then(() => {
  console.log('Users db and user table have been created');
});

module.exports = {
  User,
  Work,
  Report,
  Paper,
  Service,
  Page,
  AdvantagesMain,
  MainPageCards
};
