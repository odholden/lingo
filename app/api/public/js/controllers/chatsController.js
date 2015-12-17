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
    Chat.query(function(chats) {
      return self.all = chats;
    })
  }

  // self.getInvites = function(chats) {
  //   Chat.query(function(chats) {
  //     for (var i = 0; i < chats.length; i++) {
  //       if (chats[i].users.length = 1) {
  //         self.invites.push(chats[i]);
  //       }
  //     }
  //   })
  // }

  self.checkHome = function(chat) {
    if (chat.users.length === 2) return true;
  }

  self.checkInvites = function(chat) {
    if (chat.users.length === 1) return true;
  }

  self.showChat = function(chat) {
    $state.go('chat', { chat: chat });  
    self.chat = chat;  
    Chat.get({})
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
      socket.emit('chat message', self.messageText);
      self.messageText = "";
      return false
    })
  }

  socket.on("connect", function(){
    console.log("connected")
    socket.on('chat message', function(msg){
      $('#messages').append($('<li>').text(msg));
      console.log("ooooh message received from back " + msg)
    });
  })



  self.getChats();
  // self.getInvites();
}
