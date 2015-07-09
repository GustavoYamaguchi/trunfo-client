var app = angular.module('starter');

/**
 * Controller para sala de batalha.
 */
app.controller('GameController', function ($scope, $state, socketFactory) {

	var socket = io.connect('http://localhost:8080');

	/**
	 * evento quando é logado com o servidor
	 */
	socket.on('onconnected', function(data) {
		$scope.id = data.id;
	});

	/**
	 * evento quando o adversário mandou a jogada.
	 */
	socket.on('jogadas', function(param) {
		for (var chave in param) {
			if (Number(chave) !== Number($scope.id)) {
				$scope.$apply(function() {
					$scope.isAdversarioOk = true;
					$scope.another = param[chave];
				});

				console.log("CHAMA UMA VEZ");

				break;
			}
		}
	});
	
	self = this;

	$scope.isAdversarioOk = false;

	this.carta = undefined;

	$scope.showAtributos = false;

	/**
	 * carta atual do jogador
	 */
	$scope.card = function() {
		if (self.carta === undefined) {
			self.carta = cartas[Math.floor(Math.random() * cartas.length)];
		} 
		return self.carta;
	};

	$scope.enableAtributos = function() {
		$scope.showAtributos = true;
	};

	$scope.isAble = function() {
		return true;
	};

	/**
	 * lancando evento quando selecinado um atributo
	 */
	$scope.selecionado = function(atributo) {
		socket.emit('enviandoJogada', {"carta": $scope.card(), "id": $scope.id});
	};
});