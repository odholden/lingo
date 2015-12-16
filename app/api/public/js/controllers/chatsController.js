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
  self.chat    = {};
  self.message = {};

  self.getChats = function() {
    Chat.query(function(data) {
      console.log(data);
      return self.all = data;
    })
  }

  self.showChat = function(id) {
    Chat.get({id: id}, function(chat) {
      self.chat = chat;
    });
  }

  self.sendMessage = function(text) {
    console.log(text);
    self.user = TokenService.decodeToken();
    console.log(self.chat);

    data = {
      message: 
        {
          text: text,
          user: self.user
        },
      chat: self.chat
    }

    Chat.update({ id: self.chat._id }, data, function(message) {
      console.log("callback happening");
      self.message = "";
      $('#messages').append("<p>"+ message +"</p>")
    })
  }

  socket.on("connect", function(){
    console.log("connected")
  })

  // self.getInvites = function(chats) {
  //   console.log(self.all);
  // }

  self.getChats();
  // self.getInvites(self.all);

}
