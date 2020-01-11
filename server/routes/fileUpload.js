
// const CheckAuthorize = require('../services/checkAuthorize')
const multer  = require("multer")
const mkdirp = require('mkdirp')
const fs = require('fs-extra')

const fileUpload = function (app, passport, rootDirectory) {
  const imagesFolderName = 'images'
  const imagesAbsoluteDirectory = `${rootDirectory}/public/${imagesFolderName}`

  const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
      const { folder: currentFolder, clearOld } = req.body

      if (clearOld && currentFolder) {
        const deletingPath = `${imagesAbsoluteDirectory}/${currentFolder}`
        fs.readdir(deletingPath, function(err, items) {
          items.forEach(item => {
            fs.unlink(`${deletingPath}/${item}`)
          })
        })
      }

      // Если есть поле folder, значит нужно пихать в подпапку
      if (currentFolder) mkdirp(`${imagesAbsoluteDirectory}/${currentFolder}`)
      console.log(imagesAbsoluteDirectory)
      const currentPath = currentFolder ? `${imagesAbsoluteDirectory}/${currentFolder}` : imagesAbsoluteDirectory
      cb(null, currentPath)
    },
    filename: (req, file, cb) =>{
      cb(null, file.originalname)
    }
  })
  app.use(multer({storage:storageConfig}).single("filedata"))
  app.post("/upload", function (req, res, next) {
    let fileData = req.file
    // Если есть поле folder, то нужно брать из подпапки
    const folder = req.body.folder

    if(!fileData)
      res.send({ message: 'Ошибка при загрузке файла' })
    else {
      const filePath = folder ? `${imagesFolderName}/${folder}/${fileData.originalname}` : `${imagesFolderName}/${fileData.originalname}`
      res.send({
        message: 'Успешно загружено',
        filePath
      })
    }
  })
}

module.exports = fileUpload
