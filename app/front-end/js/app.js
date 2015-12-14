angular
  .module("lingo", ["ngResource", "satellizer", "angular-jwt", "ui.router"])
  .constant("API", "http://localhost:3000/api")
  .config(MainRouter)
  .config(function($httpProvider){
    $httpProvider.interceptors.push('authInterceptor')
  })
  .config(function($authProvider) {
    $authProvider.facebook({ clientId: '1509333952694245'})
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
      })
      .state('new', {
        url: "/new",
        templateUrl: "views/new.html",
      })
      .state('profile', {
        url: "/profile",
        templateUrl: "views/profile.html",
      })

    $urlRouterProvider.otherwise("/");
  }