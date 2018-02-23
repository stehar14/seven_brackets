module.exports = function(app, path) {
  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../views/home.html'));
  })

  app.get('/profile', function(req, res) {
    if(req.body.connected){
      console.log(req.body.connected)
    res.render('index')
    } else {
      res.redirect('/')
    }
  })

}
