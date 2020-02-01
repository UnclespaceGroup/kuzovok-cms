const { SLIDE_DB } = require('server/constants/db')

const Slide = (sequelize, type) => sequelize.define(SLIDE_DB, {
  id: {
    type: type.STRING,
    primaryKey: true
  },
  title: type.STRING,
  type: type.STRING,
  text: type.TEXT,
  banner: type.STRING
})

module.exports = Slide
