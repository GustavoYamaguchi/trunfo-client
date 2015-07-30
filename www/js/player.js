var Player = function() {
    var id,
        cartas,
        pontos,
        indexAtual;

    var init = function(id){
    	set_id(id);
    	cartas = [];
    	pontos = 0;
        indexAtual = 0
    }

    var getIndexWithoutIncrement = function(){
        return indexAtual;
    }


    var get_id = function() {
        return id;
    };

    var set_id = function(new_id) {
        id = new_id;
    };

    var get_pontos = function() {
        return pontos;
    };

    var set_pontos = function(pts) {
        pontos += pts;
    }

    var get_cartas = function(){
    	return cartas;
    }

    var get_carta = function(index){
        return cartas[index];
    }

    var set_cartas = function(newCarta){
    	cartas.push(newCarta);
    }

    var get_index = function(){
        return indexAtual < 6?indexAtual++:-1;
    }

    var set_index = function(index){
        indexAtual = index;
    }

    return {
        getID: get_id,
        setID: set_id,
        getPontos: get_pontos,
        setPontos: set_pontos,
        setCartas: set_cartas,
        getCartas: get_cartas,
        getCarta: get_carta,
        getIndex: get_index,
        setIndex: set_index,
        getIndexWI: getIndexWithoutIncrement,
        init: init 
    }
};