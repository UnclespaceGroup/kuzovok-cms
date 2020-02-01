const Page = (sequelize, type) => sequelize.define('contact', {
  id: {
    type: type.STRING,
    primaryKey: true
  },
  mainPhone: type.STRING,
  secondPhone: type.STRING,
  address: type.STRING,
  mail: type.STRING,
  vk: type.STRING,
  workTime: type.STRING,
  inst: type.STRING,
  name: type.STRING,
  unclespace: type.STRING
})

module.exports = Page
