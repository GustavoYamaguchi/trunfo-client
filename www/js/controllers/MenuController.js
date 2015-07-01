var app = angular.module('starter');

app.controller('MenuController', function($scope, $state) {

    self = this

    $scope.batalhar = function() {
        clickSound();
        $state.go('game');
    };

    $scope.army = function() {
        clickSound();
        console.log("ARMY");
    };

    $scope.shop = function() {
        clickSound();
        console.log("SHOP");
    };

    $scope.credits = function() {
        clickSound();
        console.log("CREDITS");
    };

    $scope.config = function() {
        clickSound();
        console.log("CONFIG");
    };

    $scope.exit = function() {        
        clickSound();
        $state.go('login');
    };

    /**
     * Click sound execute when the user
     * tap at button menu
     */
    function clickSound() {
        document.getElementById('clicado').play();
    };
});