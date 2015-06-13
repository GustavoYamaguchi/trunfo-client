var app = angular.module('starter');

app.controller('MenuController', function($scope, $state) {

    $scope.logout = function() {
        //UserService.clear();
        $state.go('login');
    };
});