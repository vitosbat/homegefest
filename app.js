var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    routes = require('./routes');

var loggedIn = require('./middleware/loggedIn');
var adminLoggedIn = require('./middleware/adminLoggedIn');

var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(express);

mongoose.set('debug', true);
mongoose.connect(process.env.MONGOHQ_URL, function(err) {
  if (err) throw err;

  app.use(express.favicon(__dirname + "/public/favicon.ico"));
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.use(express.logger('dev'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.session({
    secret: "hackday29",
    store: new MongoStore({mongoose_connection: mongoose.connection})
  }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  
  if ('development' == app.get('env')) {
    app.use(express.errorHandler());
  }

  // Authorization routes
  require('./routes/auth')(app);
  
  // User Interface client-side application
  app.get('/user', loggedIn, function (req, res) {
    res.sendfile(__dirname + '/public/user/index.html');
  })

  // Main Interface client-side application
  app.get('/', function(req, res) {
    res.sendfile(__dirname + '/public/main/index.html');
  })
  
  // Homegefest administrator Interface application
  app.get('/admin', adminLoggedIn, function (req, res, next) {
    res.render('admin/index.jade');
  })

  // REST API routes
  routes(app);
  
  
  server.listen(app.get('port'), function(){
    console.log('Homegefest server listening on port ' + app.get('port'));
  });

});