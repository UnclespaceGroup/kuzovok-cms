const Page = (sequelize, type) => sequelize.define('pageTest', {
  id: {
    type: type.STRING,
    primaryKey: true
  },
  title: type.STRING,
  text: type.TEXT,
  banner: type.STRING
})

module.exports = Page
