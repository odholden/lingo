var mongoose = require('mongoose');
var User = require('../models/user');
var Message  = require('../models/message');

var chatSchema = new mongoose.Schema({
  users    : [User.schema],
  messages : [Message.schema]
})

module.exports = mongoose.model('Chat', chatSchema);