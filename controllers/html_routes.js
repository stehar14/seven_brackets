module.exports = function(app, path) {
  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/home.html'));
  })

  app.get('/profile', function(req, res) {
    if(req.body.connected){
      console.log(req.body.connected)
    res.render('index')
    } else {
      res.redirect('/')
    }
  })




  app.get("/api/findAllUsers", function(req,res){
    db.User.findAll({
     include : [db.Reply, db.Thread]
  }).then(function(dbUser){
    res.render("userpage", {user : dbUser} )
   
  })
  });
  
  
  app.get("/api/showReplies", function(req,res){
    db.Reply.findAll({
        include : [db.User, db.Thread]
    }).then(function(dbReply){
       res.render("replies", {replies : dbReply})
    })
  });

}










