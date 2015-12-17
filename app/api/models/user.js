var mongoose = require('mongoose');
var bcrypt   = require("bcrypt-nodejs");
var Language = require("../models/language");

var userSchema = new mongoose.Schema({
  local: {
    username:  { type: String },
    image:     { type: String },
    email:     { type: String },
    password:  { type: String, required: true }
  },
  languages:  [Language.schema]
})

userSchema.statics.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
}

module.exports = mongoose.model('User', userSchema);