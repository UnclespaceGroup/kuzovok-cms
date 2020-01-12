module.exports = (sequelize, type) => sequelize.define('reportTest', {
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
  text: type.STRING,
  date: type.DATE,
})
