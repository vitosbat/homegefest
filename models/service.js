var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  discription: String
})

module.exports = mongoose.model('Service', Schema);