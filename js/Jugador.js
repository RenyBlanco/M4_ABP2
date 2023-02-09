function Jugador(_nombre, _apellido, _rut,  _nacio, _capi){
    this.nombre = _nombre;
    this.apellido = _apellido;
    this.rut = _rut;
    this.nacio = _nacio;
    this.capitan = _capi;
}

Jugador.getNombre = ()=> {
    return this.nombre
};

Jugador.getApellido = () => { 
    return this.apellido
}
Jugador.esMayor = (minima) => {
    let annioHoy = new Date();
    if((annioHoy.getFullYear()-this.nacio) > minima) {
        return true;
    }else{
        return false;
    }
}