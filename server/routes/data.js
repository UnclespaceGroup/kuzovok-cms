const { Data } = require('../sequelize')
const deleteImageFolder = require('../services/deleteImageFolder')

const WORK_PATH = '/data/'

const data = function (app, passport, rootDirectory) {

  // GET DATA WITH PARAMS
  app.get(WORK_PATH, (req, res) => {
    const params = req.query

    Data.findAll({ where: { ...params }, raw: true }).then(users => {
      res.send(users)
    }).catch(err => {
      res.status(404).send(err)
      console.log(err)
    })
  })

  // GET DATA WITH POST PARAMS
  app.post(WORK_PATH, (req, res) => {
    const { where, single } = req.body || {}

    Data.findAll({ where }).then(users => {
      if (single) res.send(users[0])
      else res.send(users)
    }).catch(err => {
      res.status(404).send(err)
      console.log(err)
    })
  })

  // GET SINGLE DATA
  app.get(WORK_PATH + ':id', (req, res) => {
    const id = req.params.id
    Data.findByPk(id)
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
    Data.create({
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
    Data.update(data, {
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
  app.delete(WORK_PATH + ':id', async (req, res, next) => {
    const pass = passport.authenticate('jwt', { session: false })
    pass(req, res, next)

    const id = req.params.id
    try {
      await Data.destroy({ where: { id } })
      // Удаляем папку с картинками
      await deleteImageFolder(`data/${id}`, rootDirectory)

      res.status(200).send({ text: 'Успешно удалено' })
    } catch (err) {
      res.status(500).send({ text: 'Что то пошло не так', err })
      console.log(err)
    }
  })
}
module.exports = data
