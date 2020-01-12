module.exports = (sequelize, type) => sequelize.define('serviceTest', {
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
  slug: type.STRING
})
