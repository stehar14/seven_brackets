var db = require('../models');

module.exports = function(app) {
  app.post('/newAlly', function(req, res) {
    db.Ally.create(req.body)
  })
  app.get('/getAllies', function(req, res){
    db.Ally.findAll({}).then(function(allies) {
      res.json(allies)
    })
  })
};

