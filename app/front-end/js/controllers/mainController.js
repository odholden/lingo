angular
  .module('lingo')
  .controller('MainController', MainController);

MainController.$inject = ['User', 'TokenService', '$state', 'CurrentUser', '$auth'];
function MainController(User, TokenService, $state, CurrentUser, $auth){

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

  // Actions to carry once register or login forms have been submitted
  function handleLogin(res) {
    var token = res.token ? res.token : null;
    if (token) {
      $state.go('home');
    }
    // console.log(res);
    self.user = TokenService.decodeToken();
    CurrentUser.saveUser(self.user)
  }

  // POSTS the new user to register to the API
  function register() {
    User.register(self.user, handleLogin);
  }

  // POSTS the new user to login to the API
  function login() {
    User.login(self.user, handleLogin);
  }

  // A function to remove token form local storage and log user out
  function logout() {
    TokenService.removeToken();
    self.all  = [];
    self.user = {};
    CurrentUser.clearUser();
  }

  // Checks if the user is logged in
  function checkLoggedIn() {
    var loggedIn = !!TokenService.getToken();
    return loggedIn;
  }
  return self;
}