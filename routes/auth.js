var mongoose = require('mongoose');
var Users = require('../models/user');
var adminLoggedIn = require('../middleware/adminLoggedIn.js');

module.exports = function(app) {
  
  app.get('/user/login', function (req, res) {
    res.render('login.jade');
  })

  app.post('/user/login', function (req, res, next) {
    var email = req.body.email;
    var pass = req.body.pass;

    if (!(email && pass)) {
      return invalid();
    }

    Users.findOne({email: email}, function (err, user) {
      if (err) return next(err);
      if (user) {
        if (user.checkPassword(pass)) {
          req.session.email = user.email;
          req.session.name = user.profile.name;
          if  (user.email === 'admin@homegefest.ru'){
            return res.redirect('/admin');
          }  else {
            return res.redirect('/user');
          }
        } else { return invalid(); } // if invalid password
      } else { return invalid(); } // if invalid user
    })

    function invalid () {
      return res.render('login.jade', { invalid: true });
    }
  })

  app.get('/createUser', adminLoggedIn, function (req, res) {
    res.render('createUser.jade');
  })  

  app.post('/createUser', adminLoggedIn, function (req, res, next) {
    
    var email = req.body.email;
    var name = req.body.name;
    var pass = req.body.pass;
    var confirmPass = req.body.confirmPass;

    if (pass === confirmPass) {
      Users.findOne({email: email}, function (err, user) {
        if (user) {
          return res.render('createUser.jade', {error: 'Пользователь с таким именем существует'});
        } else if (!user){
          var user = new Users({email: email, pass: pass, profile: {name : name}})
          user.save( function (err) {
            if (err) return next(err);
          });
          return res.redirect('/admin');
        }
      })
    } else {
      return res.render('createUser.jade', {error: 'Пароли не совпадают'});
    }
  })  

  app.get('/user/logout', function (req, res) {
    req.session.email = null;
    res.redirect('/user/login');
  })
}