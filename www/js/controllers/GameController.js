var app = angular.module('starter.controller');

/**
 * Controller para sala de batalha.
 */
app.controller('GameController', function($scope, $timeout, $state, $ionicModal, $ionicPopup, $ionicLoading) {

    self = this;
    self.playerDefault = null;
    self.playerLocal = null;

    $scope.campoPlayerLocal = [];
    $scope.campoPlayerDefault = [];

    $scope.virarCarta = false;

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
        $scope.cartasParaDesafio = [];
        $ionicPopup.alert({
            template: "Desafio finalizado."
        });
        if ($scope.campoPlayerDefault.length === 0 && self.playerDefault.getIndexWI() === 6) {
            $ionicPopup.alert({
                template: "Parabéns, você venceu o jogo!"
            });
            $state.go('menu');
        }
        if ($scope.campoPlayerLocal.length === 0 && self.playerLocal.getIndexWI() === 6) {
            $ionicPopup.alert({
                template: "Você perdeu o jogo!"
            });
            $state.go('menu');
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
        var player1 = $scope.campoPlayerLocal[$scope.cartasParaDesafio[0]];
        var player2 = $scope.campoPlayerDefault[$scope.cartasParaDesafio[1]];
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
                    $scope.campoPlayerDefault = novoCampo($scope.cartasParaDesafio[1], $scope.campoPlayerDefault);
                    $scope.virarCarta = false;
                    $scope.closeModal();
                    if ($scope.campoPlayerDefault.length !== 3 && self.playerDefault.getIndexWI() < 6) {
                        var index = self.playerDefault.getIndex();
                        $scope.campoPlayerDefault.push(self.playerDefault.getCarta(index));
                    } else if(self.playerDefault.getIndexWI() < 6){
                        $ionicPopup.alert({
                            template: "Número máximo de cartas em campo"
                        });
                    }
                }, 2000);

            } else {
                $timeout(function() {
                    $scope.campoPlayerLocal = novoCampo($scope.cartasParaDesafio[0], $scope.campoPlayerLocal);
                    $scope.virarCarta = false;
                    $scope.closeModal();
                }, 2000);

            }
        }
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
            return self.playerLocal.getIndexWI();
        } else {
            return self.playerDefault.getIndexWI();
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
        if ($scope.campoPlayerLocal.length !== 3 && self.playerLocal.getIndexWI() < 6) {
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

function novoCampo(index, campo) {
    var aux = [];
    for (var i = 0; i < campo.length; i++) {
        if (i !== index) {
            aux.push(campo[i]);
        }
    };
    return aux;
}

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
