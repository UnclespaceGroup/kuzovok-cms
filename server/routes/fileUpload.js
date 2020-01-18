const CheckAuthorize = require('../services/checkAuthorize')
const multer  = require("multer")
const deleteImageFolder = require("../services/deleteImageFolder")
const fs = require('fs-extra')
const _ = require('lodash')
const mkdirpAsync = require('async-mkdirp')

/**
 * Файловая структура картинок
 * - public/images
 *      - {categoryName}
 *          - {id}
 *              {typeName}
 *
 * Папки, в которых должно быть гарантировано 1 картинка, заливаются с флагом clearOld */

const fileUpload = function (app, passport, rootDirectory) {
  const imagesAbsoluteDirectory = `${rootDirectory}/public/images`

  const createImageFolderPath = function ({ categoryName, id, typeName }) {
    return `${imagesAbsoluteDirectory}/${categoryName}/${id}/${typeName}`
  }

  const fileFilter = (req, file, cb) => {
    const { categoryName, id, typeName } = req.body
    if(!categoryName || !id || !typeName){
      console.log(`Нет полей categoryName, id, typeName`)
      cb(null, false);
    }
    else{
      cb(null, true);
    }
  }

  const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
      const { categoryName = 'tmp', id = 'id', typeName = 'type', clearOld } = req.body

      const currentAbsoluteImagePath = createImageFolderPath({ categoryName, id, typeName })
      console.log(currentAbsoluteImagePath)

      if (clearOld && fs.exists(currentAbsoluteImagePath)) {
        fs.readdir(currentAbsoluteImagePath, function(err, items) {
          console.log(items)
          items && _.size(items) && _.forEach(items, item => {
            console.log(item)
            fs.unlink(`${currentAbsoluteImagePath}/${item}`)
          })
        })
      }
      mkdirpAsync(currentAbsoluteImagePath)
        .then(() => {
          cb(null, currentAbsoluteImagePath)
        })
    },
    filename: (req, file, cb) =>{
      cb(null, file.originalname)
    }
  })

  app.use((req, res, next) => {
    // const pass = passport.authenticate('jwt', { session: false })
    // pass(req, res, next)

    const handler = multer({storage:storageConfig, fileFilter}).single("filedata")
    handler(req, res, next)
  })

  app.post("/upload", function (req, res, next) {
    const pass = passport.authenticate('jwt', { session: false })
    pass(req, res, next)

    let fileData = req.file
    const { categoryName, id, typeName } = req.body

    if(!fileData || !categoryName || !id || !typeName)
      res.status(500).send({ message: 'Ошибка при загрузке файла, или нет полей categoryName, id, typeName' })
    else {
      const filePath = `images/${categoryName}/${id}/${typeName}/${fileData.originalname}`
      res.send({
        message: 'Успешно загружено',
        filePath
      })
    }
  })
  app.post("/delete-image-folder", function (req, res, next) {
    const pass = passport.authenticate('jwt', { session: false })
    pass(req, res, next)

    const { categoryName, id } = req.body
    const folder = `${categoryName}/${id}`
    deleteImageFolder(folder, rootDirectory)
      .then(() => {
        res.send(`Успешно удалено ${folder}`)
      })
      .catch(e => {
        res.status(500).send(e)
      })
  })
}

module.exports = fileUpload
