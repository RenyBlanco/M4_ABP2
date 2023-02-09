function Campeonato(_nombre, _maxT, _maxP, _minE){
    this.nombre = _nombre;
    this.maxEquipos = _maxT;
    this.maxPlayer = _maxP;
    this.minEdad = _minE;
    this.equipos = [];
} 

Campeonato.prototype.getEquipos= function (){
    return this.equipos;
}

Campeonato.prototype.getMaxPlayers= function (){
    return this.maxPlayer;
}
Campeonato.prototype.getMaxEquipos = function (){
    return this.maxEquipos;
}
Campeonato.prototype.getMinEdad = function (){
    return this.minEdad;
}
Campeonato.prototype.buscaEquipo = function(team){
    return this.equipos.filter(e => e.nombre === team);
}

Campeonato.prototype.agregaEquipo = function(team){
    if(this.equipos.length < this.maxEquipos){
        this.equipos.push(team);
        return true
    } else    {
        return false
    }       
}