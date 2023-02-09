function Equipo(_nombre, _poblacion){
    this.nombre = _nombre;
    this.poblacion = _poblacion;
    this.jugadores = [];
}

Equipo.prototype.getJugadores = function(){
    return this.jugadores;
}

Equipo.prototype.buscaJugador = function(player){
    if(player.length!=0){
        let encontro =  this.jugadores.filter(e => e.rut === player);
        if (!encontro.length) {
            return false;
        }else{
            return true;
        }
    }  
}

Equipo.prototype.agregaJugador = function(player){
    this.jugadores.push(player);
    return true;
}
