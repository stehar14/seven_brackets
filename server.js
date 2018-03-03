var express = require("express");
var bodyParser = require("body-parser");
var method = require('method-override');
var path = require('path')

// Set port for server = 8585
var PORT = process.env.PORT || 3000;

var app = express();


var db = require("./models");

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static('public'));
//app.use('/assets', express.static('public/assets'))
//app.use('/assets/images', express.static('public/assets/images'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
require("./controllers/user_routes.js")(app);
require("./controllers/thread_routes.js")(app);
require("./controllers/reply_routes.js")(app);
require("./controllers/ally_routes.js")(app);
require("./controllers/html_routes.js")(app, path)

db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

