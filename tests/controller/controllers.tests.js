describe('Controllers', function(){
    var scope;

    // load the controller's module
    beforeEach(module('starter.controller'));
    // , ['ionic', 'firebase', 'ngCordova']

    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        $controller('GameController', {$scope: scope, 
            $state: {},
            $ionicPopup: {}, 
            $ionicLoading: {}
        });
    }));

    // tests start here
    it('testa a pontuacao inicial', function(){
        expect(scope.pontuacao).toEqual(0);
    });

    it('testa o turno inicial do jogador', function(){
        expect(scope.turno).toEqual(false);
    });

    it('testa o inicio da carta', function(){
        expect(scope.carta).toEqual(undefined);
    });

    it('testa a exibicao dos atributos', function(){
        expect(scope.showAtributos).toEqual(false);
    });

    // TODO esperar a implementacao do controller de Game vs IA
});