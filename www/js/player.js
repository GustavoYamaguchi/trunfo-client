var Player = function() {
    var id,
        cartas,
        pontos;

    var init = function(id){
    	set_id(id);
    	cartas = [];
    	pontos = 0;
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

    var set_cartas = function(newCarta){
    	cartas.push(newCarta);
    }

    return {
        getID: get_id,
        setID: set_id,
        getPontos: get_pontos,
        setPontos: set_pontos,
        setCartas: set_cartas,
        getCartas: get_cartas,
        init: init 
    }
};