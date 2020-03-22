const fs = require('fs-extra')
const removeSlashes = require('./removeSlashes')

const deleteImageFolder = async function (path, rootDirectory) {
  if (!rootDirectory) console.warn('Не передана root дирректория')

  const formattedPath = path.replace('/', '\\')

  const imagesAbsoluteDirectory = `${rootDirectory}\\public\\` + removeSlashes(formattedPath)

  console.log(imagesAbsoluteDirectory)
  await fs.remove(imagesAbsoluteDirectory, err => {
    console.error(err ? err : `Папка ${path} успешно удалена`)
  })
}

module.exports = deleteImageFolder
