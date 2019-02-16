var db = require('../models');

module.exports = function(app, path) {
  //HOME PAGE
  app.get('/', function(req, res) {
    console.log('/ get request received')
    res.sendFile(path.join(__dirname + '/../public/home.html'));
  })
  //PROFILE
  app.get('/profile/:id', function(req, res) {
    console.log('/profile get request received')
    console.log(req.params.id)
    res.render('profile', {user_token: req.params.id})
  })
  //SPECIFIC FORUM CATEGORY
  app.get('/threads/:userID/category/:id', function (req, res) {
    console.log('/api/threads/' + req.params.id + ' get request received')
    var category_id= req.params.id;
    
    db.Thread.findAll({
      include : [db.User, db.Reply],
      where: {
        CategoryId: category_id
      }
    }).then(function (dbThread) {
      res.render('forum', {threads: dbThread, user_id : req.params.userID })
    })
  })
  //ALL THREADS REDIRECT FROM PROFILE
  app.get('/threads/:id', function(req, res){
    console.log('/threads get request received')
    // if(req.body.connected){
    db.Thread.findAll({
      include : [db.User, db.Reply]
    })
    .then(function (dbThread) {
      // checkCategory(dbThread)
      res.render('forum', {threads: dbThread, user_id: req.params.id})
    })
  })
  //ALL THREADS WITH MODAL POP UP FROM PROFILE
  app.get('/threads/modal/:id', function(req, res){
    console.log('/threads/modal get request received')
    db.Thread.findAll({
      include : [db.User, db.Reply]
    })
    .then(function (dbThread) {
      res.render('forum', {threads: dbThread,user_id: req.params.id})
    })
  });
  //REDIRECTS HOME IF NO id in req.params
  app.get('/threads', function(req, res){
    console.log('/threads get request received')
    // if(req.body.connected){
      res.sendFile(path.join(__dirname + '/../public/home.html'));
  });
  //REDIRECTS HOME IF NO id in req.params
  app.get('/threads/modal/', function(req, res){
    console.log('/threads/modal get request received')
    res.sendFile(path.join(__dirname + '/../public/home.html'));
  });
  //REDIRECTS HOME IF NO id in req.params
  app.get('/threads/category/:id', function (req, res) {
    res.sendFile(path.join(__dirname + '/../public/home.html'));;
  });

  app.get("/api/showReplies", function(req,res){
    db.Reply.findAll({
        include : [db.User, db.Thread]
    }).then(function(dbReply){
       res.render('forum', {replies : dbReply})
    })
  });
}