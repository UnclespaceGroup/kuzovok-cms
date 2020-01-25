const Slide = (sequelize, type) => sequelize.define('slide', {
  id: {
    type: type.STRING,
    primaryKey: true
  },
  title: type.STRING,
  type: type.STRING,
  text: type.TEXT,
  banner: type.STRING
})

module.exports = Slide
