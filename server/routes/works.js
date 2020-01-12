const Sequelize = require('sequelize')
const { Work } = require('../sequelize')
const Op = Sequelize.Op
const CheckAuthorize = require('../services/checkAuthorize')
const deleteImageFolder = require('../services/deleteImageFolder')


const WORK_PATH = '/work/'

const works = function (app, passport, rootDirectory) {
  app.get(WORK_PATH + 'list', (req, res) => {
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

  // GET DATA WITH PARAMS
  app.get(WORK_PATH, (req, res) => {
    const params = req.query

    Work.findAll({ where: { ...params }, raw: true }).then(users => {
      res.send(users)
    }).catch(err => console.log(err))
  })

  // GET DATA WITH POST PARAMS
  app.post(WORK_PATH, (req, res) => {
    const params = req.body.params || {}

    const where = Array.isArray(params.rangeDate) ? {
      createdAt: {
        [Op.between]: params.rangeDate
      }
    } : {}

    Work.findAll({ where: { ...where, ...params.where }, ...params }).then(users => {
      res.send(users)
    }).catch(err => console.log(err))
  })

  // GET SINGLE DATA
  app.get(WORK_PATH + ':id', (req, res) => {
    const id = req.params.id
    Work.findByPk(id)
      .then(result => {
        if (!result) return
        res.send(result)
      }).catch(err => console.log(err))
  })

  // ADD NEW
  app.post(WORK_PATH + 'add', (req, res, next) => {
    CheckAuthorize(req, res, next, passport)
    const data = req.body
    Work.create({
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
    CheckAuthorize(req, res, next, passport)
    const data = req.body
    const id = req.params.id
    Work.update(data, {
      where: {
        id
      }
    }).then((result) => {
      res.send(result)
    }).catch(err => console.log(err))
  })

  // DELETE
  app.delete(WORK_PATH + ':id', (req, res, next) => {
    CheckAuthorize(req, res, next, passport)
    const id = req.params.id
    Work.destroy({
      where: {
        id
      }
    }).then((result) => {
      deleteImageFolder(`works/${id}`, rootDirectory)
        .then(() => {
          res.sendStatus(200)
          console.log(result)
        })
    }).catch(err => console.log(err))
  })
}
module.exports = works
