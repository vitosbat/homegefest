var users_api = require('./users_api');
var houses_api = require('./houses_api');
var events_api = require('./events_api');

module.exports = function(app){

  users_api(app);
  houses_api(app);
  events_api(app);  

}