angular
  .module("lingo")
  .controller("ChatsController", ChatsController);

ChatsController.$inject = ['User', 'Chat', 'TokenService', '$state', 'CurrentUser', 'socket'];

function ChatsController(User, Chat, TokenService, $state, CurrentUser, socket) {

  var self = this;

  self.all     = [];
  self.users   = [];
  self.user    = CurrentUser.getUser();
  self.invites = [];
  self.message;

  self.getChats = function() {
    Chat.query(function(data) {
      console.log(data);
      return self.all = data;
    })
  }

  self.showChat = function(id) {
    Chat.get({id: id}, function(chat) {
      self.chat = chat;
      console.log(chat);
    });
  }

  self.sendMessage = function(message) {
    console.log(message);
    console.log(self.user);

    data = {
      text: message,
      user: self.user
    }

    Chat.update({ id: self.user._id }, data, function(message) {
      self.message = "";
      $('#messages').append("<p>"+ message +"</p>")
    })
  }

  socket.on("connect", function(){
    console.log("connected")
  })

  self.getInvites = function(chats) {
    console.log(self.all);
  }

  self.getChats();
  self.getInvites(self.all);

}
