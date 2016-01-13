angular
  .module("lingo")
  .controller("ChatsController", ChatsController);

ChatsController.$inject = ['User', 'Chat', 'TokenService', '$state', "$stateParams", 'CurrentUser', 'socket', 'translate', 'Translate', "$http", "yandex"];

function ChatsController(User, Chat, TokenService, $state, $stateParams, CurrentUser, socket, translate, Translate, $http, yandex) {

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
    $state.go('chat', { chat: chat }).then(function() {
      self.appendChat(chat.messages)
    });
    // self.appendChat(self.messages);
  }

  self.appendChat = function(messages) {
    for (var i = 0; i < messages.length; i++) {
      var message = messages[i];
      console.log(message);
      $('#messages').append("<li class='media' ng-repeat='message in chats.chat.messages'><div class='media-left'><img class='media-object' src='"+ message.user[0].local.image+"' width='75' height='100'></div><div class='media-body'><h4 class='media-heading'>" + message.user[0].local.username + "</h4><p>"+ message.text +"</p></div></li>");
    }   
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

  self.addChatToUserPage = function(chat) {
    self.user = TokenService.decodeToken();
    data = self.user;
    chat.users.push(self.user)
    Chat.update({id: chat._id}, data, function(chat) {})
  }

  self.translate = function(text) {
    self.translateText = text;
    var params = translate.getParams(text);
    $http({
        url: "https://translate.yandex.net/api/v1.5/tr.json/translate",
        method: "GET",
        params: { 
          "key": yandex,
          "text": text,
          "lang": "en-de"
                }
    }).then(function(res) {
      console.log(res.data.text[0]);
      self.messageText = res.data.text[0];
    });

    // $http.get("/url/to/resource/", {params:{"param1": val1, "param2": val2}})
    //    .then(/* */)

  }

  socket.on("connect", function(){
    self.user = {
      local : {
        username: "Rob",
        email: "rob@rob.com",
        image: "http://lorempixel.com/people/403/403/"
      }
    }
    console.log("sockets connected")
    socket.on('chat message', function(message){
      console.log(message);
      $('#messages').append("<li class='media' ng-repeat='message in chats.chat.messages'><div class='media-left'><img class='media-object' src='"+ self.user.local.image+"' width='75' height='100'></div><div class='media-body'><h4 class='media-heading'>" + self.user.local.username + "</h4><p>"+ message.text +"</p></div></li>");
      console.log("ooooh message received from back " + message)
    });
  })



  self.getChats();
  // self.getInvites();
}
