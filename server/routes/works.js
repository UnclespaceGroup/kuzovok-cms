const workPath = '/work/'
const bodyParser = require("body-parser")

const urlencodedParser = bodyParser.urlencoded({extended: false});

const createWorkArray = (data) => ([
    data.title || '',
    data.text || '',
    data.annotation || '',
    data.status || '',
    data.images || '',
    data.date || new Date().toString(),
    data.mainImages || ''
  ])
const createWorkString = (data) => {
  const keys = Object.keys(data)
  let str = ''
  keys.forEach((key) => {
    if (data[key] && key !== 'id') str += `${key}="${data[key]}", `
  })
  return str.substring(0, str.length - 2)
}

module.exports = function(app, pool) {
  // GET ALL
  app.get(workPath, (req, res) => {
    pool.query("SELECT * FROM works", function(err, data) {
      if(err) return console.log(err);
      res.send(data)
    });
  })

  // ADD NEW
  app.post(workPath, urlencodedParser, (req, res) => {
    console.log('req', req.body.banner)
    const data = req.body
    const sql = `INSERT INTO works(title, text, annotation, status, images, date, mainImages) VALUES(?,?,?,?,?,?,?)`
    const resData = createWorkArray(data)
    pool.query(sql, resData, function(err, data) {
      if(err) return console.log(err);
      res.send(data)
    });
  })

  // update
  app.post(workPath + ":id", urlencodedParser, (req, res) => {
    const data = req.body
    const sql = `UPDATE works SET ${createWorkString(data)} WHERE id LIKE ${req.params.id}`
    console.log(sql)
    pool.query(sql, function(err, data) {
      if(err) return console.log(err);
      res.send(data)
    });
  })

  // GET
  app.get(workPath + ":id", (req, res) => {
    const sql = `SELECT * FROM works WHERE id = ${req.params.id} LIMIT 1`
    pool.query(sql, function(err, data) {
      if(err) return console.log(err);
      data.content && console.log(JSON.parse(data.content))
      res.send(data)
    });
  })

  // DELETE
  app.delete(workPath + ':id', (req, res) => {
    const sql = `DELETE FROM works WHERE id=${req.params.id}`
    pool.query(sql, function(err, data) {
      if(err) return console.log(err);
      res.send(data)
    });
  })
}
