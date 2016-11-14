
// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose'); 

var db = require('./config/db.js');
mongoose.connect(db.url);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8090; 

require('./app/routes.js') (app);

app.listen(port);
console.log('Magic happens on port ' + port);

exports = module.exports = app;
