const { MAIN_PAGE_CARDS_DB } = require('../constants/db')

const Page = (sequelize, type) => sequelize.define(MAIN_PAGE_CARDS_DB, {
  id: {
    type: type.STRING,
    primaryKey: true
  },
  title: type.STRING,
  text: type.TEXT,
  banner: type.STRING,
  slug: type.STRING,
  position: type.INTEGER
})

module.exports = Page
