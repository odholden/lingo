var mongoose = require('mongoose');
var User     = require('../models/user');

var messageSchema = new mongoose.Schema({
  time: { type: Date },
  text: { type: String, required: true },
  user: [User.schema]
})

module.exports = mongoose.model('Message', messageSchema);