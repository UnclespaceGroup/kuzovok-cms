const {
  FIELD_ANNOTATION, FIELD_BANNER,
  FIELD_STATUS,
  FIELD_TEXT,
  FIELD_TITLE,
  FIELD_DATE,
  FIELD_DATA,
  FIELD_TAGS
} = require('../../src/constants/WORK_FIELDS_NAME')
const workPath = '/work/'

const createWorkArray = (data = {}) => ([
  data[FIELD_TITLE] || '',
  data[FIELD_ANNOTATION] || '',
  data[FIELD_TEXT] || '',
  data[FIELD_STATUS] || '',
  data[FIELD_DATE] || new Date().toString(),
  data[FIELD_BANNER] || '',
  data[FIELD_DATA] || '',
  data[FIELD_TAGS] || ''
])
const createWorkString = (data) => {
  const keys = Object.keys(data)
  let str = ''
  keys.forEach((key) => {
    if (data[key] && key !== 'id') str += `${key}="${data[key]}", `
  })
  return str.substring(0, str.length - 2)
}

module.exports = function (app, pool, authenticate) {

  // GET ALL
  app.get(workPath, (req, res) => {
    console.log('works')
    pool.query('SELECT * FROM works', function (err, data) {
      if (err) return console.log(err)
      if (!data) return { message: 'return null, err' }
      res.send(data)
    })
  })

  // ADD NEW
  app.post(workPath, authenticate, (req, res) => {
    const data = req.body
    const sql = `INSERT INTO works(${FIELD_TITLE}, ${FIELD_ANNOTATION}, ${FIELD_TEXT}, ${FIELD_STATUS}, ${FIELD_DATE}, ${FIELD_BANNER}, ${FIELD_DATA}, ${FIELD_TAGS}) VALUES(?,?,?,?,?,?,?,?)`
    const resData = createWorkArray(data)
    pool.query(sql, resData, function (err, data) {
      if (err) return console.log(err)
      res.send(data)
    })
  })

  // update
  app.post(workPath + ':id', authenticate, (req, res) => {
    const data = req.body
    const sql = `UPDATE works SET ${createWorkString(data)} WHERE id LIKE ${req.params.id}`
    console.log(sql)
    pool.query(sql, function (err, data) {
      if (err) return console.log(err)
      res.send(data)
    })
  })

  // GET SINGLE
  app.get(workPath + ':id', (req, res) => {
    const sql = `SELECT * FROM works WHERE id = ${req.params.id} LIMIT 1`
    pool.query(sql, function (err, data) {
      if (err) return console.log(err)
      data.content && console.log(JSON.parse(data.content))
      res.send(data)
    })
  })

  // DELETE
  app.delete(workPath + ':id', authenticate, (req, res) => {
    const sql = `DELETE FROM works WHERE id=${req.params.id}`
    pool.query(sql, function (err, data) {
      if (err) return console.log(err)
      res.send(data)
    })
  })
}
