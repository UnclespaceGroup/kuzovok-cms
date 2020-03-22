const multer  = require("multer")
const deleteImageFolder = require("../services/deleteImageFolder")
const fs = require('fs-extra')
const _ = require('lodash')
const mkdirpAsync = require('async-mkdirp')

const fileUpload = function (app, passport, rootDirectory) {
  const imagesAbsoluteDirectory = `${rootDirectory}/public/images`

  const createImageFolderPath = function (path) {
    return `${imagesAbsoluteDirectory}/${path}`
  }

  const fileFilter = (req, file, cb) => {
    const { path } = req.body
    if(!path){
      console.log(`Нет поля path`)
      cb(null, false);
    }
    else{
      cb(null, true);
    }
  }

  const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
      const { path, clearOld } = req.body

      const currentAbsoluteImagePath = createImageFolderPath(path)

      if (clearOld && fs.exists(currentAbsoluteImagePath)) {
        fs.readdir(currentAbsoluteImagePath, function(err, items) {
          items && _.size(items) && _.forEach(items, item => {
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
    // const pass = passport.authenticate('jwt', { session: false })
    // pass(req, res, next)

    let fileData = req.file
    const { path } = req.body

    if(!fileData || !path)
      res.status(500).send({ message: 'Ошибка при загрузке файла, или нет полей categoryName, id, typeName' })
    else {
      const _path = '__SERVER_PATH__/images/' + path.split('/').filter(Boolean).join('/')
      const filePath = `${_path}/${fileData.originalname}`
      res.send({
        message: 'Успешно загружено',
        filePath
      })
    }
  })


  app.post("/delete-image-folder", function (req, res, next) {
    const pass = passport.authenticate('jwt', { session: false })
    pass(req, res, next)

    const { path } = req.body
    const folder = `${path}`
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
