module.exports = (sequelize, type) => sequelize.define('reportTest', {
  id: {
    type: type.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  parentId: {
    type: type.INTEGER,
    allowNull: false
  },
  title: type.STRING,
  annotation: type.STRING,
  text: type.STRING,
  date: type.DATE,
  images: type.STRING,
  data: type.STRING,
})
