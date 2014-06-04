var mongoose = require('mongoose');
var Users = require('../models/user');
var Houses = require('../models/house');

var loggedIn = require('../middleware/loggedIn.js');
var adminLoggedIn = require('../middleware/adminLoggedIn.js');

module.exports = function(app) {

  // ************** Open API

  app.get('/users/:id', function (req, res, next) {
    Users.findOne({_id: req.params.id}).exec(function(err, user){
      if (!err) {
        res.json(user.profile);
      } else {
        res.statusCode = 500;
      };
    });
  });

  
  // ************** HomeGefest Administrator only API 
  
  //users list
  app.get('/users', adminLoggedIn, function (req, res, next) {
    Users.find({},{"profile.name":1, "email": 1, "created":1}).sort({created: -1}).exec(function(err, users){
      if (err) throw next(err);
      res.json(users);
    });
  })

  //update user houses list
  app.post('/users/:id', adminLoggedIn, function (req, res) {
    return Users.findOne({_id: req.params.id}).exec(function (err, user) {
      user.profile = req.body;
      user.save(function (err, profile) {
        if (err || !profile) {
          res.json(err);
        } else {
          res.json(profile);
        }
      })            
    });
  });

  
  // **************** Current session User only API
  
  //get profile  TODO or not?
  app.get('/user/profile', loggedIn, function (req, res, next) {
    return Users.findOne({email: req.session.email}).exec(function (err, user) {
      if (!err) {
        res.json(user.profile)
      } else {
        res.statusCode = 500;
      };

    });
  });

  //update profile
  app.post('/user/profile', loggedIn, function (req, res) {
    return Users.findOne({email: req.session.email}).exec(function (err, user) {
      user.profile = req.body;
      user.save(function (err, profile) {
        if (err || !profile) {
          res.json(err);
        } else {
          res.json(profile);
        }
      })            
    });
  });

};