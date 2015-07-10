var app = angular.module('starter');

app.controller('MenuController', function($scope,$state) {

    self = this
    self.media = null;

    $scope.play = function() {
        self.media = new Media("/android_asset/www/sound/menu.mp3", function () {
            console.log("playAudio():Audio Success");
        },
        function (err) {
            console.log("playAudio():Audio Error: " );
            console.log(err);
        }
        );
        self.media.play();
    }
 

    $scope.batalhar = function() {
        
        $state.go('game');
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
        
        $state.go('login');
    };
});