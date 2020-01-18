const { Page } = require('../sequelize')
const CheckAuthorize = require('../services/checkAuthorize')


const WORK_PATH = '/page/'

const pages = function (app, passport) {

  // GET DATA WITH PARAMS
  app.get(WORK_PATH + ':page', (req, res, next) => {
    const { page: id } = req.params

    if (!id) {
      res.status(404).send({ text: 'Нет id' })
    }

    Page.findAll({ where: { id }, raw: true }).then(users => {
      res.send(users[0])
    }).catch(err => {
      res.status(404).send(err)
      console.log(err)
    })
  })

  // GET DATA WITH POST PARAMS
  app.post(WORK_PATH, (req, res) => {
    const { where, single } = req.body

    Page.findAll({ where }).then(pages => {
      if (single) res.send(pages[0])
      else res.send(pages)
    }).catch(err => {
      res.status(500).send(err)
      console.log(err)
    })
  })

  // update
  app.post(WORK_PATH + 'update/:id', (req, res, next) => {
    CheckAuthorize(req, res, next, passport)
    const data = req.body
    const { id } = req.params
    Page.update(data, {
      where: {
        id
      }
    }).then((result) => {
      res.send(result)
    }).catch(err => console.log(err))
  })
}
module.exports = pages
