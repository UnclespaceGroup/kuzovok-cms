const Sequelize = require('sequelize')
const { Report } = require('../sequelize')
const Op = Sequelize.Op
const deleteImageFolder = require('../services/deleteImageFolder')


const WORK_PATH = '/report/'

const report = function (app, passport, rootDirectory) {

  // get simple list
  app.post(WORK_PATH + 'list', (req, res) => {
    const { where, limit } = req.body || {}

    Report.findAll({ where, limit }).then(items => {
      const list = items.map(item => ({
        title: item.title,
        annotation: item.annotation,
        status: item.status,
        id: item.id,
        date: item.date
      }))
      res.send(list)
    }).catch(err => {
      res.status(404).send(err)
      console.log(err)
    })
  })

  // GET DATA WITH POST PARAMS
  app.post(WORK_PATH, (req, res) => {
    const { where = {}, rangeData } = req.body || {}

    if (rangeData) where.createdAt = {
      [Op.between]: rangeData
    }

    Report.findAll({ where }).then(users => {
      res.send(users)
    }).catch(err => {
      res.status(404).send(err)
      console.log('GET DATA WITH POST PARAMS' + err)
    })
  })

  // ADD NEW
  app.post(WORK_PATH + 'add', (req, res, next) => {
    const pass = passport.authenticate('jwt', { session: false })
    pass(req, res, next)

    const data = req.body
    Report.create({
      date: new Date().toString(),
      ...data
    }).then(result => {
      res.send(result)
    }).catch(err => {
      res.status(500).send()
      console.log(err)
    })
  })

  // update
  app.post(WORK_PATH + 'update/:id', (req, res, next) => {
    const pass = passport.authenticate('jwt', { session: false })
    pass(req, res, next)

    const data = req.body
    const id = req.params.id
    Report.update(data, {
      where: {
        id
      }
    }).then((result) => {
      res.send(result)
    }).catch(err => {
      res.status(404).send(err)
      console.log(err)
    })
  })

  // DELETE
  app.delete(WORK_PATH + ':id', (req, res, next) => {
    const pass = passport.authenticate('jwt', { session: false })
    pass(req, res, next)

    const id = req.params.id
    Report.destroy({
      where: { id }
    }).then((result) => {
      deleteImageFolder(`works/${id}`, rootDirectory)
        .then(() => {
          res.sendStatus(200)
          console.log(result)
        })
    }).catch(err => {
      res.status(404).send(err)
      console.log(err)
    })
  })
}
module.exports = report
