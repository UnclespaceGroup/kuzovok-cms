const { PAPER_DB } = require('../constants/db')

module.exports = (sequelize, type) => sequelize.define(PAPER_DB, {
  id: {
    type: type.STRING,
    primaryKey: true
  },
  title: type.STRING,
  annotation: type.STRING,
  text: type.TEXT,
  date: type.DATE,
  actor: type.STRING,
  banner: type.STRING,
  slug: type.STRING
})
