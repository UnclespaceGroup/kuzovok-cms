const { Paper } = require('../sequelize')
const deleteImageFolder = require('../services/deleteImageFolder')

const WORK_PATH = '/paper/'

const paper = function (app, passport, rootDirectory) {
  app.get(WORK_PATH + 'list', (req, res) => {
    const params = req.query

    Paper.findAll({ limit: +params.limit, raw: true }).then(items => {
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

    Paper.findAll({ where: { ...params }, raw: true }).then(users => {
      res.send(users)
    }).catch(err => {
      res.status(404).send(err)
      console.log(err)
    })
  })

  // GET DATA WITH POST PARAMS
  app.post(WORK_PATH, (req, res) => {
    const { where, single } = req.body || {}

    Paper.findAll({ where }).then(users => {
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
    Paper.findByPk(id)
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
    Paper.create({
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
    Paper.update(data, {
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
      // Удаляем работу
      await Paper.destroy({ where: { id } })
      // Удаляем папку с картинками
      await deleteImageFolder(`paper/${id}`, rootDirectory)

      res.status(200).send({ text: 'Успешно удалено' })
    } catch (err) {
      res.status(500).send({ text: 'Что то пошло не так', err })
      console.log(err)
    }
  })
}
module.exports = paper
