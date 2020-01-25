const Page = (sequelize, type) => sequelize.define('mainPageCards', {
  id: {
    type: type.STRING,
    primaryKey: true
  },
  title: type.STRING,
  text: type.TEXT,
  banner: type.STRING,
  slug: type.STRING,
  position: type.INTEGER
})

module.exports = Page
