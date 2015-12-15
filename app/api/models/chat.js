var mongoose = require('mongoose');
var Language = require('../models/language');
var Message  = require('../models/message');

var chatSchema = new mongoose.Schema({
  users    : [{ type: mongoose.Schema.ObjectId, ref: 'User'}],
  messages : [Message.schema]
})

module.exports = mongoose.model('Chat', chatSchema);