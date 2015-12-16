var Chat     = require('../models/chat');
var User     = require('../models/user');
var Message  = require('../models/message');
var Language = require('../models/language');


function chatsCreate(req, res) {
  var chat = new Group(req.body);
  chat.save(function(err, chat) {
    if (err) return res.status(500).json(err);
    res.status(200).json(chat);
  });

  User.findOneAndUpdate({ 
    username: currentUser.username
  }, { 
    $addToSet: { chats: chat._id }
  }, function(err, user) {
    if (err) return res.status(500).json(err);
    if (!user) return res.status(404).json(err);
  });
};

function chatsShow(req, res) {
  var id = req.params.id;
  Chat.findById({ _id: id }, function(err, chat) {
    if (err) return res.status(500).json(err);
    if (!chat) return res.status(404).json(err);
      res.status(200).json({ chat });
  });
};

function chatsIndex(req, res) {
  Chat.find({}).populate("users").exec(function(err, chats){
    if (err) return res.status(404).json({message: err});
    res.status(200).json({ chats });
  });
}

function chatsAddMessage(req, res) {
  var id      = req.params.id;
  var message = req.body.message;
  Chat.findByIdAndUpdate({ _id: id}, {$push: {"messages": req.body.message }}, function(err, chat) {
    if (err) return res.status(500).json(err);
    if (!chat) return res.status(404).json(err);
    console.log(chat);
    res.status(200).json({chat});
  })
}

module.exports = {
  chatsShow: chatsShow,
  chatsIndex: chatsIndex,
  chatsAddMessage: chatsAddMessage
}