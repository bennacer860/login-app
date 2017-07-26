var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
var validateUser = require('./validate-user');
var db = require('./fake-db');

// Server setup:
var app = express();
app.use(express.static('client'));
app.use(bodyParser.urlencoded({ extended: false }));

// Render the Create Account page:
app.get('/', function (req, res) {
  res.sendFile(path.resolve('client/create-account.html'));
});

// Handle form submissions from the Create Account page:
app.post('/create-account', function (req, res) {
  var errors = validateUser(req.body);
  console.log("create-account db");
  db.print();
  db.insert({"email" : "tt@tt.com", "password" : "ferfe"});
  db.print();
  if (errors) {
    res.status(400).send({
      success: false,
      errors: errors
    });
  } else {
    res.status(200).send({ success: true });
  }
});

// Run the server:
app.listen(3000, function () {
  console.log('Server is running! Visit localhost:3000 in your browser.');
});
