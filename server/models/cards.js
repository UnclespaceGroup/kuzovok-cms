const { CARD_DB } = require('../constants/db')

const Card = (sequelize, type) => sequelize.define(CARD_DB, {
  id: {
    type: type.STRING,
    primaryKey: true
  },
  title: type.STRING,
  annotation: type.TEXT,
  banner: type.STRING,
  type: type.STRING,
  slug: type.STRING,
  position: type.INTEGER
})

module.exports = Card
