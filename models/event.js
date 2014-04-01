var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
  created: { type: Date, default: Date.now },
  title: String,
  author: String,
  type: String,
  service: String,
  suspension: {plan: Date, real: Date},
  resumption: {plan: Date, real: Date},
  houses: [{house_id: String}],
  comments: [{body: String, date: Date}],
  closed: Date,
})

module.exports = mongoose.model('Event', Schema);
