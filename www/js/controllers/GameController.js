var app = angular.module('starter');

/**
 * Controller para sala de batalha.
 */
app.controller('GameController', function ($scope, $state) {
	
	self = this;

	$scope.path = 'img/cards/';

	$scope.card = function() {
		return cartas[0];
	};

	$scope.another = function() {
		return cartas[1];
	};
});