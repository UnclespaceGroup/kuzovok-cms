const {getFileName, getFilePathOnly} = require('../services/files')
const _ = require('lodash')
const deleteExcessImages = require('../services/deleteExcessImages')

const getFilesFromText = (text = '') => {
  return text.match(/__SERVER_PATH__.*?\..../ig)

}

const routeFactory = function (
  {
    app,
    filesFolder, /** /public/images/@filesFolder/id/ */
    workPath,
    passport,
    rootDirectory,
    Model,
    ChildModel
  } = {}
) {
  if (!filesFolder) {
    console.warn('Не передано filesFolder')
    return
  }
  // GET SINGLE DATA
  app.get(workPath, (req, res) => {
    Model.findAll()
      .then(result => {
        if (!result) return
        res.send(result)
      }).catch(err => {
      res.status(404).send(err)
      console.log(err)
    })
  })

  // GET DATA WITH POST PARAMS
  app.post(workPath, (req, res) => {
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
  app.get(workPath + ':id', (req, res) => {
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
  app.post(workPath + 'add', (req, res, next) => {
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
  app.post(workPath + 'update/:id', async (req, res, next) => {
    const pass = passport.authenticate('jwt', { session: false })
    pass(req, res, next)

    const {
      banner,
      text,
      ...otherData
    } = req.body
    const id = req.params.id

    const deletingBannerData = {
      path: `${getFilePathOnly(banner)}/banner`,
      items: [ getFileName(banner) ]
    }

    await deleteExcessImages({
      rootDirectory,
      ...deletingBannerData
    })

    const textFiles = getFilesFromText(text)

    await deleteExcessImages({
      rootDirectory,
      path: `images/${filesFolder}/${id}/editor`,
      items: _.map(textFiles, item => item && item.split('/').pop())
    })

    const newData = {
      banner,
      text,
      ...otherData
    }

    Model.update(newData, {
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
  app.delete(workPath + ':id', async (req, res, next) => {
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
