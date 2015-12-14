var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
  time: { type: Date },
  text: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User'}
})

module.exports = mongoose.model('Message', messageSchema);