module.exports = (sequelize, type) => sequelize.define('data', {
  id: {
    type: type.STRING,
    primaryKey: true,
  },
  text: type.TEXT,
  type: type.STRING
})
