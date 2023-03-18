const mapElement = document.getElementById("map");
const puntuacion = document.querySelector("#puntuacion");
const statsVida = document.querySelector(".statsVida");
const imgVida = document.querySelector(".imgVida");

// ITEMS
const llave = document.querySelector("#llave");
const pocion = document.querySelector("#pocion");

var Jugador = {
    X: 0,
    Y: 0,
    numPunts: 0,
    vidas: 3,
    direccion: '',
    tieneLlave: false,
};

var EnemigoOgro = {
    X: 0,
    Y: 0,
    direccion: '',
};

function comenzarJuego() {
    recorrerMapa();
    for (let k = 0; k < Jugador.vidas-1; k++) {
        añadirVida();
    }
    puntuacion.innerHTML = `Coins: ${Jugador.numPunts}`;
}

// 0 camino, 1 pared, 2 moneda, 3 llave, 4 enemigoOgro, 5 pj, 6 curacion, 9 escalera
// [y][x]
var map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 0, 1, 0, 0, 0, 1, 0, 2, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 2, 1],
    [1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 2, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1],
    [1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 2, 1],
    [1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 2, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 4, 9, 0, 1],
    [1, 1, 2, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 2, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 2, 0, 1, 0, 0, 1, 0, 1, 0, 1, 2, 1, 0, 1, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    [1, 3, 0, 0, 0, 1, 0, 2, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 2, 0, 1, 1, 6, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

// Cargar mapa
for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
        var cell = document.createElement("div");
        cell.classList.add("cell");
        mapElement.appendChild(cell);
        if (map[i][j] == 1) {
            cell.style.backgroundImage = 'url(./img/muro.png)';
        }
    }
    mapElement.appendChild(document.createElement("br"));
}

function recorrerMapa() {
    
    var count = 0;
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] == 5) {
                Jugador.Y = i;
                Jugador.X = j;
                const celdaNum = document.getElementsByClassName("cell");
                if (Jugador.direccion == 'w') {
                    celdaNum[count].style.backgroundImage = 'url(./img/pjEspalda.png)';
                    celdaNum[count].style.transform = 'rotateY(0deg)';
                } else if (Jugador.direccion == 'a') {
                    celdaNum[count].style.backgroundImage = 'url(./img/pj.png)';
                    celdaNum[count].style.transform = 'rotateY(180deg)';
                } else {
                    celdaNum[count].style.backgroundImage = 'url(./img/pj.png)';
                    celdaNum[count].style.transform = 'rotateY(0deg)';
                }
            } else if (map[i][j] == 0) {
                const celdaNum = document.getElementsByClassName("cell");
                celdaNum[count].style.backgroundImage = '';
            } else if (map[i][j] == 2) {
                const celdaNum = document.getElementsByClassName("cell");
                celdaNum[count].style.backgroundImage = 'url(./img/moneda.png)';
            } else if (map[i][j] == 3) {
                const celdaNum = document.getElementsByClassName("cell");
                celdaNum[count].style.backgroundImage = 'url(./img/llave.png)';
            } else if (map[i][j] == 4) {
                EnemigoOgro.Y = i;
                EnemigoOgro.X = j;
                const celdaNum = document.getElementsByClassName("cell");
                celdaNum[count].style.backgroundImage = 'url(./img/ogro.png)';
            } else if (map[i][j] == 6) {
                const celdaNum = document.getElementsByClassName("cell");
                celdaNum[count].style.backgroundImage = 'url(./img/curar.png)';
            } else if (map[i][j] == 9) {
                const celdaNum = document.getElementsByClassName("cell");
                if (Jugador.tieneLlave == true) {
                    celdaNum[count].style.backgroundImage = 'url(./img/escAbierta.png)';
                } else {
                    celdaNum[count].style.backgroundImage = 'url(./img/escCerrada.png)';
                }
            }
            count++;
        }
    }
}

document.addEventListener('keydown', (event) => {
    var keyValue = event.key;
    if (keyValue == 'W' || keyValue == 'w' || keyValue == 'ArrowUp') {
        Jugador.direccion = 'w';
    } else if (keyValue == 'A' || keyValue == 'a' || keyValue == 'ArrowLeft') {
        Jugador.direccion = 'a';
    } else if (keyValue == 'S' || keyValue == 's' || keyValue == 'ArrowDown') {
        Jugador.direccion = 's';
    } else if (keyValue == 'D' || keyValue == 'd' || keyValue == 'ArrowRight') {
        Jugador.direccion = 'd';
    } else if (keyValue == 'Control') {
        Jugador.direccion = 'pausa';
    }
});

function movimiento() {
    if (Jugador.direccion == 'w') {
        moverCelda('-', 1, 0);
    }
    if (Jugador.direccion == 'a') {
        moverCelda('-', 0, 1);
    }
    if (Jugador.direccion == 's') {
        moverCelda('+', 1, 0);
    }
    if (Jugador.direccion == 'd') {
        moverCelda('+', 0, 1);
    }
} setInterval(movimiento, 250);

function moverCelda(oper, next1, next2) {
    if (oper == '+') {
        if (map[Jugador.Y + next1][Jugador.X + next2] != 1) {
            if (map[Jugador.Y + next1][Jugador.X + next2] == 2) {
                Jugador.numPunts += 10;
                puntuacion.innerHTML = `Coins: ${Jugador.numPunts}`;
            } else if (map[Jugador.Y + next1][Jugador.X + next2] == 3) {
                llave.style.display = "block";
                Jugador.tieneLlave = true;
            } else if (map[Jugador.Y + next1][Jugador.X + next2] == 6) {
                añadirVida();
            }
            map[Jugador.Y][Jugador.X] = 0;
            map[Jugador.Y + next1][Jugador.X + next2] = 5;
            recorrerMapa();
        }
    } else {
        if (map[Jugador.Y - next1][Jugador.X - next2] != 1) {
            if (map[Jugador.Y - next1][Jugador.X - next2] == 2) {
                Jugador.numPunts += 10;
                puntuacion.innerHTML = `Coins: ${Jugador.numPunts}`;
            } else if (map[Jugador.Y - next1][Jugador.X - next2] == 3) {
                llave.style.display = "block";
                Jugador.tieneLlave = true;
            } else if (map[Jugador.Y - next1][Jugador.X - next2] == 6) {
                añadirVida();
            }
            map[Jugador.Y][Jugador.X] = 0;
            map[Jugador.Y - next1][Jugador.X - next2] = 5;
            recorrerMapa();
        }
    }
}

function añadirVida() {
    const pintarVida = document.createElement('div');
    pintarVida.classList.add('imgVida');
    statsVida.appendChild(pintarVida);
}

function eliminarVida() {
    const removeVida = document.querySelector('.imgVida');
    removeVida.remove();
}

function movimiento() {
    if (Jugador.direccion == 'w') {
        moverCelda('-', 1, 0);
    }
    if (Jugador.direccion == 'a') {
        moverCelda('-', 0, 1);
    }
    if (Jugador.direccion == 's') {
        moverCelda('+', 1, 0);
    }
    if (Jugador.direccion == 'd') {
        moverCelda('+', 0, 1);
    }
} setInterval(movimiento, 250);

// ENEMIGO
function defaultMovimiento() {
    if (EnemigoOgro.direccion == 'w') {
        if (Jugador.Y < EnemigoOgro.Y && map[EnemigoOgro.Y - 1][EnemigoOgro.X] == 0) {
            moverCeldaEnemigo('-', 1, 0);
        } else {
            EnemigoOgro.direccion = 'w';
        }
    }
    if (Jugador.Y < EnemigoOgro.Y && map[EnemigoOgro.Y - 1][EnemigoOgro.X] == 0) {
        moverCeldaEnemigo('-', 1, 0);
        Jugador.direccion = 's'
    } else if (Jugador.X < EnemigoOgro.X && map[EnemigoOgro.Y][EnemigoOgro.X - 1] == 0) {
        moverCeldaEnemigo('-', 0, 1);
    } else if (Jugador.Y > EnemigoOgro.Y && map[EnemigoOgro.Y + 1][EnemigoOgro.X] == 0) {
        moverCeldaEnemigo('+', 1, 0);
    } else if (Jugador.X > EnemigoOgro.X && map[EnemigoOgro.Y][EnemigoOgro.X + 1] == 0) {
        moverCeldaEnemigo('+', 0, 1);
    }
} setInterval(defaultMovimiento, 400);


/*
function movimientoEnemigo() {
    if (EnemigoOgro.direccion == 'w') {
        if (Jugador.Y < EnemigoOgro.Y && map[EnemigoOgro.Y - 1][EnemigoOgro.X] == 0) {
            moverCeldaEnemigo('-', 1, 0);
        } else {
            EnemigoOgro.direccion = 'w';
        }
    }
    if (Jugador.Y < EnemigoOgro.Y && map[EnemigoOgro.Y - 1][EnemigoOgro.X] == 0) {
        moverCeldaEnemigo('-', 1, 0);
        Jugador.direccion = 's'
    } else if (Jugador.X < EnemigoOgro.X && map[EnemigoOgro.Y][EnemigoOgro.X - 1] == 0) {
        moverCeldaEnemigo('-', 0, 1);
    } else if (Jugador.Y > EnemigoOgro.Y && map[EnemigoOgro.Y + 1][EnemigoOgro.X] == 0) {
        moverCeldaEnemigo('+', 1, 0);
    } else if (Jugador.X > EnemigoOgro.X && map[EnemigoOgro.Y][EnemigoOgro.X + 1] == 0) {
        moverCeldaEnemigo('+', 0, 1);
    }
} setInterval(movimientoEnemigo, 400);
*/

function moverCeldaEnemigo(oper, next1, next2) {
    if (oper == '+') {
        if (map[EnemigoOgro.Y + next1][EnemigoOgro.X + next2] == 0) {
            map[EnemigoOgro.Y][EnemigoOgro.X] = 0;
            map[EnemigoOgro.Y + next1][EnemigoOgro.X + next2] = 4;
            recorrerMapa();
        }
    } else {
        if (map[EnemigoOgro.Y - next1][EnemigoOgro.X - next2] == 0) {
            map[EnemigoOgro.Y][EnemigoOgro.X] = 0;
            map[EnemigoOgro.Y - next1][EnemigoOgro.X - next2] = 4;
            recorrerMapa();
        }
    }
}