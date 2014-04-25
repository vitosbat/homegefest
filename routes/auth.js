var mongoose = require('mongoose');
var Users = require('../models/user');

var adminLoggedIn = require('../middleware/adminLoggedIn.js');
var loggedIn = require('../middleware/loggedIn.js');

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

  app.get('/user/logout', function (req, res) {
    req.session.email = null;
    res.redirect('/user/login');
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

  app.get('/editUserPassword', loggedIn, function (req, res) {
    res.render('editUserPassword.jade');
  })  

  app.post('/editUserPassword', loggedIn, function (req, res, next) {
    
    var email = req.session.email;
    var oldPass = req.body.oldPass;
    var pass = req.body.pass;
    var confirmPass = req.body.confirmPass;

    if (pass === confirmPass) {
      Users.findOne({email: email}, function (err, user) {
        if (err) return next(err);
        if (user.checkPassword(oldPass)) {
          user.pass = pass;
          user.save(function (err, user) {
            if (err) return next(err);
            res.redirect('/user#/update_profile');
          })
        } else {
          res.render('editUserPassword.jade', {error: 'Не верный старый пароль.'});
        }
      })
    } else {
      return res.render('editUserPassword.jade', {error: 'Пароли не совпадают.'});
    }
  })
}