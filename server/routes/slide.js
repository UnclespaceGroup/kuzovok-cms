const { Slide } = require('../sequelize')
const deleteImageFolder = require('../services/deleteImageFolder')

const WORK_PATH = '/slide/'
const IMAGE_FOLDER = 'slide'

const slide = function (app, passport, rootDirectory) {

  // GET DATA WITH PARAMS
  app.get(WORK_PATH + ':page', (req, res, next) => {
    const { page: id } = req.params

    if (!id) {
      res.status(404).send({ text: 'Нет id' })
    }

    Slide.findAll({ where: { id }, raw: true }).then(users => {
      res.send(users[0])
    }).catch(err => {
      res.status(404).send(err)
      console.log(err)
    })
  })

  // ADD NEW SLIDE
  app.post(WORK_PATH + 'add', (req, res, next) => {
    const pass = passport.authenticate('jwt', { session: false })
    pass(req, res, next)

    const data = req.body
    Slide.create({
      date: new Date().toString(),
      ...data
    }).then(result => {
      res.send(result)
    }).catch(err => {
      res.status(500).send()
      console.log(err)
    })
  })


  // GET DATA WITH POST PARAMS
  app.post(WORK_PATH, (req, res, next) => {
    const { where, single } = req.body

    Slide.findAll({ where }).then(slide => {
      if (single) res.send(slide[0])
      else res.send(slide)
    }).catch(err => {
      res.status(500).send(err)
      console.log(err)
    })
  })

  // update
  app.post(WORK_PATH + 'update/:id', (req, res, next) => {

    const pass = passport.authenticate('jwt', { session: false })
    pass(req, res, next)

    const data = req.body
    const { id } = req.params
    Slide.update(data, {
      where: {
        id
      }
    }).then((result) => {
      res.send(result)
    }).catch(err => console.log(err))
  })

  // DELETE SLIDE
  app.delete(WORK_PATH + ':id', async (req, res, next) => {
    const pass = passport.authenticate('jwt', { session: false })
    pass(req, res, next)

    const id = req.params.id
    try {
      await Slide.destroy({ where: { id } })
      // Удаляем папку с картинками
      await deleteImageFolder(`${IMAGE_FOLDER}/${id}`, rootDirectory)
      res.status(200).send({ text: 'Успешно удалено' })
    } catch (err) {
      res.status(500).send({ text: 'Что то пошло не так', err })
      console.log(err)
    }
  })
}
module.exports = slide
