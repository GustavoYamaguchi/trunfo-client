var app = angular.module('starter');

app.controller('MenuController', function($scope,$cordovaMedia, $state) {

    self = this

    $scope.play = function(src) {
        var media = new window.Media(src, null, null, function(){});
        $cordovaMedia.play(media);
    }
 

    $scope.batalhar = function() {
        console.log("SALA DE BATALHA");
    };

    $scope.army = function() {
        console.log("ARMY");
    };

    $scope.shop = function() {
        console.log("SHOP");
    };

    $scope.credits = function() {
        console.log("CREDITS");
    };

    $scope.config = function() {
        console.log("CONFIG");
    };

    $scope.exit = function() {
        document.getElementById('clicado').play();
       // $state.go('login');
    };
});