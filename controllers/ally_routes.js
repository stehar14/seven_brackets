var db = require('../models');
var Sequelize = require('sequelize');

module.exports = function(app) {
  app.post('/newAlly', function(req, res) {
    db.Ally.create(req.body)
  })
  app.get('/getAllies/:user', function(req, res){
    const Op = Sequelize.Op;
    console.log(req.params.user)
    db.Ally.findAll({
      where: {
        [Op.or]: [{Ally1: req.body}, {Ally2: req.body}]
      }
    }).then(function(allies) {
      res.json(allies)
    })
  })
};

