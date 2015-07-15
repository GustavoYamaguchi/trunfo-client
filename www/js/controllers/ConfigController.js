var app = angular.module('starter');

app.controller('ConfigController', ['$scope', '$state', configController]);

function configController($scope, $state) {

	$scope.back = function(){
		$state.go("menu");
	}


}