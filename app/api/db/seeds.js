var mongoose = require('mongoose');

var databaseURL = 'mongodb://localhost:27017/lingo';
mongoose.connect(databaseURL);

var User     = require("../models/user"),
    Language = require("../models/language"),
    Chat     = require("../models/chat"),
    Message  = require("../models/message");


var yandex       = require("../config/yandex-languages.js"),
    translations = yandex.dirs,
    codes        = yandex.langs;

for (var code in codes) {
  var language = new Language({
    name: codes[code],
    code: code
  })
  language.save(function(err, language) {
    if (err) return console.log(err);
    console.log("language saved: " + language);
  })
}


