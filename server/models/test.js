const { TEST_DB } = require('../constants/db')

module.exports = (sequelize, type) => sequelize.define(TEST_DB, {
  id: {
    type: type.STRING,
    primaryKey: true,
  },
  banner: type.STRING,
  title: type.STRING,
  text: type.STRING
})
