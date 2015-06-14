var app = angular.module('starter');

app.controller('MenuController', function($scope, $state, $cordovaMedia, $ionicLoading) {

    self = this;

    $scope.batalhar = function() {
        console.log("SALA DE BATALHA");
        self.clickSound();
    };

    $scope.army = function() {
        console.log("ARMY");
        self.clickSound();
    };

    $scope.shop = function() {
        console.log("SHOP");
        self.clickSound();
    };

    $scope.credits = function() {
        console.log("CREDITS");
        self.clickSound();
    };

    $scope.config = function() {
        console.log("CONFIG");
        self.clickSound();
    };

    $scope.exit = function() {
        self.clickSound();
        $state.go('login');
        ionic.Platform.exitApp();
    };

    this.clickSound = function() {
        var media = $cordovaMedia.newMedia("../../sound/click.mp3").then(function() {
        }, function() {
        });
        media.play(media);
    };
});