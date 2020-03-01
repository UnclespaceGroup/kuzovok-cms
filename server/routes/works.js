const { Work } = require('../sequelize')
const { Report } = require('../sequelize')
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
    }).catch(err => {
      res.status(404).send(err)
      console.log(err)
    })
  })

  // GET DATA WITH PARAMS
  app.get(WORK_PATH, (req, res) => {
    const params = req.query

    Work.findAll({ where: { ...params }, raw: true }).then(users => {
      res.send(users)
    }).catch(err => {
      res.status(404).send(err)
      console.log(err)
    })
  })

  // GET DATA WITH POST PARAMS
  app.post(WORK_PATH, (req, res) => {
    const { where, single } = req.body || {}

    Work.findAll({ where }).then(users => {
      console.log('use', users)
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
    Work.findByPk(id)
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
    const pass = passport.authenticate('jwt', { session: false })
    pass(req, res, next)

    const data = req.body
    const id = req.params.id
    Work.update(data, {
      where: {
        id
      }
    }).then((result) => {
      res.send(result)
    }).catch(err => {
      res.status(500).send(err)
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
      await Work.destroy({ where: { id } })
      // Удаляем прикреплённые к ней отчеты
      await Report.destroy({ where: { parentId: id } })
      // Удаляем папку с картинками
      await deleteImageFolder(`works/${id}`, rootDirectory)

      res.status(200).send({ text: 'Успешно удалено' })
    } catch (err) {
      res.status(500).send({ text: 'Что то пошло не так', err })
      console.log(err)
    }
  })
}
module.exports = works
