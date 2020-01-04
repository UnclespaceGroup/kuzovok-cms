module.exports = (sequelize, type) => sequelize.define('paperTest', {
  id: {
    type: type.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: type.STRING,
  annotation: type.STRING,
  text: type.TEXT,
  date: type.DATE,
  actor: type.STRING,
  banner: type.STRING,
  slug: type.STRING
})
