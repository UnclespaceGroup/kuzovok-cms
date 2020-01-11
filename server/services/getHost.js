const url = require('url')

const getHost = function (req) {
  url.format({
    protocol: req.protocol,
    host: req.get('host')
  })
}
module.exports = getHost
