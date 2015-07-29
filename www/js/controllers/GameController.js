var app = angular.module('starter.controller');

/**
 * Controller para sala de batalha.
 */
app.controller('GameController', function($scope, $state, $ionicModal, $ionicPopup, $ionicLoading) {

    self = this;
    self.playerDefault = null;
    self.playerLocal = null;

    $scope.campoPlayerLocal = [];
    $scope.campoPlayerDefault = [];

    $scope.pontuacao = 0;
    // determina se eh o turno do jogador
    $scope.turno = false;
    $scope.carta = undefined;
    $scope.showAtributos = false;
    $scope.pontuacao = 0;
    $scope.modal = null;

    $scope.cartasParaDesafio = [];

    $ionicModal.fromTemplateUrl('templates/desafio-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
        self.cartasParaDesafio = [];
        $ionicPopup.alert({
                template: "Desafio finalizado."
            });
    });
    $scope.openModal = function(cartaJogador, otherCarta) {
        $scope.modal.show();
    };
    $scope.closeModal = function() {
        $scope.modal.hide();
    };

    $scope.setCartaParaDesafio = function(card) {
        if ($scope.cartasParaDesafio.length == 0) {
            $scope.cartasParaDesafio.push(card);
            $ionicPopup.alert({
                template: "Selecione a outra carta para o desafio."
            });
        } else if ($scope.cartasParaDesafio.length == 1) {
            $scope.cartasParaDesafio.push(card);
            $scope.openModal();
        }
    }

    $scope.init = function() {
        self.playerDefault = new Player();
        self.playerDefault.init(1);
        self.playerLocal = new Player();
        self.playerLocal.init(2);
        self.sortCards();
        for (var i = 0; i < 3; i++) {
            $scope.showNewCard();
            self.showNewCardDefault();
        };
    };

    $scope.getNumberOfCardUsed = function(tipo) {
        if (tipo == 0) {
            return $scope.campoPlayerLocal.length;
        } else {
            return $scope.campoPlayerDefault.length;
        }
    }

    $scope.getNumCards = function(tipo) {
        if (tipo == 0) {
            return self.playerLocal.getCartas().length;
        } else {
            return self.playerDefault.getCartas().length;
        }
    }

    $scope.showNewCard = function() {
        if ($scope.campoPlayerLocal.length !== 3) {
            var index = self.playerLocal.getIndex();
            $scope.campoPlayerLocal.push(self.playerLocal.getCarta(index));
        } else {
            $ionicPopup.alert({
                template: "Número máximo de cartas em campo"
            });
        }

    }

    self.showNewCardDefault = function() {
        if ($scope.campoPlayerDefault.length !== 3) {
            var index = self.playerDefault.getIndex();
            $scope.campoPlayerDefault.push(self.playerDefault.getCarta(index));
        } else {
            $ionicPopup.alert({
                template: "Número máximo de cartas em campo"
            });
        }

    }


    self.sortCards = function() {
        var len = cartas.length;
        var aux = randomiza(len);
        for (var i = 0; i < len / 2; i++) {
            self.playerLocal.setCartas(cartas[aux[i]]);
            self.playerDefault.setCartas(cartas[aux[i + (len / 2)]]);
        };
    }


});

function randomiza(n) {
    var a = [];
    var aux = 0;
    for (var i = 0; i < n; i++) {
        aux = Math.floor(Math.random() * n);
        if (a.indexOf(aux) == -1)
            a.push(aux);
        else
            i--;
    }
    return a;
}