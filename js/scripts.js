// Vars
const btnTorneo = document.getElementById('btnTorneo');
const btnTeam = document.getElementById('btnTeam');
const btnPlay = document.getElementById('btnPlay');
const secTeam = document.getElementById('shTeam');
const secPlay = document.getElementById('shPlay');
const secTeamTable = document.getElementById('shTablaT');
const secPlayTable = document.getElementById('shTablaP');
let bodyEquipo = document.getElementById("cuerpoT");
let bodyJugadores = document.getElementById("cuerpoJ");
let campeonato;
let teams;
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
            
            campeonato.agregaEquipo(new Equipo(document.getElementById('team').value, 
            document.getElementById('poblacion').value));
        }else{
           alert('Maximo equipos superado');
        }
        const teams = campeonato.equipos;
        console.log('Torneo ', campeonato);
        console.log('Teams ', teams);
        secTeamTable.classList.remove('tablaT');
        bodyEquipo.innerHTML = '';
        campeonato.equipos.forEach((equipo, idx) => {
            mostrarEquipos(equipo.nombre, equipo.poblacion, idx);
        });
    }else{
        alert('Todos los campos deben tener un valor');
    }
});

btnPlay.addEventListener('click',(event)=>{
    if(document.getElementById('nombre').value != '' && document.getElementById('apellido').value != '' && document.getElementById('rut').value != ''
    && !isNaN(document.getElementById('annio').valueAsNumber)){
        if(campeonato.equipos.jugadores.length < campeonato.getMaxPlayers()){
            if(!campeonato.equipos.buscaJugador(document.getElementById('rut').value)){
                const players = new Jugador(document.getElementById('nombre').value, document.getElementById('apellido').value, document.getElementById('rut').value, document.getElementById('annio').valueAsNumber)
                campeonato.equipos.agregaJugador(players);
            }else{
                alert('Juagdor Repetido');
            }

            // campeonato.agregaEquipo(new Equipo(document.getElementById('team').value, 
            //     document.getElementById('poblacion').value));
        }else{
           alert('Maximo jugadores superado');
        }
        console.log(campeonato);
        secPlayTable.classList.remove('tablaP');
        bodyJugadores.innerHTML = '';
        equipo.jugadores.forEach((jugadores, idx) => {
            mostrarJugadores(idx);
        });
    }else{
        alert('Todos los campos deben tener un valor');
    }
});
//Lee el Json
const data = fetch('./js/data.json')
    .then(res => res.json()) 
    .then(data => {
        campeonato = new Campeonato(data.campeonato.nombre);

        data.campeonato.equipos.forEach(element => {
            const equipo = new Equipo(element.nombre, element.capitan, element.poblacion);
            element.jugadores.forEach(sujeto => {
                const jugador = new Jugador(sujeto.nombre, sujeto.apellido, sujeto.rut, sujeto.nacio);
                equipo.agregaJugador(jugador);
            })
            campeonato.agregaEquipo(equipo)
            bodyEquipo.innerHTML = "";
        });
        campeonato.equipos.forEach((equipo, idx) => {
            mostrarEquipos(equipo.nombre, equipo.poblacion, idx);
        });

    });


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

function agregaJugadores(k) {
    secPlay.classList.remove('mostrarP');
}

function mostrarJugadores(k) {
    bodyJugadores.innerHTML = "";

    console.log(campeonato.equipos[k].jugadores);
    
    campeonato.equipos[k].jugadores.forEach(jugador => {
        const tr = document.createElement('tr');

        const tdNombre = document.createElement('td');
        const tdApellido = document.createElement('td');
        const tdRut = document.createElement('td');
        const tdNacio = document.createElement('td');

        tdNombre.textContent = jugador.nombre
        tdApellido.textContent = jugador.apellido
        tdRut.textContent = jugador.rut
        tdNacio.textContent = jugador.nacio

        tr.appendChild(tdNombre);
        tr.appendChild(tdApellido);
        tr.appendChild(tdRut);
        tr.appendChild(tdNacio);
        bodyJugadores.appendChild(tr);
    });
}

