var mongoose = require('mongoose');

var languageSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  code: { type: String, unique: true, required: true }
})

module.exports = mongoose.model('Language', languageSchema);