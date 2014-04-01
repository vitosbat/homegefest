var mongoose = require('mongoose');
var Users = require('../models/user');

var loggedIn = require('../middleware/loggedIn.js')

module.exports = function(app) {
  
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