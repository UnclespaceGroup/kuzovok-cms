const { PAGE_DB } = require('../constants/db')

const Page = (sequelize, type) => sequelize.define(PAGE_DB, {
  id: {
    type: type.STRING,
    primaryKey: true
  },
  title: type.STRING,
  text: type.TEXT,
  banner: type.STRING
})

module.exports = Page
