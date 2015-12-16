angular
  .module("lingo")
  .controller("ChatsController", ChatsController);

ChatsController.$inject = ['User', 'Chat', 'TokenService', '$state', "$stateParams", 'CurrentUser', 'socket'];

function ChatsController(User, Chat, TokenService, $state, $stateParams, CurrentUser, socket) {

  var self = this;

  self.all     = [];
  self.users   = [];
  self.user    = CurrentUser.getUser();
  self.invites = [];
  self.chat    = self.chat || {};
  self.messageText = "";

  self.getChats = function() {
    Chat.query(function(data) {
      console.log(data);
      return self.all = data;
    })
  }

  self.showChat = function(chat) {
    $state.go('chat', { chat: chat });  
    self.chat = chat;  
    console.log(self.chat.messages);
  }

  self.sendMessage = function(text) {
    self.messageText = text;
    self.chat = $stateParams.chat;
    self.user = TokenService.decodeToken();
    data = {
      message: 
        {
          text: text,
          user: self.user
        },
      chat: self.chat
    }

    Chat.update({ id: self.chat._id }, data, function(message) {
      $('#messages').append("<li>"+ self.messageText +"</li>")
      self.messageText = "";
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
