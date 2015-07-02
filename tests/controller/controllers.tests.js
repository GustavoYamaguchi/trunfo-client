describe('Controllers', function(){
    var scope;

    // load the controller's module
    beforeEach(module('starter'));

    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        $controller('GameController', {$scope: scope});
    }));

    // tests start here
    it('o adversario deveria estar esperando', function(){
        expect(scope.isAdversarioOk).toEqual(false);
    });
});
