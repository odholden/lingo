var mongoose = require('mongoose');

var languageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true }
})

module.exports = mongoose.model('Language', languageSchema);