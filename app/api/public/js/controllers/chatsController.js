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
  self.messages = {};
  self.messageText = "";
  self.translateText = "";

  self.getChats = function() {
    Chat.query(function(chats) {
      return self.all = chats;
    })
  }

  self.checkHome = function(chat) {
    if (chat.users.length === 2) return true;
  }

  self.checkInvites = function(chat) {
    if (chat.users.length === 1) return true;
  }

  self.showChat = function(chat) {
    self.messages = chat.messages;
    $state.go('chat', { chat: chat });
    self.appendChat(self.messages);
  }

  self.appendChat = function(messages) {
    // for (var i = 0; i < messages.length; i++) {
    //   var text = messages[i].text;
    //   var name = messages[i].user[0].local.username;
    //   var image = messages[i].user[0].local.image;
    //   $('#messages').append("<li>WHY ARENT YOU WORKING</li>");
    //   console.log(name)
    // }
  }

  self.sendMessage = function(text) {
    self.messageText = text;
    self.chat = $stateParams.chat;
    console.log(self.chat);  

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
      socket.emit('chat message', data.message);
      self.messageText = "";
      return false
    })
  }

  self.translate = function(text) {
    self.translateText = text;

  }

  socket.on("connect", function(){
    self.user = {
      local : {
        username: "Rob",
        email: "rob@rob.com",
        image: "http://hassifier.herokuapp.com/rob"
      }
    }
    console.log("connected")
    console.log(self.user)
    socket.on('chat message', function(message){
      console.log(message);
      $('#messages').append("<li class='media' ng-repeat='message in chats.chat.messages'><div class='media-left'><img class='media-object' src='"+ self.user.local.image+"' width='75' height='100'></div><div class='media-body'><h4 class='media-heading'>" + self.user.local.username + "</h4><p>"+ message.text +"</p></div></li>");
      console.log("ooooh message received from back " + message)
    });
  })



  self.getChats();
  // self.getInvites();
}
