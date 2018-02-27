var db = require('../models');

module.exports = function(app, path) {
  app.get('/', function(req, res) {
    console.log('/ get request received')
    res.sendFile(path.join(__dirname + '/../public/home.html'));
  })

  app.get('/profile', function(req, res) {
    console.log('/profile get request received')
    if(req.body.connected){
      console.log(req.body.connected)
    res.render('index', req.body.user)
    } else {
      res.sendFile(path.join(__dirname + '/../public/waiting.html'));
    }
  })
  
  app.get('/threads', function(req, res){
    console.log('/threads get request received')
    if(req.body.connected){
      db.Thread.findAll({})
      .then(function (dbThread) {
        res.render('index', dbThread)
      })
    } else {
      res.sendFile(path.join(__dirname + '/../public/waiting.html'));
    }
  })
 

}
