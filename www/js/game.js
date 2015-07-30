var Game = function() {
    var jogadores,
        campo;

    var init = function(player1, player2) {
        jogadores = [];
        jogadores.push(player1);
        jogadores.push(player2);
        campo = {};
        campo.player1 = [];
        campo.player2 = [];
        sortCards();
    }

    var get_campo = function(player) {
        if (player === 0) {
            return campo.player1;
        } else {
            return campo.player2;
        }
    }

    var set_carta_campo = function(player, card) {
        if (player === 0) {
            return campo.player1.push(card);
        } else {
            return campo.player2.push(card);
        }
    }

    var get_new_card = function(player) {
        var index = jogadores[player].getIndex();
        if (index === -1) {
            return null;
        } else {
            return jogadores[player].getCarta(index);
        }
    }
    var remove_card_from_campo = function(cartaID, campoAtt) {
        var camp = novoCampo(cartaID, get_campo(campoAtt));
        if(campoAtt === 0){
        	campo.player1 = camp;
        }else{
        	campo.player2 = camp;
        }
    }

    var get_jogador = function(index) {
        return jogadores[index];
    }

    var sortCards = function() {
        var len = cartas.length;
        var aux = randomiza(len);
        for (var i = 0; i < len / 2; i++) {
            jogadores[0].setCartas(cartas[aux[i]]);
            jogadores[1].setCartas(cartas[aux[i + (len / 2)]]);
        };
    }

    var novoCampo = function(index, newCampo) {
        var aux = [];
        for (var i = 0; i < newCampo.length; i++) {
            if (i !== index) {
                aux.push(newCampo[i]);
            }
        };
        return aux;
    }



    return {
        init: init,
        getJogador: get_jogador,
        newCard: get_new_card,
        getCampo: get_campo,
        setCartaCampo: set_carta_campo,
        removeCard: remove_card_from_campo
    }
};

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