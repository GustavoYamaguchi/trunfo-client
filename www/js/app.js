var firebaseUrl = "https://trunfo-les.firebaseio.com/";
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'firebase', 'ngCordova'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('menu', {
        url: "/menu",
        templateUrl: "templates/menu.html",
        controller: 'MenuController'
    })

    .state('login', {
        url: "/login",
        templateUrl: "templates/login.html",
        controller: "LoginController"
    })

    .state('game', {
        url: '/game',
        templateUrl: 'templates/game.html',
        controller: 'GameController'
    })

    .state('config', {
        url: '/config',
        templateUrl: 'templates/config.html',
        controller: 'ConfigController'
    })

    $urlRouterProvider.otherwise('/menu');
});