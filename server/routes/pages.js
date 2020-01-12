const Sequelize = require('sequelize')
const { Page } = require('../sequelize')
const Op = Sequelize.Op
const CheckAuthorize = require('../services/checkAuthorize')
const deleteImageFolder = require('../services/deleteImageFolder')


const WORK_PATH = '/page/'

const works = function (app, passport, rootDirectory) {

  // GET DATA WITH PARAMS
  app.get(WORK_PATH, (req, res) => {
    const params = req.query

    Page.findAll({ where: { ...params }, raw: true }).then(users => {
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

    Page.findAll({ where: { ...where, ...params.where }, ...params }).then(users => {
      res.send(users)
    }).catch(err => console.log(err))
  })

  // GET SINGLE DATA
  app.get(WORK_PATH + ':id', (req, res) => {
    const id = req.params.id
    Page.findByPk(id)
      .then(result => {
        if (!result) return
        res.send(result)
      }).catch(err => {
        res.status(404).send('Не найдено')
        console.log(err)
      })
  })

  // ADD NEW
  app.post(WORK_PATH + 'add', (req, res, next) => {
    CheckAuthorize(req, res, next, passport)
    const data = req.body
    Page.create({
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
    Page.update(data, {
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
    Page.destroy({
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
