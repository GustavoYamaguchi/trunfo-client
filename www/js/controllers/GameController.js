var app = angular.module('starter');

/**
 * Controller para sala de batalha.
 */
app.controller('GameController', function ($scope, $state, socketFactory, $ionicPopup) {

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
					$scope.another = param[chave].carta;
				});

				var meuAtributo = param[$scope.id].jogada.valor;
				var adversario = param[Number(chave)].jogada.valor;
				console.log(meuAtributo);
				console.log(adversario);

				if (meuAtributo === adversario) {
					self.mensagem = "Empate";
				} else if (meuAtributo > adversario) {
					self.mensagem = "Vencedor";
				} else {
					self.mensagem = "Perdedor";
				}

				var alert = $ionicPopup.alert({
     				title: 'Resultado',
     				template: self.mensagem
   				});
   				alert.then(function(res) {

  				});
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
		console.log(self.carta);
		socket.emit('enviandoJogada', {"carta": $scope.card(), "id": $scope.id, "jogada" : {
			'atributo': atributo,
			'valor': self.carta.status[atributo.toString()]
		}});
	};
});