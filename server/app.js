var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
var validateUser = require('./validate-user');
var db = require('./fake-db');

// Server setup:
var app = express();
app.use(express.static('client'));
app.use(bodyParser.urlencoded({ extended: false }));
//
app.get('/user/:email', function(req, res) {
  res.sendFile(path.resolve('client/user-account.html'));
});

app.get('/user-info/:email', function(req, res) {
  // res.sendFile(path.resolve('client/user-account.html'));
  // res.send('user ' + req.params.id);
  try{
    console.log(req.params.email);
    user = db.get(req.params.email);
    console.log(user);
    res.status(200).send({ success: true, user: user});
  }
  catch(error){
    errors = [ error.message ];
    res.status(400).send({
      success: false,
      errors: errors
    });
  }
});

// Render the Create Account page:
app.get('/', function (req, res) {
  res.sendFile(path.resolve('client/create-account.html'));
});

// Handle form submissions from the Create Account page:
app.post('/create-account', function (req, res) {
  errors = validateUser(req.body);
  console.log(req.body);
  console.log("create-account db");
  db.print();
  // try{
  //       console.log("insert account");
  // 	db.insert({"email" : req.body.email, "password" : req.body.password});
  // }
  // catch (error) {
  //    console.log(error.message);
  //   if (errors){
  //     console.log(errors);
  //     errors.push(error.message);
  //   }else{
  //     errors = [];
  //     console.log("add error message");
  //     console.log(error);
  //     errors.push(error.message);
  //   }
  // }
  // console.log("error");
  if (errors) {
    res.status(400).send({
      success: false,
      errors: errors
    });
  } else {
    try{
      email = req.body.email;
      // this could be avoided by having insert return the user after success
      db.insert({"email" : email, "password" : req.body.password});
      user = db.get(email);
      res.status(200).send({ success: true, user: user });
    }
    catch(error){
      errors = [ error.message ]; 
      res.status(400).send({
        success: false,
        errors: errors
      });
    }
  }
});

// Run the server:
app.listen(3000, function () {
  console.log('Server is running! Visit localhost:3000 in your browser.');
});
