const mapElement = document.getElementById("map");
const puntuacion = document.querySelector("#puntuacion");
const vida = document.querySelector("#vida");

// ITEMS
const llave = document.querySelector("#llave");
const pocion = document.querySelector("#pocion");

var posY;
var posX;
var posYenemigo;
var posXenemigo;
var numPunts = 0;
var vidas = 3;
var direccion = '';

var tieneLlave = false;
var tieneCuracion = false;

function comenzarJuego() {
    recorrerMapa();
    puntuacion.innerHTML = `Coins: ${numPunts}`;
    vida.innerHTML = `Vidas: ${vidas}`;
}

// 0 camino, 1 pared, 2 moneda, 3 llave, 4 enemigo, 5 pj, 6 curacion, 9 escalera
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
                posY = i;
                posX = j;
                const celdaNum = document.getElementsByClassName("cell");
                if (direccion == 'w') {
                    celdaNum[count].style.backgroundImage = 'url(./img/pjEspalda.png)';
                    celdaNum[count].style.transform = 'rotateY(0deg)';
                } else if (direccion == 'a') {
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
                posYenemigo = i;
                posXenemigo = j;
                const celdaNum = document.getElementsByClassName("cell");
                celdaNum[count].style.backgroundImage = 'url(./img/ogro.png)';
            } else if (map[i][j] == 6) {
                const celdaNum = document.getElementsByClassName("cell");
                celdaNum[count].style.backgroundImage = 'url(./img/curar.png)';
            } else if (map[i][j] == 9) {
                const celdaNum = document.getElementsByClassName("cell");
                if (tieneLlave == true) {
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
        direccion = 'w';
    } else if (keyValue == 'A' || keyValue == 'a' || keyValue == 'ArrowLeft') {
        direccion = 'a';
    } else if (keyValue == 'S' || keyValue == 's' || keyValue == 'ArrowDown') {
        direccion = 's';
    } else if (keyValue == 'D' || keyValue == 'd' || keyValue == 'ArrowRight') {
        direccion = 'd';
    } else if (keyValue == 'Control') {
        direccion = 'pausa';
    }
});

function movimiento() {
    if (direccion == 'w') {
        moverCelda('-', 1, 0);
    }
    if (direccion == 'a') {
        moverCelda('-', 0, 1);
    }
    if (direccion == 's') {
        moverCelda('+', 1, 0);
    }
    if (direccion == 'd') {
        moverCelda('+', 0, 1);
    }
} setInterval(movimiento, 250);

function moverCelda(oper, next1, next2) {
    if (oper == '+') {
        if (map[posY + next1][posX + next2] != 1) {
            if (map[posY + next1][posX + next2] == 2) {
                numPunts += 10;
                puntuacion.innerHTML = `Coins: ${numPunts}`;
            } else if (map[posY + next1][posX + next2] == 3) {
                llave.style.display = "block";
                tieneLlave = true;
            } else if (map[posY + next1][posX + next2] == 6) {
                pocion.style.display = "block";
                tieneCuracion = true;
            }
            map[posY][posX] = 0;
            map[posY + next1][posX + next2] = 5;
            recorrerMapa();
        }
    } else {
        if (map[posY - next1][posX - next2] != 1) {
            if (map[posY - next1][posX - next2] == 2) {
                numPunts += 10;
                puntuacion.innerHTML = `Coins: ${numPunts}`;
            } else if (map[posY - next1][posX - next2] == 3) {
                llave.style.display = "block";
                tieneLlave = true;
            } else if (map[posY - next1][posX - next2] == 6) {
                pocion.style.display = "block";
                tieneCuracion = true;
            }
            map[posY][posX] = 0;
            map[posY - next1][posX - next2] = 5;
            recorrerMapa();
        }
    }
}

// ENEMIGO
function movimientoEnemigo() {
    if (posX == posXenemigo && posY == posYenemigo) {
        vidas -= vidas;
        vida.innerHTML = `Vidas: ${vidas}`;
    } else {
        if (posY < posYenemigo && map[posYenemigo - 1][posXenemigo] == 0) {
            moverCeldaEnemigo('-', 1, 0);
        } else if (posX < posXenemigo && map[posYenemigo][posXenemigo - 1] == 0) {
            moverCeldaEnemigo('-', 0, 1);
        } else if (posY > posYenemigo && map[posYenemigo + 1][posXenemigo] == 0) {
            moverCeldaEnemigo('+', 1, 0);
        } else if (posX > posXenemigo && map[posYenemigo][posXenemigo + 1] == 0) {
            moverCeldaEnemigo('+', 0, 1);
        }
    }
} setInterval(movimientoEnemigo, 400);

function moverCeldaEnemigo(oper, next1, next2) {
    if (oper == '+') {
        if (map[posYenemigo + next1][posXenemigo + next2] == 0) {
            map[posYenemigo][posXenemigo] = 0;
            map[posYenemigo + next1][posXenemigo + next2] = 4;
            recorrerMapa();
        }
    } else {
        if (map[posYenemigo - next1][posXenemigo - next2] == 0) {
            map[posYenemigo][posXenemigo] = 0;
            map[posYenemigo - next1][posXenemigo - next2] = 4;
            recorrerMapa();
        }
    }
}