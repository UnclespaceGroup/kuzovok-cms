const Sequelize = require('sequelize')
const { Service } = require('../sequelize')
const Op = Sequelize.Op
const deleteImageFolder = require('../services/deleteImageFolder')


const WORK_PATH = '/service/'

const works = function (app, passport, rootDirectory) {
  app.get(WORK_PATH + 'list', (req, res) => {
    const params = req.query

    Service.findAll({ limit: +params.limit, raw: true }).then(items => {
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

  // GET DATA WITH PARAMS
  app.get(WORK_PATH, (req, res) => {
    const params = req.query

    Service.findAll({ where: { ...params }, raw: true }).then(users => {
      res.send(users)
    }).catch(err => {
      res.status(404).send(err)
      console.log(err)
    })
  })

  // GET DATA WITH POST PARAMS
  app.post(WORK_PATH, (req, res) => {
    const { where, single } = req.body || {}

    console.log(req.body)

    // const where = Array.isArray(params.rangeDate) ? {
    //   createdAt: {
    //     [Op.between]: params.rangeDate
    //   }
    // } : {}

    Service.findAll({ where }).then(users => {
      if (single) res.send(users[0])
      else res.send(users)
    }).catch(err => {
      res.status(404).send(err)
      console.log(err)
    })
  })

  // GET SINGLE DATA
  app.get(WORK_PATH + ':slug', (req, res) => {
    const slug = req.params.slug
    Service.findByPk(slug)
      .then(result => {
        if (!result) return
        res.send(result)
      }).catch(err => {
      res.status(404).send(err)
      console.log(err)
    })
  })

  // ADD NEW
  app.post(WORK_PATH + 'add', (req, res, next) => {
    const pass = passport.authenticate('jwt', { session: false })
    pass(req, res, next)

    const data = req.body
    Service.create({
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
    Service.update(data, {
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
    Service.destroy({
      where: {
        id
      }
    }).then((result) => {
      deleteImageFolder(`services/${id}`, rootDirectory)
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
module.exports = works
