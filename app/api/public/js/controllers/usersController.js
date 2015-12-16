angular
  .module('lingo')
  .controller('UsersController', UsersController);

UsersController.$inject = ['User', 'TokenService', '$state', 'CurrentUser', '$auth'];


function UsersController(User, TokenService, $state, CurrentUser, $auth){

  var self = this;

  self.all           = [];
  self.user          = {};
  self.register      = register;
  self.login         = login;
  self.logout        = logout;
  self.checkLoggedIn = checkLoggedIn;

  self.authenticate = function(provider) {
    $auth.authenticate(provider);
  };

  function handleLogin(res) {
    var token = res.token ? res.token : null;
    if (token) {
      $state.go('home');
    }
    self.user = TokenService.decodeToken();
    CurrentUser.saveUser(self.user)
  }

  function register() {
    console.log("registering user");
    User.register(self.user, handleLogin);
  }

  function login() {
    console.log("logging in");
    User.login(self.user, handleLogin);
  }

  function logout() {
    TokenService.removeToken();
    self.all  = [];
    self.user = {};
    CurrentUser.clearUser();
    $state.go('login');
  }

  function checkLoggedIn() {
    var loggedIn = !!TokenService.getToken();
    return loggedIn;
  }
  return self;
}