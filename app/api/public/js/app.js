angular
  .module("lingo", ["ngResource", "satellizer", "angular-jwt", "ui.router"])
  .constant("API", "http://localhost:3000/api")
  .constant("yandex", "trnsl.1.1.20151211T162251Z.9ffe37b3cd263001.641f229223c0bfc8ab6c06937432b6758191ce8b")
  .config(MainRouter)
  .config(function($httpProvider){
    $httpProvider.interceptors.push('authInterceptor')
  })
  .config(function($authProvider) {
    $authProvider.facebook({ clientId: '1535877196647406'})
  });

  MainRouter.$inject = ['$stateProvider', '$urlRouterProvider'];

  function MainRouter($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: "/login",
        templateUrl: "views/login.html"
      })
      .state('register', {
        url: "/register",
        templateUrl: "views/register.html"
      })
      .state('home', {
        url: "/",
        templateUrl: "views/home.html",
      })
      .state('chat', {
        url: "/chat",
        templateUrl: "views/chat.html",
        params: { 
          chat: {}
        }
      })
      .state('new', {
        url: "/new",
        templateUrl: "views/new.html",
      })
      .state('profile', {
        url: "/profile",
        templateUrl: "views/profile.html",
      })
      .state('invites', {
        url: "/invites",
        templateUrl: "views/invites.html",
      })

    $urlRouterProvider.otherwise("/");
  }