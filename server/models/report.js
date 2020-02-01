const { REPORT_DB } = require('server/constants/db')

module.exports = (sequelize, type) => sequelize.define(REPORT_DB, {
  id: {
    type: type.STRING,
    primaryKey: true
  },
  parentId: {
    type: type.STRING,
    allowNull: false
  },
  parentTitle: type.STRING,
  title: type.STRING,
  annotation: type.STRING,
  text: type.TEXT('long'),
  date: type.DATE,
})
