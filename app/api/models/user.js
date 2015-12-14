var mongoose = require('mongoose');
var bcrypt   = require("bcrypt-nodejs");
var Language = require("../models/language");

var userSchema = new mongoose.Schema({
  local: {
    username:  { type: String, unique: true, required: true },
    image:     { type: String },
    email:     { type: String, unique: true, required: true },
    password:  { type: String, required: true }
  },
  chats:     [ { type: mongoose.Schema.ObjectId, ref: 'Chat'} ],
  languages: [Language.schema]
})

userSchema.statics.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', userSchema);