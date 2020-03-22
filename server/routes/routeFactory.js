const {getFileName, getFilePathOnly} = require('../services/files')
const _ = require('lodash')
const deleteExcessImages = require('../services/deleteExcessImages')

const getFilesFromText = (text = '') => {
  return text.match(/__SERVER_PATH__.*?\..../ig)

}

const routeFactory = function (
  {
    app,
    filesFolder = '__test__', /** /public/images/@filesFolder/id/ */
    routePath,
    passport,
    rootDirectory,
    Model,
    ChildModel,
    parentFolder
  } = {}
) {

  // GET ALL DATA
  app.get(routePath, (req, res) => {
    Model.findAll()
      .then(result => {
        res.send(result)
      }).catch(err => {
      res.status(404).send(err)
      console.log(err)
    })
  })

  // GET ALL DATA WITH POST PARAMS
  app.post(routePath, (req, res) => {
    const {
      where,
      single,
      limit
    } = req.body || {}

    Model.findAll({ where, limit: limit && +limit }).then(users => {
      if (single) res.send(users[0])
      else res.send(users)
    }).catch(err => {
      res.status(404).send(err)
      console.log(err)
    })
  })

  // GET SINGLE DATA
  app.get(routePath + ':id', (req, res) => {
    const id = req.params.id
    Model.findByPk(id)
      .then(result => {
        if (!result) return
        res.send(result)
      }).catch(err => {
      res.status(404).send(err)
      console.log(err)
    })
  })

  // ADD NEW
  app.post(routePath + 'add', (req, res, next) => {
    const pass = passport.authenticate('jwt', { session: false })
    pass(req, res, next)
    const data = req.body
    Model.create({
      ...data
    }).then(result => {
      res.send(result)
    }).catch(err => {
      res.status(500).send()
      console.log(err)
    })
  })

  // update
  app.post(routePath + 'update/:id', async (req, res, next) => {
    const pass = passport.authenticate('jwt', { session: false })
    pass(req, res, next)

    const {
      banner,
      text,
      parentId,
      ...otherData
    } = req.body
    const id = req.params.id

    await deleteExcessImages({
      rootDirectory,
      path: `${getFilePathOnly(banner)}/banner`,
      items: [ getFileName(banner) ]
    })

    const editorFiles = text && getFilesFromText(text)

    const parentDirectory = parentFolder ? `${parentFolder}/${parentId}/` : ''

    text && await deleteExcessImages({
      rootDirectory,
      path: `images/${parentDirectory}${filesFolder}/${id}/editor`,
      items: _.map(editorFiles, item => item && item.split('/').pop())
    })

    Model.update({
      banner,
      text,
      ...otherData
    }, {
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
  app.delete(routePath + ':id', async (req, res, next) => {
    const pass = passport.authenticate('jwt', { session: false })
    pass(req, res, next)

    const id = req.params.id
    try {
      // Удаляем работу
      await Model.destroy({ where: { id } })
      // Удаляем прикреплённые к ней отчеты
      if (ChildModel) await ChildModel.destroy({ where: { parentId: id } })
      // Удаляем папку с картинками
      await deleteImageFolder(`images/${filesFolder}/${id}`, rootDirectory)
      res.status(200).send({ text: 'Успешно удалено' })
    } catch (err) {
      res.status(500).send({ text: 'Что то пошло не так', err })
      console.log(err)
    }
  })
}

const deleteImageFolder = require('../services/deleteImageFolder')

module.exports = routeFactory
