const { PAGE_DB } = require('server/constants/db')

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
