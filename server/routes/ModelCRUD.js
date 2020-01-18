const Sequelize = require('sequelize')
const Op = Sequelize.Op
const deleteImageFolder = require('../services/deleteImageFolder')

module.exports = function (app, workPath, Model, passport, rootDirectory) {
  // GET ALL DATA

  // GET DATA WITH PARAMS
  app.get(workPath, (req, res) => {
    const params = req.query

    Model.findAll({ where: { ...params }, raw: true }).then(users => {
      res.send(users)
    }).catch(err => {
      res.status(404).send(err)
      console.log(err)
    })
  })

  // GET DATA WITH POST PARAMS
  app.post(workPath, (req, res) => {
    const params = req.body.params || {}

    const where = Array.isArray(params.rangeDate) ? {
      createdAt: {
        [Op.between]: params.rangeDate
      }
    } : {}

    Model.findAll({ where: { ...where, ...params.where }, ...params }).then(users => {
      res.send(users)
    }).catch(err => {
      res.status(404).send(err)
      console.log(err)
    })
  })

  // GET SINGLE DATA
  app.get(workPath + ':id', (req, res) => {
    const id = req.params.id
    Model.findByPk(id)
      .then(result => {
        if (!result) return
        res.send(result)
      }).catch(err => {
      res.status(404).send(err)
      console.log(err)
    })
  })

  // ADD NEW
  app.post(workPath + 'add', (req, res, next) => {
    const pass = passport.authenticate('jwt', { session: false })
    pass(req, res, next)

    const data = req.body
    Model.create({
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
  app.post(workPath + 'update/:id', (req, res, next) => {
    const pass = passport.authenticate('jwt', { session: false })
    pass(req, res, next)

    const data = req.body
    const id = req.params.id
    Model.update(data, {
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
  app.delete(workPath + ':id', (req, res, next) => {
    const pass = passport.authenticate('jwt', { session: false })
    pass(req, res, next)

    const id = req.params.id
    Model.destroy({
      where: {
        id
      }
    }).then((result) => {
      deleteImageFolder(id, rootDirectory)
      res.sendStatus(200)
      console.log(result)
    }).catch(err => {
      res.status(404).send(err)
      console.log(err)
    })
  })
}
