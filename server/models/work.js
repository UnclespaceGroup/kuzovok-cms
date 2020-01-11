module.exports = (sequelize, type) => sequelize.define('workTest', {
  id: {
    type: type.STRING,
    primaryKey: true,
  },
  title: type.STRING,
  annotation: type.STRING,
  text: type.TEXT,
  status: type.STRING,
  date: type.DATE,
  banner: type.STRING,
  data: type.STRING,
  tags: type.STRING,
  type: type.STRING,
})
