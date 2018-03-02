var db = require('../models');

module.exports = function(app, path) {
  app.get('/', function(req, res) {
    console.log('/ get request received')
    res.sendFile(path.join(__dirname + '/../public/home.html'));
  })

  app.get('/profile', function(req, res) {

    console.log('/profile get request received')
    // if(req.body.connected){
    //   console.log(req.body.connected)
    res.render('profile', req.body)
    // } else {
    //   res.sendFile(path.join(__dirname + '/../public/waiting.html'));
    // }
  })
  
  app.get('/threads/category/:id', function (req, res) {
    console.log('/api/threads/' + req.params.id + ' get request received')
    var category_id= req.params.id;
    db.Thread.findAll({
      where: {
        CategoryId: category_id
      }
    }).then(function (dbThread) {
      res.render('forum', {threads: dbThread})
      // res.render? for the profile page?
    })
  })
  app.get('/threads', function(req, res){
    console.log('/threads get request received')
    // if(req.body.connected){
      db.Thread.findAll({
        include : [db.User, db.Reply]
      })
      .then(function (dbThread) {
        // checkCategory(dbThread)
        res.render('forum', {threads: dbThread})
      })
    // } else {
    //   res.sendFile(path.join(__dirname + '/../public/waiting.html'));

    // if(req.body.connected){
    //   console.log(req.body.connected)
    
    // } else {
    //   res.redirect('/')

    // }
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

