var app = angular.module('starter.controller');

/**
 * Controller para sala de batalha.
 */
app.controller('GameController', function($scope, $timeout, $state, $ionicModal, $ionicPopup, $ionicLoading) {

    self = this;
    self.playerDefault = null;
    self.playerLocal = null;
    self.game = null;

    $scope.currentCampo;

    $scope.virarCarta = false;

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
        $scope.cartasParaDesafio = [];

        if (self.game.getCampo(0).length === 0 && self.playerDefault.getIndexWI() === 6) {
            $ionicPopup.alert({
                template: "Parabéns, você venceu o jogo!"
            });
            $state.go('menu');
        } else if (self.game.getCampo(1).length === 0 && self.playerLocal.getIndexWI() === 6) {
            $ionicPopup.alert({
                template: "Você perdeu o jogo!"
            });
            $state.go('menu');
        } else {
            $ionicPopup.alert({
                template: "Desafio finalizado."
            });
        }

    });
    $scope.openModal = function(cartaJogador, otherCarta) {
        $scope.modal.show();
    };
    $scope.closeModal = function() {
        $scope.modal.hide();
    };

    $scope.atacar = function(value) {
        var msg = null;
        $scope.virarCarta = true;

        var player1 = self.game.getCampo(1)[$scope.cartasParaDesafio[0]];
        var player2 = self.game.getCampo(0)[$scope.cartasParaDesafio[0]];
        if (value.id == 0) {
            msg = player1.status.strength > player2.status.strength ? "Você venceu" : "Você perdeu";
        } else if (value.id == 1) {
            msg = player1.status.intelligence > player2.status.intelligence ? "Você venceu" : "Você perdeu";
        } else if (value.id == 2) {
            msg = player1.status.skills > player2.status.skills ? "Você venceu" : "Você perdeu";
        } else if (value.id == 3) {
            msg = player1.status.charisma > player2.status.charisma ? "Você venceu" : "Você perdeu";
        } else if (value.id == 4) {
            msg = player1.status.influence > player2.status.influence ? "Você venceu" : "Você perdeu";
        } else {
            $ionicPopup.alert({
                template: "opção inválida!"
            });
        }
        if (msg !== null) {
            $ionicPopup.alert({
                template: msg + " esta rodada!"
            });
            if (msg == "Você venceu") {
                $timeout(function() {
                    self.game.removeCard($scope.cartasParaDesafio[1], 0);
                    $scope.virarCarta = false;
                    $scope.closeModal();
                    $scope.showNewCard(0);
                }, 2000);

            } else {
                $timeout(function() {
                    self.game.removeCard($scope.cartasParaDesafio[0], 1);
                    $scope.virarCarta = false;
                    $scope.closeModal();
                }, 2000);

            }
        }
    };

    $scope.setCartaParaDesafio = function(card, playerID) {
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

    self.sortCampo = function(){
        var aux = Math.floor(Math.random() * 11);
        return camposDeBatalha[aux].file;
    }

    $scope.init = function() {
        $scope.currentCampo = self.sortCampo();
        self.playerDefault = new Player();
        self.playerDefault.init(1);
        self.playerLocal = new Player();
        self.playerLocal.init(2);
        self.game = new Game();
        self.game.init(self.playerDefault, self.playerLocal);
        for (var i = 0; i < 3; i++) {
            $scope.showNewCard(0);
            $scope.showNewCard(1);
        };
    };

    $scope.getNumberOfCardUsed = function(tipo) {
        if (tipo == 1) {
            return self.playerLocal.getIndexWI();
        } else {
            return self.playerDefault.getIndexWI();
        }
    }

    $scope.getNumCards = function(tipo) {
        if (tipo == 1) {
            return self.playerLocal.getCartas().length;
        } else {
            return self.playerDefault.getCartas().length;
        }
    }

    $scope.getCartaDoCampo = function(pos, playerID) {
        return self.game.getCampo(playerID)[pos];
    }

    $scope.showNewCard = function(playerID) {
        if (self.game.getCampo(playerID).length < 3) {
            card = self.game.newCard(playerID);
            if (card === null) {
                if (playerID !== 0) {
                    $ionicPopup.alert({
                        template: "Você não possui cartas"
                    });
                }
            } else {
                if (playerID === 1) {
                    self.game.setCartaCampo(1, card);
                } else {
                    self.game.setCartaCampo(0, card);
                }
            }

        } else {
            $ionicPopup.alert({
                template: "Número máximo de cartas em campo"
            });
        }
    }


});