var db = require('../models');
module.exports = function (app) {


  // Thread routes  
  // Get all threads - Get / findAll
  app.get('/api/threads', function (req, res) {
    db.Thread.findAll({})
      .then(function (dbThread) {
        res.json(dbThread)
      })
  })
  // Get Thread by id
  app.get('/api/threads/:id', function (req, res) {
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
    db.Thread.create(req.body).then(function (dbThread) {
      res.json(dbThread)
    })
  })
  // Delete thread - Delete / destroy
  app.delete('/api/threads', function (req, res) {
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
    db.Thread.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function (dbThread) {
        res.json(dbThread)
      })
  })
}


