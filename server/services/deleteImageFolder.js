const fs = require('fs-extra')

const deleteImageFolder = async function (path, rootDirectory) {
  const imagesAbsoluteDirectory = `${rootDirectory}/public/images/`

  await fs.remove(imagesAbsoluteDirectory + path, err => {
    console.error(err ? err : `Папка ${path} успешно удалена`)
  })
}
module.exports = deleteImageFolder
