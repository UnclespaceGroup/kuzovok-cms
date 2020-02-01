const { SERVICE_DB } = require('../constants/db')

module.exports = (sequelize, type) => sequelize.define(SERVICE_DB, {
  id: {
    type: type.STRING,
    primaryKey: true
  },
  title: type.STRING,
  annotation: type.STRING,
  bannerData: type.STRING,
  text: type.TEXT,
  date: type.DATE,
  banner: type.STRING,
  slug: type.STRING,
  isMain: type.INTEGER,
  isBanner: type.INTEGER
})
