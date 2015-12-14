angular
  .module("lingo", ["ngResource", "satellizer", "angular-jwt", "ui.router"])
  .constant("API", "http://localhost:3000/api")
  .config(mainRouter)
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
        templateUrl: "login.html"
      })
      .state('register', {
        url: "/register",
        templateUrl: "register.html"
      })
      .state('home', {
        url: "/",
        templateUrl: "home.html",
      })
      .state('chat', {
        url: "/chat",
        templateUrl: "chat.html",
      })
      .state('new', {
        url: "/new",
        templateUrl: "new.html",
      })
      .state('profile', {
        url: "/profile",
        templateUrl: "profile.html",
      })

    $urlRouterProvider.otherwise("/");
  }