var db = require('../models');
module.exports = function (app) {
  
  // Thread routes  
  // Get all threads - Get / findAll
  app.get('/api/threads', function (req, res) {
    
    console.log('/api/threads get request received')
    db.Thread.findAll({
      include : [db.User , db.Reply]
    })
      .then(function (dbThread) {
       res.json(dbThread)
      })
  })
  // Get Thread by id
  app.get('/api/threads/:id', function (req, res) {
    console.log('/api/threads/' + req.params.id + ' get request received')
    var thread_id = req.params.id;
    db.Thread.findAll({
<<<<<<< HEAD
      include : [db.User, db.Reply],
=======
      include : [db.User , db.Reply],
>>>>>>> master
      where: {
        id: thread_id
      }
    }).then(function (dbThread) {
      res.json(dbThread)
      // res.render? for the profile page?
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
  app.post('/api/threadDelete', function (req, res) {
    console.log('/api/threadDelete request')
    console.log(req.body.id)
    db.Thread.destroy({
      where: {
        id: req.body.id
      }
    }).then(function (dbThread) {
      res.json(dbThread)
    })
  })
  // Confimed solved - Put / update
  app.post('/api/threadSolved', function (req, res) {
    console.log('/api/threadSolved request')
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

  // Edit Thread
  app.post('/api/threadUpdate', function (req, res) {
    console.log(req.body)
    console.log('/api/threadUpdate request')
    
    db.Thread.update({
      body: req.body.body
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


