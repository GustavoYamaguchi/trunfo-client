var app = angular.module('starter');
var Player = require("../Player").Player;

/**
 * Controller para sala de batalha.
 */
app.controller('GameController', function($scope, $state, $ionicPopup, $ionicLoading) {

    self = this;
    self.playerDefault = null;
    self.pleyerLocal = null;

    $scope.pontuacao = 0;
    // determina se eh o turno do jogador
    $scope.turno = false;
    $scope.carta = undefined;
    $scope.showAtributos = false;
    $scope.pontuacao = 0;

    $scope.init = function(){
        self.pleyerDefault = new Player();
        self.pleyerDefault.init(1);
        self.pleyerLocal = new Player();
        self.pleyerLocal.init(2);
    };

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
            
        }
    };
});