const removeSlashes = (path) => {
  return path.split('/').filter(Boolean).join('/')
}
module.exports = removeSlashes
