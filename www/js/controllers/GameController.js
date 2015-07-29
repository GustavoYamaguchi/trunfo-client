var app = angular.module('starter');

/**
 * Controller para sala de batalha.
 */
app.controller('GameController', function($scope, $state, $ionicPopup, $ionicLoading) {

    self = this;
    self.playerDefault = null;
    self.playerLocal = null;

    $scope.campoPlayerLocal = [];

    $scope.pontuacao = 0;
    // determina se eh o turno do jogador
    $scope.turno = false;
    $scope.carta = undefined;
    $scope.showAtributos = false;
    $scope.pontuacao = 0;

    $scope.init = function() {
        self.playerDefault = new Player();
        self.playerDefault.init(1);
        self.playerLocal = new Player();
        self.playerLocal.init(2);
        self.sortCards();
    };

    $scope.showNewCard = function() {
        if ($scope.campoPlayerLocal.length !== 3) {
            var index = self.playerLocal.getIndex();
            $scope.campoPlayerLocal.push(self.playerLocal.getCarta(index));
        }else{
            $ionicPopup.alert({template:"Número máximo de cartas em campo"});
        }

    }

    self.sortCards = function() {
        var len = cartas.length;
        var aux = randomiza();
        for (var i = 0; i < cartas.length / 2; i++) {
            self.playerLocal.setCartas(cartas[i]);
            self.playerDefault.setCartas(cartas[i + (len / 2)]);
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