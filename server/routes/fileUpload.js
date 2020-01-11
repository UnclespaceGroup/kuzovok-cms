
// const CheckAuthorize = require('../services/checkAuthorize')
const multer  = require("multer")
const mkdirp = require('mkdirp')
const fs = require('fs-extra')

const fileUpload = function (app, passport, rootDirectory) {
  const rootFolderName = 'images'
  const fileDirectory = `${rootDirectory}/public/${rootFolderName}/`
  const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
      const { folder: currentFolder, clearOld } = req.body

      if (clearOld && currentFolder) {
        console.log('clear')
        fs.remove(`${fileDirectory}`, err => {
          console.log('fail removing', err)
        })
      }

      // Если есть поле folder, значит нужно пихать в подпапку
      if (currentFolder) mkdirp(`${fileDirectory}/${currentFolder}`)
      const currentPath = currentFolder ? `${fileDirectory}/${currentFolder}` : fileDirectory
      cb(null, currentPath)
    },
    filename: (req, file, cb) =>{
      // если есть imageName, то он и имя
      const imageName = req.body.imageName

      cb(null, getFileFullName(imageName, file.originalname))
    }
  })
  app.use(multer({storage:storageConfig}).single("filedata"))
  app.post("/upload", function (req, res, next) {
    let fileData = req.file
    // Если есть поле folder, то нужно брать из подпапки
    const folder = req.body.folder
    // если есть imageName, то он и имя
    const imageName = req.body.imageName

    if(!fileData)
      res.send({ message: 'Ошибка при загрузке файла' })
    else {
      const filePath = folder ? `${rootFolderName}/${folder}/${getFileFullName(imageName, fileData.originalname)}` : `${rootFolderName}/${getFileFullName(imageName, fileData.originalname)}`
      res.send({
        message: 'Успешно загружено',
        filePath
      })
    }
  })
}

const getFileFullName = function (imageName, originalName) {
  if (!imageName) return originalName
  else {
    return imageName + originalName.slice(originalName.lastIndexOf('.'))
  }
}

module.exports = fileUpload
