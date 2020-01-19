const { AdvantagesMain } = require('../sequelize')
const deleteImageFolder = require('../services/deleteImageFolder')

const WORK_PATH = '/advantages-main/'

const advantagesMain = function (app, passport, rootDirectory) {

  // GET ALL ADVANTAGES
  app.post(WORK_PATH, (req, res) => {

    AdvantagesMain.findAll().then(users => {
      res.send(users)
    }).catch(err => {
      res.status(404).send(err)
      console.log(err)
    })
  })

  // ADD NEW ADVANTAGE
  app.post(WORK_PATH + 'add', (req, res, next) => {
    const pass = passport.authenticate('jwt', { session: false })
    pass(req, res, next)

    const data = req.body
    AdvantagesMain.create({
      date: new Date().toString(),
      ...data
    }).then(result => {
      res.send(result)
    }).catch(err => {
      res.status(500).send()
      console.log(err)
    })
  })

  // update ADVANTAGE
  app.post(WORK_PATH + 'update/:id', (req, res, next) => {
    const pass = passport.authenticate('jwt', { session: false })
    pass(req, res, next)

    const data = req.body
    const id = req.params.id
    AdvantagesMain.update(data, {
      where: { id }
    }).then((result) => {
      res.send(result)
    }).catch(err => {
      res.status(404).send(err)
      console.log(err)
    })
  })

  // DELETE ADVANTAGE
  app.delete(WORK_PATH + ':id', async (req, res, next) => {
    const pass = passport.authenticate('jwt', { session: false })
    pass(req, res, next)

    const id = req.params.id
    try {
      await AdvantagesMain.destroy({ where: { id } })
      // Удаляем папку с картинками
      await deleteImageFolder(`advantages/${id}`, rootDirectory)
      res.status(200).send({ text: 'Успешно удалено' })
    } catch (err) {
      res.status(500).send({ text: 'Что то пошло не так', err })
      console.log(err)
    }
  })
}
module.exports = advantagesMain
