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
    res.render('index', req.body)
    // } else {
    //   res.sendFile(path.join(__dirname + '/../public/waiting.html'));
    // }
  })
  
  app.get('/threads', function(req, res){
    console.log('/threads get request received')
    // if(req.body.connected){
      db.Thread.findAll({})
      .then(function (dbThread) {
        // checkCategory(dbThread)
        res.render('forum', {threads: dbThread})
      })
    // } else {
    //   res.sendFile(path.join(__dirname + '/../public/waiting.html'));

    // if(req.body.connected){
    //   console.log(req.body.connected)
    res.render('index')
    // } else {
    //   res.redirect('/')

    // }
  })
 

}

// Write categories -- 
// function checkCategory(array) {
//   array.forEach(element => {
//     if (element.CategoryId == 1) {
//       element.CategoryId
//     }
//   });
// }