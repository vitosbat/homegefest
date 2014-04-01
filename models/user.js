var crypto = require('crypto');
var mongoose = require('mongoose');

var schema = mongoose.Schema({
    email: { type: String, unique: true, required: true },
    salt: { type: String, required: true },
    hash: { type: String, required: true },
    created: { type: Date, default: Date.now },
    profile: {
      name: String,
      discription: String,
      web: String,
      pub_email: String,
      phone: String,
      services: [String],
      houses: [String]
    }
});

schema.methods.encryptPassword = function(pass) {
  return crypto.createHmac('sha1', this.salt).update(pass).digest('hex');
}

schema.virtual('pass')
  .set(function(pass) {
    this._plainPassword = pass;
    this.salt = Math.random() + '';
    this.hash = this.encryptPassword(pass);
  })
  .get(function() { return this._plainPassword; });

schema.methods.checkPassword = function(pass) {
  return this.encryptPassword(pass) === this.hash;
}

module.exports = mongoose.model('User', schema);