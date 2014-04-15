var mongoose = require('mongoose');
var Users = require('../models/user');
var Houses = require('../models/house');

var loggedIn = require('../middleware/loggedIn.js');
var adminLoggedIn = require('../middleware/adminLoggedIn.js');

module.exports = function(app) {
  
  app.get('/users', adminLoggedIn, function (req, res, next) {
    Users.find().sort({created: -1}).exec(function(err, users){
      if (err) throw next(err);
      res.json(users);
    });
  })


  // API for current session users

  app.get('/user/profile', loggedIn, function (req, res, next) {
    return Users.findOne({email: req.session.email}).exec(function (err, user) {
      if (!err) {
        res.json(user.profile)
      } else {
        res.statusCode = 500;
      };

    });
  });

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