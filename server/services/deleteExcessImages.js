const fs = require('fs')
const fsExtra = require('fs-extra')
const removeSlashes = require('./removeSlashes')
const _ = require('lodash')

const deleteExcessImages = async (
  {
    items = [],
    path,
    rootDirectory
  } = {}) => {
  if (!rootDirectory) {
    console.err('Нет rootDirectory')
    return
  }

  const formattedPath = path.replace('/', '\\')
  const imagesAbsoluteDirectory = `${rootDirectory}\\public\\` + removeSlashes(formattedPath) + '\\'
  console.log('imagesAbsoluteDirectory', imagesAbsoluteDirectory)
  fs.readdir(imagesAbsoluteDirectory, function (err, files = []) {
    const deletedItems = _.difference(files, items)

    console.log('deletedItems', deletedItems)


    deletedItems.forEach(item => {
      const currentFilePath = imagesAbsoluteDirectory + item
      fsExtra.remove(currentFilePath, err => {
        console.error(err ? err : `Файл ${currentFilePath} успешно удален`)
      })
    })
  })
}
module.exports = deleteExcessImages
