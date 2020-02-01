const { Contact } = require('../sequelize')

const WORK_PATH = '/contact/'

const contacts = function (app, passport) {

  // GET DATA WITH PARAMS
  app.get(WORK_PATH, (req, res, next) => {
    const { page: id } = req.params

    if (!id) {
      res.status(404).send({ text: 'Нет id' })
    }

    Contact.findAll({ where: { id }, raw: true })
      .then(items => {
      res.send(items[0])
    }).catch(err => {
      res.status(404).send(err)
      console.log(err)
    })
  })

  // GET DATA WITH POST PARAMS
  app.post(WORK_PATH, (req, res, next) => {
    const { where, single } = req.body

    Contact.findAll({ where }).then(contacts => {
      if (single) res.send(contacts[0])
      else res.send(contacts)
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
    Contact.update(data, {
      where: {
        id
      }
    }).then((result) => {
      res.send(result)
    }).catch(err => console.log(err))
  })
}
module.exports = contacts
