var app = angular.module('starter');

/**
 * Controller para sala de batalha.
 */
app.controller('GameController', function ($scope, $state, socketFactory) {

	var socket = io.connect('http://localhost:8080');

	/**
	 * evento quando é logado com o servidor
	 */
	socket.on('onconnected', function(id) {
		$scope.id = id;
	});

	/**
	 * evento quando o adversário mandou a jogada.
	 */
	socket.on('recebendoJogada', function(param) {
		$scope.anotherCard = param;
		$scope.isAdversarioOk = true;
	});

	/**
	 * evento quando estou aguardando uma jogada.
	 */
	socket.on('aguardando', function(param) {
		$scope.anotherCard = param;
		$scope.isAdversarioOk = true;
	});
	
	self = this;

	$scope.isAdversarioOk = false;

	this.carta = undefined;

	/**
	 * carta atual do jogador
	 */
	$scope.card = function() {
		if (self.carta === undefined) {
			self.carta = cartas[Math.floor(Math.random() * cartas.length)];
		} 
		return self.carta;
	};

	/**
	 * carta do adversario
	 */
	$scope.another = function() {
		return $scope.anotherCard;
	};

	/**
	 * lancando evento quando selecinado um atributo
	 */
	$scope.selecionado = function(atributo) {
		socket.emit('enviandoJogada', {"carta": $scope.card()});
	};
});