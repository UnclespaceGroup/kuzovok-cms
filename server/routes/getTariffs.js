module.exports = function(app, pool) {
  // app.get("/", (req, res) => {
  //   pool.query("SELECT * FROM users", function(err, data) {
  //     if(err) return console.log(err);
  //     console.log(data)
  //     res.send(data)
  //   });
  // })
  app.get("/tariffs/", (req, res) => {
    pool.query("SELECT * FROM tariffs", function(err, data) {
      if(err) return console.log(err);
      res.send(data)
    });
  })
  app.get("/add/", (req, res) => {
    pool.query("INSERT INTO users (id, name) VALUES ('6', 'Денис карадениз')", function(err, data) {
      if(err) return console.log(err);
      res.send(data)
    });
  })
  app.get("/tariffs/:id", (req, res) => {
    pool.query(`SELECT * FROM tariffs WHERE id = ${req.params.id} LIMIT 1`, function(err, data) {
      if(err) return console.log(err);
      data.content && console.log(JSON.parse(data.content))
      res.send({
        title: data[0].title,
        content: JSON.parse(data[0].content)
      })
    });
  })
}
