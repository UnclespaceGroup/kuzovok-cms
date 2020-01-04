const { Work } = require('../sequelize')

const getWorksList = function (app) {
  app.get('/getWorksList', (req, res) => {
    const params = req.query

    Work.findAll({ limit: +params.limit, raw: true }).then(items => {
      const list = items.map(item => ({
        title: item.title,
        annotation: item.annotation,
        status: item.status,
        id: item.id,
        date: item.date
      }))
      res.send(list)
    }).catch(err => console.log(err))
  })
}
module.exports = getWorksList
