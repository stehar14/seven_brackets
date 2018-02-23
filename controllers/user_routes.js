var db = require('../models');

module.exports = function(app) {
// User routes - AJAX / Seq command
  
//  Login - Get / findAll // get req from fb possibly and render info
  
//  Add new user - Post / create
   app.post("api/newUser", function(req,res){
     db.User.create({
      userName : req.body.userName,
      rating : null,
      img_url : req.body.img_url,
      fbtoken: req.body.fbtoken
  }).then(function(userTable){
    res.json(userTable)
  
    });
  });
   
//  Search user - Get / findAll
  app.get("api/findUser/:id", function(req,res){
      db.User.findOne({
        where : {
          id : req.params.id
        },
      }).then(function(dbUser){
        res.json(dbUser);
      })
  })
//  search all users? Get / findAll
   app.get("api/findAllUsers", function(req,res){
     db.User.findAll({
   }).then(function(dbUser){
     res.json(dbUser);
   })
  });
//  update rating - Put / update
   app.put("api/rating", function(req,res){
     db.User.update({
       rating : req.body.rating
     },
     {
       where : {
       id : req.body.id
      }
   }).then(function(dbUser){
     res.json(dbUser)
   })
  });
//  change pic? - Put / update
app.put("api/updateImg", function(req,res){
     
  db.User.update({
    img : img 
  },
  {
    where : {
    id : req.body.id 
   }
}).then(function(dbUser){
  res.json(dbUser)
})
});

};
