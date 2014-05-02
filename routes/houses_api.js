var mongoose = require('mongoose');
var Users = require('../models/user');
var Houses = require('../models/house');
// var Events = require('../models/event');

var loggedIn = require('../middleware/loggedIn.js');
var adminLoggedIn = require('../middleware/adminLoggedIn.js');

module.exports = function(app) {
  
  // Open API

  app.get('/houses', function (req, res, next) {
    return Houses.find().sort({city: 1, street: 1, num_house: 1}).exec(function (err, houses) {
      if (!err) {
        res.json(houses)
      } else {
        res.statusCode = 500;
      };
    });
  });

  app.get('/houses/:id', function (req, res, next) {
    return Houses.findOne({_id: req.params.id}).exec(function (err, house) {
      if (!err) {
        res.json(house)
      } else {
        res.statusCode = 500;
      };
    });
  });  


  // Current session User only API

  app.post('/houses/:id', function (req, res, next) {
    var data = req.body;
    delete data._id;
    Houses.update({_id: req.params.id}, data, function (err, house) {
      if (err || !house) {
        res.json(err);
      } else {
        res.json(house);
      }
    });
  });  

  app.get('/user/houses', loggedIn, function (req, res, next) {
    return Users.findOne({email: req.session.email}).exec(function (err, user) {
      if (!err) {
        Houses.find({_id: {$in: user.houses}}).exec(function (err, houses) {
          res.json(houses);
        })
      } else {
        res.statusCode = 500;
      }
    });
  });

  // Homegefest Administrator only

  app.post('/houses', adminLoggedIn, function (req, res, next) {
    var newHouse = new Houses(req.body);
    newHouse.save( function(err, house){
      if (err) {
        res.json(err);
      } else {
        res.json({});
      }
    });
  });


};