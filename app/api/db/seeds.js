var mongoose = require('mongoose');

var databaseURL = 'mongodb://localhost:27017/lingo';
mongoose.connect(databaseURL);

var User     = require("../models/user"),
    Language = require("../models/language"),
    Chat     = require("../models/chat"),
    Message  = require("../models/message");


var yandex       = require("../config/yandex-languages.js"),
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

var language1 = new Language({
  name: "German",
  code: "de"
})

language1.save(function(err, language) {
  if (err) return console.log(err);
  console.log("language saved: " + language);
})

var language2 = new Language({
  name: "French",
  code: "fr"
})

language2.save(function(err, language) {
  if (err) return console.log(err);
  console.log("language saved: " + language);
})

var language3 = new Language({
  name: "English",
  code: "en"
})

language3.save(function(err, language) {
  if (err) return console.log(err);
  console.log("language saved: " + language);
})

var language4 = new Language({
  name: "Spanish",
  code: "es"
})

language4.save(function(err, language) {
  if (err) return console.log(err);
  console.log("language saved: " + language);
})

var language5 = new Language({
  name: "Korean",
  code: "ko"
})

language5.save(function(err, language) {
  if (err) return console.log(err);
  console.log("language saved: " + language);
})

var user1 = new User({ 
  local: {
    username:     "ollie",
    email:        "ollie@ollie.com",
    password:     "password"
  },
  languages: [language3, language1]
})

user1.save(function(err, user) {
 if (err) return console.log(err);
 console.log("User saved! ", user);
})

var user2 = new User({ 
  local: {
    username:     "ben",
    email:        "ben@ben.com",
    password:     "password"
  },
  languages: [language1, language3]
})

user2.save(function(err, user) {
 if (err) return console.log(err);
 console.log("User saved! ", user);
})

var message1 = new Message({
  user: user1,
  text: "this is a test message to see if the database is behaving"
})

message1.save(function(err, message) {
  if (err) return console.log(err);
  console.log("Message saved! ", message);
})

var message2 = new Message({
  user: user2,
  text: "this is another test message to see if the database is behaving"
})

message2.save(function(err, message) {
  if (err) return console.log(err);
  console.log("Message saved! ", message);
})

var chat1 = new Chat({
  users:  [user1, user2],
  messages: [message1, message2]
})

chat1.save(function(err, chat) {
  if (err) return console.log(err);
  console.log("Poll saved! ", chat);
})

var chat2 = new Chat({
  users:  [user1],
  messages: [message1, message2]
})

chat2.save(function(err, chat) {
  if (err) return console.log(err);
  console.log("Poll saved! ", chat);
})

var chat3 = new Chat({
  users:  [user2],
  messages: [message1, message2]
})

chat3.save(function(err, chat) {
  if (err) return console.log(err);
  console.log("Poll saved! ", chat);
})



