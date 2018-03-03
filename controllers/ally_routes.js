var db = require('../models');



module.exports = function(app) {

  app.get("/showAllyTable", function(req,res){
    db.Ally.findAll({
        
    }).then(function(dbAlly){
        res.json(dbAlly);
    })
});

app.post('/newAlly', function(req, res) {
    db.Ally.create(req.body)
  })


}


  
  
  
  
  
  
  
  
  