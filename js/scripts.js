// Vars
let bodyEquipo = document.getElementById("cuerpoT");
let bodyJugadores = document.getElementById("cuerpoJ");
let campeonato;

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
        });

        campeonato.equipos.forEach((equipo, idx) => {
            mostrarEquipos(equipo.nombre, equipo.poblacion, equipo.capitan, equipo.jugadores, idx);
        });

    });

function mostrarEquipos(team, poblacion, capitan, jugadores, k) {

    const tr = document.createElement('tr');

    const tdEquipo = document.createElement('td');
    const tdPoblacion = document.createElement('td');
    const tdCapitan = document.createElement('td');
    const tdAccion = document.createElement('td');

    tdEquipo.textContent = team;
    tdPoblacion.textContent = poblacion;
    tdCapitan.textContent = capitan;
    tdAccion.innerHTML = `<a href="javascript:void(0)" onclick="edita(${k})">Editar</a>&nbsp;
    <a href="javascript:void(0)" onclick="mostrarJugadores(${k})">Ver Jugadores</a>`
    tr.appendChild(tdEquipo);
    tr.appendChild(tdPoblacion);
    tr.appendChild(tdCapitan);
    tr.appendChild(tdAccion);
    bodyEquipo.appendChild(tr);
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

