const {
  FIELD_ANNOTATION,
  FIELD_IMAGES,
  FIELD_TEXT,
  FIELD_TITLE,
  FIELD_DATE,
  FIELD_PARENT_ID
} = require('../../src/constants/WORK_FIELDS_NAME')

const workPath = '/report/'
const bodyParser = require('body-parser')

const urlencodedParser = bodyParser.urlencoded({ extended: false })

const ARRAY = [
  FIELD_DATE, FIELD_TITLE, FIELD_ANNOTATION, FIELD_TEXT, FIELD_IMAGES, FIELD_PARENT_ID
]

const createWorkArray = (data = {}) => {
  const arr = ARRAY.map(item => data[item] || '')
  arr[0] = new Date().toString()
  return arr
}
const createWorkString = (data) => {
  const keys = Object.keys(data)
  let str = ''
  keys.forEach((key) => {
    if (data[key] && key !== 'id') {
      str += `${key}='${data[key]}', `
    }
  })
  return str.substring(0, str.length - 2)
}

const createFilterParams = (data) => {
  const keys = Object.keys(data)
  let str = ''
  keys.forEach(key => {
    str += `${key}='${data[key]}', `
  })
  return str.substring(0, str.length - 2)
}

module.exports = function (app, pool) {
  // GET ALL
  app.get(workPath, (req, res) => {
    console.log(req.query)
    const params = Object.keys(req.query).length ? `WHERE ${createFilterParams(req.query)}` : ''
    console.log(params)
    pool.query(`SELECT * FROM reports ${params}`, function (err, data) {
      if (err) return console.log(err)
      res.send(data)
    })
  })

  // ADD NEW
  app.post(workPath, urlencodedParser, (req, res) => {
    const data = req.body
    const resData = createWorkArray(data)
    const listResData = ARRAY.join(', ')
    const sql = `INSERT INTO reports (${listResData}) VALUES(?,?,?,?,?,?)`
    console.log(resData)
    pool.query(sql, resData, function (err, data) {
      if (err) return console.log(err)
      res.send(data)
    })
  })

  // UPDATE
  app.post(workPath + ':id', urlencodedParser, (req, res) => {
    const data = req.body
    const sql = `UPDATE reports SET ${createWorkString(data)} WHERE id LIKE ${req.params.id}`
    console.log(sql)
    pool.query(sql, function (err, data) {
      if (err) return console.log(err)
      res.send(data)
    })
  })

  // GET SINGLE
  app.get(workPath + ':id', (req, res) => {
    const sql = `SELECT * FROM reports WHERE id = ${req.params.id} LIMIT 1`
    pool.query(sql, function (err, data) {
      if (err) return console.log(err)
      data.content && console.log(JSON.parse(data.content))
      res.send(data)
    })
  })

  // DELETE
  app.delete(workPath + ':id', (req, res) => {
    const sql = `DELETE FROM reports WHERE id=${req.params.id}`
    pool.query(sql, function (err, data) {
      if (err) return console.log(err)
      res.send(data)
    })
  })
}
