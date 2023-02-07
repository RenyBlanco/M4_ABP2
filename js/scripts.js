// Vars
let tbody = document.getElementById("cuerpo");
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

        campeonato.equipos.forEach(equipo => {
            mostrarJugadores(equipo.jugadores, equipo.nombre)
        })

    });

function mostrarJugadores(jugadores, team) {
    jugadores.forEach(jugador => {
        const tr = document.createElement('tr');

        const tdEquipo = document.createElement('td');
        const tdNombre = document.createElement('td');
        const tdApellido = document.createElement('td');
        const tdRut = document.createElement('td');
        const tdNacio = document.createElement('td');

        tdEquipo.textContent = team;
        tdNombre.textContent = jugador.nombre
        tdApellido.textContent = jugador.apellido
        tdRut.textContent = jugador.rut
        tdNacio.textContent = jugador.nacio

        tr.appendChild(tdEquipo);
        tr.appendChild(tdNombre);
        tr.appendChild(tdApellido);
        tr.appendChild(tdRut);
        tr.appendChild(tdNacio);
        tbody.appendChild(tr);
    });
}