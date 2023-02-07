function Jugador(_nombre, _apellido, _rut,  _nacio){
    this.nombre = _nombre;
    this.apellido = _apellido;
    this.rut = _rut;
    this.nacio = _nacio;
}

Jugador.getNombre = ()=> {
    return this.nombre
};

Jugador.getApellido = () => { 
    return this.apellido
}

Jugador.esMayor = (nacio) => {
    if(mayor) {
        return true;
    }else{
        return false;
    }
}