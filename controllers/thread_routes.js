var db = require('../models');
module.exports = function (app) {
  
  // Thread routes  
  // Get all threads - Get / findAll
  app.get('/api/threads', function (req, res) {
    console.log('/api/threads get request received')
    db.Thread.findAll({})
      .then(function (dbThread) {
        res.json(dbThread)
        console.log(dbThread[0].dataValues.id)
        // res.render('index', dbThread)
      })
  })
  // Get Thread by id
  app.get('/api/threads/:id', function (req, res) {
    console.log('/api/threads/' + req.params.id + ' get request received')
    var thread_id = req.params.id;
    db.Thread.findAll({
      where: {
        id: thread_id
      }
    }).then(function (dbThread) {
      res.json(dbThread)
    })
  })
  // New Thread - Post / create
  app.post('/api/threads', function (req, res) {
    console.log('/api/threads post request received')
    db.Thread.create(req.body).then(function (dbThread) {
      res.json(dbThread)
    })
  })
  // Delete thread - Delete / destroy
  app.delete('/api/threads', function (req, res) {
    console.log('/api/threads delete request')
    db.Thread.destroy({
      where: {
        id: req.body.id
      }
    }).then(function (dbThread) {
      res.json(dbThread)
    })
  })
  // Confimed solved - Put / update
  app.put('/api/threads', function (req, res) {
    console.log('/api/threads put request')
    db.Thread.update({
      solved: 1
    },
      {
        where: {
          id: req.body.id
        }
      }).then(function (dbThread) {
        res.json(dbThread)
      })
  })
}


