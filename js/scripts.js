// Vars
const btnTorneo = document.getElementById('btnTorneo');
const btnTeam = document.getElementById('btnTeam');
const btnPlay = document.getElementById('btnPlay');
const secTeam = document.getElementById('shTeam');
const secPlay = document.getElementById('shPlay');
const secTeamTable = document.getElementById('shTablaT');
const secPlayTable = document.getElementById('shTablaP');
const cabeza = document.getElementById('cabeza').innerHTML;

let bodyEquipo = document.getElementById("cuerpoT");
let bodyJugadores = document.getElementById("cuerpoJ");
let cabeza = document.getElementById('h3Play').innerHTML;
let campeonato;
let teams;
let k;
let players;


//Escucha Boton Torneo
btnTorneo.addEventListener('click',(event)=>{
    if(document.getElementById('torneo').value != '' && !isNaN(document.getElementById('maxT').valueAsNumber) && !isNaN(document.getElementById('maxP').valueAsNumber)
    && !isNaN(document.getElementById('minEd').valueAsNumber)){
        campeonato = new Campeonato(document.getElementById('torneo').value, 
            document.getElementById('maxT').valueAsNumber, 
            document.getElementById('maxP').valueAsNumber, 
            document.getElementById('minEd').valueAsNumber);
        btnTorneo.setAttribute('disabled','disabled');
        secTeam.classList.remove('mostrarT');
    }else{
        alert('Todos los campos deben tener un valor');
    }
});

btnTeam.addEventListener('click',(event)=>{
    if(document.getElementById('team').value != '' && document.getElementById('poblacion').value != ''){
        if(campeonato.equipos.length < campeonato.getMaxEquipos()){
            var valor = campeonato.buscaEquipo(document.getElementById('team').value);
            if(valor.length === 0){
                campeonato.agregaEquipo(new Equipo(document.getElementById('team').value, 
                document.getElementById('poblacion').value));
                limpiaEquipo();
            }else{
                alert('El equipo ya existe');
                limpiaEquipo();
            }
        }else{
           alert('Maximo equipos superado');
           limpiaEquipo();
        }
        secTeamTable.classList.remove('tablaT');
        bodyEquipo.innerHTML = '';
        campeonato.equipos.forEach((equipo, idx) => {
            mostrarEquipos(equipo.nombre, equipo.poblacion, idx);
        });
    }else{
        alert('Todos los campos deben tener un valor');
    }
});

function limpiaEquipo(){
    document.getElementById('team').value = '';
    document.getElementById('poblacion').value = '';
}

btnPlay.addEventListener('click',(event)=>{
    if(document.getElementById('nombre').value != '' && document.getElementById('apellido').value != '' && document.getElementById('rut').value != ''
    && !isNaN(document.getElementById('annio').valueAsNumber)){
        if(campeonato.equipos[k].jugadores.length < campeonato.getMaxPlayers()){
            for (let index = 0; index <campeonato.equipos.length; index++) {
                if(campeonato.equipos[index].buscaJugador(document.getElementById('rut').value)){
                    alert("El jugador ya existe");
                    limpiaJugadores();
                    return false;
                }
            }
            let annioHoy = new Date();
            if((annioHoy.getFullYear()-document.getElementById('annio').valueAsNumber) > campeonato.getMinEdad()){
                const players = new Jugador(document.getElementById('nombre').value, document.getElementById('apellido').value, document.getElementById('rut').value, document.getElementById('annio').valueAsNumber, document.getElementById('capitan').checked)
                campeonato.equipos[k].agregaJugador(players, campeonato.getMaxPlayers);
                limpiaJugadores();
            }else{
                alert('Juagdor debe tener una edad mínima de ' + campeonato.getMinEdad() + ' años');
                limpiaJugadores();
            }
        }else{
           alert('Maximo jugadores superado');
           limpiaJugadores();
        }
        secPlayTable.classList.remove('tablaP');
        bodyJugadores.innerHTML = '';
        mostrarJugadores(k);
    }else{
        alert('Todos los campos deben tener un valor');
    }
});

function limpiaJugadores(){
    document.getElementById('nombre').value = '';
    document.getElementById('apellido').value = '';
    document.getElementById('rut').value = '';
    document.getElementById('annio').valueAsNumber = 0  ;
    document.getElementById('capitan').checked = false;
}
//Lee el Json
// const data = fetch('./js/data.json')
//     .then(res => res.json()) 
//     .then(data => {
//         campeonato = new Campeonato(data.campeonato.nombre);

//         data.campeonato.equipos.forEach(element => {
//             const equipo = new Equipo(element.nombre, element.capitan, element.poblacion);
//             element.jugadores.forEach(sujeto => {
//                 const jugador = new Jugador(sujeto.nombre, sujeto.apellido, sujeto.rut, sujeto.nacio);
//                 equipo.agregaJugador(jugador);
//             })
//             campeonato.agregaEquipo(equipo)
//             bodyEquipo.innerHTML = "";
//         });
//         campeonato.equipos.forEach((equipo, idx) => {
//             mostrarEquipos(equipo.nombre, equipo.poblacion, idx);
//         });

//     });


function mostrarEquipos(team, poblacion, k) {
    
    const tr = document.createElement('tr');
    const tdEquipo = document.createElement('td');
    const tdPoblacion = document.createElement('td');
    const tdAccion = document.createElement('td');

    tdEquipo.textContent = team;
    tdPoblacion.textContent = poblacion;
    tdAccion.innerHTML = `<a href="javascript:void(0)" onclick="agregaJugadores(${k})">Incluir Jugadores</a>&nbsp;
    <a href="javascript:void(0)" onclick="mostrarJugadores(${k})">Ver Jugadores</a>`
    tr.appendChild(tdEquipo);
    tr.appendChild(tdPoblacion);
    tr.appendChild(tdAccion);
    bodyEquipo.appendChild(tr);
}

function agregaJugadores(indice) {
    k = indice;
    document.getElementById('h3Play').innerHTML = cabeza+' de '+campeonato.equipos[k].nombre;
    secPlay.classList.remove('mostrarP');
       
    if(document.getElementById('cabeza').innerHTML == cabeza){
        document.getElementById('cabeza').innerHTML = cabeza+' de '+campeonato.equipos[k].nombre;
    }
    if(document.getElementById('cabeza').innerHTML !== cabeza+' de '+campeonato.equipos[k].nombre){
        document.getElementById('cabeza').innerHTML = cabeza+' de '+campeonato.equipos[k].nombre;
        bodyJugadores.innerHTML = '';
    }else{
        document.getElementById('cabeza').innerHTML = cabeza+' de '+campeonato.equipos[k].nombre;
    }
}

function mostrarJugadores(k) {
    bodyJugadores.innerHTML = '';
    document.getElementById('cabeza').innerHTML = cabeza+' de '+campeonato.equipos[k].nombre;

    campeonato.equipos[k].jugadores.forEach(jugador => {
        const tr = document.createElement('tr');
        const tdNombre = document.createElement('td');
        const tdApellido = document.createElement('td');
        const tdRut = document.createElement('td');
        const tdNacio = document.createElement('td');
        const tdCapi = document.createElement('td');

        tdNombre.textContent = jugador.nombre
        tdApellido.textContent = jugador.apellido
        tdRut.textContent = jugador.rut
        tdNacio.textContent = jugador.nacio
        jugador.capitan ? tdCapi.textContent = 'Si' : tdCapi.textContent = 'No';

        tr.appendChild(tdNombre);
        tr.appendChild(tdApellido);
        tr.appendChild(tdRut);
        tr.appendChild(tdNacio);
        tr.appendChild(tdCapi);
        bodyJugadores.appendChild(tr);
    });
}

