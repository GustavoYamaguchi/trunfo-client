var app = angular.module('starter');

/**
 * Controller para sala de batalha.
 */
 app.controller('GameController', function ($scope, $state, socketFactory, $ionicPopup, $ionicLoading) {

 	$scope.pontuacao = 0;

 	// determina se eh o turno do jogador
 	$scope.turno = false;

 	var socket = io.connect('http://localhost:8080');

	/*
	 * evento quando é logado com o servidor
	 */
	 socket.on('onconnected', function(data) {
	 	$scope.id = data.id;
	 });

	/**
	 * Apenas um jogador esta conectado.
	 * Aguardando outro jogador.
	 */
	 socket.on('aguardandoJogador', function(data) {
	 	$ionicLoading.show({
	 		template: data.mensagem
	 	});
	 });

	 socket.on('oponenteDesconectado', function(data) {
	 	console.log(data);
	 	$ionicLoading.show({
	 		template: data.mensagem,
	 		duration: 6000
	 	});
	 });

	 socket.on('iniciarPartida', function(data) {
	 	$ionicLoading.hide();

	 	$scope.enable = false;

	 	$scope.$apply(function() {
	 		$scope.showAtributos = false;
	 		$scope.isAdversarioOk = false;
	 		$scope.another = undefined;
	 		$scope.carta = cartas[Math.floor(Math.random() * cartas.length)];
	 	});

	 	$scope.enable = true;

	 	var mensagem = "";
	 	$scope.turno = data.turno === $scope.id;
	 	if ($scope.turno) {
	 		mensagem = "Seu turno. Realize sua jogada";
	 	} else {
	 		mensagem = "Turno do adversário. Aguarde...";
	 	}

	 	var alert = $ionicPopup.alert({
	 		title: 'Partida Iniciada',
	 		template: mensagem
	 	});
	 });

	 socket.on('resultadoTurno', function(param) {
	 	var mensagem = param[$scope.id.toString()].mensagem;
	 	$scope.pontuacao += param[$scope.id.toString()].pontos;

	 	for (var chave in param) {
	 		if (chave !== $scope.id.toString()) {
	 			$scope.$apply(function() {
	 				$scope.showAtributos = true;
	 				$scope.isAdversarioOk = true;
	 				$scope.another = param[chave].carta;
	 			});
	 			break;
	 		}
	 	}

	 	var alert = $ionicPopup.alert({
	 		title: 'Resultado',
	 		template: mensagem
	 	});
	 	alert.then(function(res) {
	 		socket.emit('novaPartida');
	 		$ionicLoading.show({
	 			template: 'Aguarde...'
	 		});
	 	});
	 });

	 socket.on('getCarta', function() {
	 	if (!$scope.turno) {
	 		socket.emit('cartaEnviada', {
	 			"carta": $scope.carta, 
	 			"id": $scope.id
	 		});
	 	}
	 });

	 self = this;

	 $scope.isAdversarioOk = false;

	 $scope.carta = undefined;

	 $scope.showAtributos = false;

	 $scope.pontuacao = 0;

	 $scope.enableAtributos = function() {
	 	$scope.showAtributos = true;
	 };

	 $scope.isAble = function() {
	 	return true;
	 };

	 $scope.flag = true;

	 $scope.card = function() {
	 	return $scope.carta;
	 };

	/**
	 * lancando evento quando selecinado um atributo
	 */
	 $scope.selecionado = function(atributo) {
	 	if ($scope.turno) {
	 		socket.emit('enviandoJogada', {
	 			"carta": $scope.carta, 
	 			"id": $scope.id, 
	 			'atributo': atributo
	 		});
	 	}
	 };
	});