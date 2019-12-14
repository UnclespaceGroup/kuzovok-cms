const Sequelize = require('sequelize')
const CheckAuthorize = require('../services/checkAuthorize')
const Op = Sequelize.Op

module.exports = function (app, workPath, Model, passport) {
  // GET ALL DATA
  app.get(workPath, (req, res, next) => {
    Model.findAll({ raw: true }).then(users => {
      console.log('users length = ', users.length)
      res.send(users)
    }).catch(err => console.log(err))
  })

  // GET DATA WITH PARAMS
  app.get(workPath, passport.authenticate('jwt', { session: false }), (req, res) => {
    const params = req.query.params
    Model.findAll({ where: { ...params }, raw: true }).then(users => {
      res.send(users)
    }).catch(err => console.log(err))
  })

  // GET DATA WITH POST PARAMS
  app.post(workPath, (req, res) => {
    const params = req.body.params || {}
    console.log(params)

    const where = Array.isArray(params.rangeDate) ? {
      createdAt: {
        [Op.between]: params.rangeDate
      }
    } : {}

    Model.findAll({ where: { ...where, ...params.where }, ...params }).then(users => {
      res.send(users)
    }).catch(err => console.log(err))
  })

  // GET SINGLE DATA
  app.get(workPath + ':id', (req, res) => {
    const id = req.params.id
    console.log('req.params', req.params)
    Model.findByPk(id)
      .then(result => {
        if (!result) return
        res.send(result)
        console.log(result)
      }).catch(err => console.log(err))
  })

  // ADD NEW
  app.post(workPath + 'add', (req, res, next) => {
    CheckAuthorize(req, res, next, passport)
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
    CheckAuthorize(req, res, next, passport)
    const data = req.body
    const id = req.params.id
    Model.update(data, {
      where: {
        id
      }
    }).then((result) => {
      res.send(result)
    }).catch(err => console.log(err))
  })

  // DELETE
  app.delete(workPath + ':id', (req, res, next) => {
    CheckAuthorize(req, res, next, passport)
    const id = req.params.id
    Model.destroy({
      where: {
        id
      }
    }).then((result) => {
      res.send(result)
      console.log(result)
    }).catch(err => console.log(err))
  })
}
