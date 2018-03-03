var db = require('../models');

module.exports = function(app, path) {
  app.get('/', function(req, res) {
    console.log('/ get request received')
    res.sendFile(path.join(__dirname + '/../public/home.html'));
  })

  app.get('/profile/:id', function(req, res) {
    console.log('/profile get request received')
    console.log(req.params.id)
    res.render('profile', {user_token: req.params.id})
  })
  
  app.get('/threads/category/:id', function (req, res) {
    console.log('/api/threads/' + req.params.id + ' get request received')
    var category_id= req.params.id;
    db.Thread.findAll({
      include : [db.User, db.Reply],
      where: {
        CategoryId: category_id
      }
    }).then(function (dbThread) {
      res.render('forum', {threads: dbThread})
      // res.render? for the profile page?
    })
  })
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
    // } else {
    //   res.sendFile(path.join(__dirname + '/../public/waiting.html'));

    // if(req.body.connected){
    //   console.log(req.body.connected)
    
    // } else {
    //   res.redirect('/')

    // }
  })
  app.get('/threads/modal/:id', function(req, res){
    console.log('/threads/modal get request received')
    // if(req.body.connected){
      db.Thread.findAll({
        include : [db.User, db.Reply]
      })
      .then(function (dbThread) {
        // checkCategory(dbThread)
        res.render('forum', {threads: dbThread,user_id: req.params.id})
      })

    });
 
  
  
  app.get("/api/showReplies", function(req,res){
    db.Reply.findAll({
        include : [db.User, db.Thread]
    }).then(function(dbReply){
       res.render('forum', {replies : dbReply})
    })
  });

}

// Write categories -- 
// function checkCategory(array) {
//   array.forEach(element => {
//     if (element.CategoryId == 1) {
//       element.CategoryId
//     }
//   });
// }

