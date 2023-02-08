function Equipo(_nombre, _poblacion){
    this.nombre = _nombre;
    this.poblacion = _poblacion;
    this.jugadores = [];
}

Equipo.prototype.getJugadores = function(){
    return 'jugadores';
}

Equipo.prototype.buscaJugador = function(player){
    if(player.length!=0){
        let encontro =  this.jugadores.filter(e => e.rut === player);
        if (encontro) {
            return true;
        }else{
            return false;
        }
    }  
}

Equipo.prototype.agregaJugador = function(player){
    if(this.jugadores.length < Campeonato.getMaxPlayers){
        this.jugadores.push(player);
        return true;
    }else{
        return false;
    }
}