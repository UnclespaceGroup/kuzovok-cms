const { DATA_DB } = require('../constants/db')

module.exports = (sequelize, type) => sequelize.define(DATA_DB, {
  id: {
    type: type.STRING,
    primaryKey: true,
  },
  text: type.TEXT,
  type: type.STRING
})
