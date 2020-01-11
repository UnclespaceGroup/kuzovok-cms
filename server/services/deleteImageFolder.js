const fs = require('fs-extra')

const deleteImageFolder = function (folder, rootDirectory) {
  const imagesAbsoluteDirectory = `${rootDirectory}/public/images/`

  fs.remove(imagesAbsoluteDirectory + folder, err => {
    console.error(err ? err : 'Папка успешно удалена')
  })
}
module.exports = deleteImageFolder
