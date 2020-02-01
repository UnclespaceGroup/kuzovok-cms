const { WORK_DB } = require('server/constants/db')

module.exports = (sequelize, type) => sequelize.define(WORK_DB, {
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
