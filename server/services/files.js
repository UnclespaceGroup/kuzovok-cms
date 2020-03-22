function getFilePath (file) {
  return file.split('__SERVER_PATH__').pop()
}

function getFileName (file) {
  return file.split('/').pop()
}

function getFilePathOnly (file) {
  if (!file) return ''
  const fullPath = file.split('__SERVER_PATH__').pop()
  const pathArray = fullPath.split('/')
  return pathArray.slice(0, pathArray.length - 2).join('/')
}

module.exports = {
  getFilePath,
  getFileName,
  getFilePathOnly
}
