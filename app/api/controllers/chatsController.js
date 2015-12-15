function chatsShow(req, res) {
  Chat.find({ _id: req.params.id }, function(err, chat) {
    if (err) return res.status(404).json({message: err});
    res.status(200).json({ chat });
  })
}

function chatsIndex(req, res) {
  Chat.find(function(err, chats){
    if (err) return res.status(404).json({message: err});
    res.status(200).json({ chats });
  });
}

module.exports = {
  chatsShow: chatsShow,
  chatsIndex: chatsIndex
}