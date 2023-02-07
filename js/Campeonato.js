function Campeonato(nombre){
    this.nombre = nombre;
    this.equipos = [];
}

Campeonato.prototype.getEquipos= function (){
    return equipos;
}

Campeonato.prototype.buscaEquipo = function(team){
    this.equipos.filter(nombre => team == nombre);
}

Campeonato.prototype.agregaEquipo = function(team){
    this.equipos.push(team);
}