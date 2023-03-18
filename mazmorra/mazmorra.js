const mapElement = document.getElementById("map");
const puntuacion = document.querySelector("#puntuacion");
const statsVida = document.querySelector(".statsVida");
const imgVida = document.querySelector(".imgVida");
const tituloNivel = document.querySelector("h1");

// ITEMS
const llave = document.querySelector("#llave");
const pocion = document.querySelector("#pocion");


var Jugador = {
    X: 0,
    Y: 0,
    posInicialX: 0,
    posInicialY: 0,
    numPunts: 0,
    vidas: 3,
    direccion: 'Pausa',
    tieneLlave: false,
};

var Ogro = {
    X: 0,
    Y: 0,
    posInicialX: 0,
    posInicialY: 0,
    direccion: 'w',
};

var Demonio = {
    X: 0,
    Y: 0,
    posInicialX: 0,
    posInicialY: 0,
    direccion: 'w',
};

var Escaleras = {
    X: 0,
    Y: 0,
    nivel: 1,
};

function comenzarJuego() {
    recorrerMapa();
    for (let k = 0; k < Jugador.vidas - 1; k++) {
        añadirVida();
    }
    puntuacion.innerHTML = `Coins: ${Jugador.numPunts}`;
    tituloNivel.innerHTML = `Mazmorra Level ${Escaleras.nivel}`;
    Jugador.posInicialX = Jugador.X;
    Jugador.posInicialY = Jugador.Y;
    Ogro.posInicialX = Ogro.X;
    Ogro.posInicialY = Ogro.Y;
    Demonio.posInicialX = Demonio.X;
    Demonio.posInicialY = Demonio.Y;
}

// 0 camino, 1 pared, 2 moneda, 3 llave, 4 Ogro, 5 pj, 6 curacion, 8 demonio, 9 escalera
// ColumnaFila[y]RecorreFila[x]
var map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 0, 1, 0, 0, 0, 1, 0, 2, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 2, 1],
    [1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 2, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1],
    [1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 2, 1],
    [1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1],
    [1, 8, 0, 0, 0, 2, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 4, 9, 0, 1],
    [1, 1, 2, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 2, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 2, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    [1, 3, 0, 0, 0, 1, 0, 2, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 2, 1, 1, 1, 2, 0, 1, 1, 6, 1],
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
                Ogro.Y = i;
                Ogro.X = j;
                const celdaNum = document.getElementsByClassName("cell");
                celdaNum[count].style.backgroundImage = 'url(./img/ogro.png)';
            } else if (map[i][j] == 6) {
                const celdaNum = document.getElementsByClassName("cell");
                celdaNum[count].style.backgroundImage = 'url(./img/curar.png)';
            } else if (map[i][j] == 8) {
                Demonio.Y = i;
                Demonio.X = j;
                const celdaNum = document.getElementsByClassName("cell");
                celdaNum[count].style.backgroundImage = 'url(./img/demonio.png)';
            } else if (map[i][j] == 9) {
                Escaleras.Y = i;
                Escaleras.X = j;
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
    reinicioVida(Ogro);
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
            } if (map[Jugador.Y + next1][Jugador.X + next2] == 9) {
                if (Jugador.tieneLlave == true) {
                    nivel2();
                    Escaleras.nivel += 1;
                    tituloNivel.innerHTML = `Mazmorra Level ${Escaleras.nivel}`;
                }
            } else {
                map[Jugador.Y][Jugador.X] = 0;
                map[Jugador.Y + next1][Jugador.X + next2] = 5;
                recorrerMapa();
            }
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
            if (map[Jugador.Y - next1][Jugador.X - next2] == 9) {
                if (Jugador.tieneLlave == true) {
                    nivel2();
                }
            } else {
                map[Jugador.Y][Jugador.X] = 0;
                map[Jugador.Y - next1][Jugador.X - next2] = 5;
                recorrerMapa();
            }
        }
    }
}

function movimientoOgro() {
    if (Ogro.direccion == 'w') {
        defaultMovimientoEnemigo(Ogro);
    } else if (Ogro.direccion == 'a') {
        defaultMovimientoEnemigo(Ogro);
    } else if (Ogro.direccion == 's') {
        defaultMovimientoEnemigo(Ogro);
    } else if (Ogro.direccion == 'd') {
        defaultMovimientoEnemigo(Ogro);
    }
    reinicioVida(Ogro);
} setInterval(movimientoOgro, 400);

function movimientoDemonio() {
    if (Demonio.direccion == 'w') {
        defaultMovimientoEnemigo2(Demonio);
    } else if (Demonio.direccion == 'a') {
        defaultMovimientoEnemigo2(Demonio);
    } else if (Demonio.direccion == 's') {
        defaultMovimientoEnemigo2(Demonio);
    } else if (Demonio.direccion == 'd') {
        defaultMovimientoEnemigo2(Demonio);
    }
    reinicioVida(Demonio);
} setInterval(movimientoDemonio, 300);

// ENEMIGO
function defaultMovimientoEnemigo(enemigo) {
    if (enemigo.direccion == 'w') {
        if (map[enemigo.Y - 1][enemigo.X] == 0 || map[enemigo.Y - 1][enemigo.X] == 5) {
            moverCeldaEnemigo('-', 1, 0, enemigo, 4);
        } else if (map[enemigo.Y][enemigo.X - 1] == 0 || map[enemigo.Y][enemigo.X - 1] == 5) {
            enemigo.direccion = 'a';
        } else if (map[enemigo.Y][enemigo.X + 1] == 0 || map[enemigo.Y][enemigo.X + 1] == 5) {
            enemigo.direccion = 'd';
        } else {
            enemigo.direccion = 's';
        }
    } else if (enemigo.direccion == 'a') {
        if (map[enemigo.Y][enemigo.X - 1] == 0 || map[enemigo.Y][enemigo.X - 1] == 5) {
            moverCeldaEnemigo('-', 0, 1, enemigo, 4);
        } else if (map[enemigo.Y - 1][enemigo.X] == 0 || map[enemigo.Y - 1][enemigo.X] == 5) {
            enemigo.direccion = 'w';
        } else if (map[enemigo.Y + 1][enemigo.X] == 0 || map[enemigo.Y + 1][enemigo.X] == 5) {
            enemigo.direccion = 's';
        } else {
            enemigo.direccion = 'd';
        }
    } else if (enemigo.direccion == 's') {
        if (map[enemigo.Y + 1][enemigo.X] == 0 || map[enemigo.Y + 1][enemigo.X] == 5) {
            moverCeldaEnemigo('+', 1, 0, enemigo, 4);
        } else if (map[enemigo.Y][enemigo.X - 1] == 0 || map[enemigo.Y][enemigo.X - 1] == 5) {
            enemigo.direccion = 'a';
        } else if (map[enemigo.Y][enemigo.X + 1] == 0 || map[enemigo.Y][enemigo.X + 1] == 5) {
            enemigo.direccion = 'd';
        } else {
            enemigo.direccion = 'w';
        }
    } else if (enemigo.direccion == 'd') {
        if (map[enemigo.Y][enemigo.X + 1] == 0 || map[enemigo.Y][enemigo.X + 1] == 5) {
            moverCeldaEnemigo('+', 0, 1, enemigo, 4);
        } else if (map[enemigo.Y - 1][enemigo.X] == 0 || map[enemigo.Y - 1][enemigo.X] == 5) {
            enemigo.direccion = 'w';
        } else if (map[enemigo.Y + 1][enemigo.X] == 0 || map[enemigo.Y + 1][enemigo.X] == 5) {
            enemigo.direccion = 's';
        } else {
            enemigo.direccion = 'a';
        }
    }
}

function defaultMovimientoEnemigo2(enemigo) {
    if (enemigo.direccion == 'w') {
        if (map[enemigo.Y - 1][enemigo.X] == 0 || map[enemigo.Y - 1][enemigo.X] == 5) {
            moverCeldaEnemigo('-', 1, 0, enemigo, 8);
        } else if (map[enemigo.Y][enemigo.X - 1] == 0 || map[enemigo.Y][enemigo.X - 1] == 5) {
            enemigo.direccion = 'a';
        } else if (map[enemigo.Y][enemigo.X + 1] == 0 || map[enemigo.Y][enemigo.X + 1] == 5) {
            enemigo.direccion = 'd';
        } else {
            enemigo.direccion = 's';
        }
    } else if (enemigo.direccion == 'a') {
        if (map[enemigo.Y][enemigo.X - 1] == 0 || map[enemigo.Y][enemigo.X - 1] == 5) {
            moverCeldaEnemigo('-', 0, 1, enemigo, 8);
        } else if (map[enemigo.Y - 1][enemigo.X] == 0 || map[enemigo.Y - 1][enemigo.X] == 5) {
            enemigo.direccion = 'w';
        } else if (map[enemigo.Y + 1][enemigo.X] == 0 || map[enemigo.Y + 1][enemigo.X] == 5) {
            enemigo.direccion = 's';
        } else {
            enemigo.direccion = 'd';
        }
    } else if (enemigo.direccion == 's') {
        if (map[enemigo.Y + 1][enemigo.X] == 0 || map[enemigo.Y + 1][enemigo.X] == 5) {
            moverCeldaEnemigo('+', 1, 0, enemigo, 8);
        } else if (map[enemigo.Y][enemigo.X - 1] == 0 || map[enemigo.Y][enemigo.X - 1] == 5) {
            enemigo.direccion = 'a';
        } else if (map[enemigo.Y][enemigo.X + 1] == 0 || map[enemigo.Y][enemigo.X + 1] == 5) {
            enemigo.direccion = 'd';
        } else {
            enemigo.direccion = 'w';
        }
    } else if (enemigo.direccion == 'd') {
        if (map[enemigo.Y][enemigo.X + 1] == 0 || map[enemigo.Y][enemigo.X + 1] == 5) {
            moverCeldaEnemigo('+', 0, 1, enemigo, 8);
        } else if (map[enemigo.Y - 1][enemigo.X] == 0 || map[enemigo.Y - 1][enemigo.X] == 5) {
            enemigo.direccion = 'w';
        } else if (map[enemigo.Y + 1][enemigo.X] == 0 || map[enemigo.Y + 1][enemigo.X] == 5) {
            enemigo.direccion = 's';
        } else {
            enemigo.direccion = 'a';
        }
    }
}

function moverCeldaEnemigo(oper, next1, next2, enemigo, numEnemigo) {
    if (oper == '+') {
            map[enemigo.Y][enemigo.X] = 0;
            map[enemigo.Y + next1][enemigo.X + next2] = numEnemigo;
            recorrerMapa();
    } else {
            map[enemigo.Y][enemigo.X] = 0;
            map[enemigo.Y - next1][enemigo.X - next2] = numEnemigo;
            recorrerMapa();
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

function reinicioVida(enemigo, posEnemigo) {
    if (Jugador.X == enemigo.X && Jugador.Y == enemigo.Y) {
        map[Jugador.Y][Jugador.X] = 0;
        map[enemigo.Y][enemigo.X] = 0;
        Jugador.X = Jugador.posInicialX;
        Jugador.Y = Jugador.posInicialY;
        map[Jugador.Y][Jugador.X] = 5;
        Jugador.direccion = 'Pausa';
        enemigo.X = Ogro.posInicialX;
        enemigo.Y = Ogro.posInicialY;
        enemigo.direccion = 'w';
        eliminarVida();
    }
}

function nivel2() {
    const map2 = [
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
        [1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 2, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 2, 1, 2, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
        [1, 3, 0, 0, 0, 1, 0, 2, 1, 0, 0, 1, 2, 2, 2, 1, 0, 0, 0, 0, 1, 2, 1, 1, 1, 2, 0, 1, 1, 6, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    Jugador.direccion = 'Pausa';
    Ogro.direccion = 'w';
    map = map2;
    recorrerMapa();
}