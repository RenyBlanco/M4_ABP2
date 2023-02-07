function Equipo(_nombre, _capitan, _poblacion){
    this.nombre = _nombre;
    this.capitan = _capitan;
    this.poblacion = _poblacion;
    this.jugadores = [];
}

Equipo.prototype.getjugadores= function(){
    return jugadores;
}

Equipo.prototype.buscaJugador = function(player){
    if(player.length!=0){
        let encontro =  this.jugadores.filter(e => e.nombre === player);
        if (encontro) {
            return true;
        }else{
            return false;
        }
    }  
}

Equipo.prototype.agregaJugador = function(player){
    this.jugadores.push(player);
}