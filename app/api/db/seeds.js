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
    password:     "password",
    image: "http://hassifier.herokuapp.com/ollie"
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
    password:     "password",
    image: "http://hassifier.herokuapp.com/ben"

  },
  languages: [language1, language3]
})

user2.save(function(err, user) {
 if (err) return console.log(err);
 console.log("User saved! ", user);
})

var message1 = new Message({
  user: user1,
  text: "Hello how are you today?"
})

message1.save(function(err, message) {
  if (err) return console.log(err);
  console.log("Message saved! ", message);
})

var message2 = new Message({
  user: user2,
  text: "I'm absolutely marvellous thanks so much for asking"
})

message2.save(function(err, message) {
  if (err) return console.log(err);
  console.log("Message saved! ", message);
})

var message3 = new Message({
  user: user2,
  text: "Well that's wonderful to hear my friend, how is Hamburg this time of year?"
})

message3.save(function(err, message) {
  if (err) return console.log(err);
  console.log("Message saved! ", message);
})

var message4 = new Message({
  user: user2,
  text: "Es ist ok aber das Wetter ist sehr schlecht."
})

message4.save(function(err, message) {
  if (err) return console.log(err);
  console.log("Message saved! ", message);
})

var chat1 = new Chat({
  users:  [user1, user2],
  messages: [message1, message2, message3, message4],
  languages: [language1, language3]
})

chat1.save(function(err, chat) {
  if (err) return console.log(err);
  console.log("Poll saved! ", chat);
})

var chat2 = new Chat({
  users:  [user1],
  messages: [message1, message2],
  languages: [language4]
})

chat2.save(function(err, chat) {
  if (err) return console.log(err);
  console.log("Poll saved! ", chat);
})

var chat3 = new Chat({
  users:  [user2],
  messages: [message1, message2],
  languages: [language5]
})

chat3.save(function(err, chat) {
  if (err) return console.log(err);
  console.log("Poll saved! ", chat);
})



