var mongoose = require('mongoose');
var User = require('../models/user');
var Message  = require('../models/message');
var Language  = require('../models/language');

var chatSchema = new mongoose.Schema({
  users    : [User.schema],
  messages : [Message.schema],
  languages: [Language.schema]
})

module.exports = mongoose.model('Chat', chatSchema);