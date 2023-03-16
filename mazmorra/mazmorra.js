const mapElement = document.getElementById("map");
const puntuacion = document.querySelector("#puntuacion");

// ITEMS
const llave = document.querySelector("#llave");

var numPunts = 0;
function comenzarJuego() {
    recorrerMapa();
    puntuacion.innerHTML = `Coins: ${numPunts}`;
}

// 0 camino, 1 pared, 2 moneda, 3 llave, 4 enemigo, 5 pj,  9 escalera
// [y][x]
var map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 0, 0, 0, 2, 1, 0, 0, 2, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1],
    [1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 2, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1],
    [1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 2, 1, 1],
    [1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 2, 0, 0, 1, 0, 1, 1],
    [1, 1, 0, 0, 0, 2, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1],
    [1, 1, 2, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 4, 9, 1, 1],
    [1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 2, 0, 1, 0, 0, 0, 1, 2, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1],
    [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1],
    [1, 1, 3, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 2, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1],
    [1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 2, 1, 0, 1, 1, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 2, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2, 1, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

var posY;
var posX;
var posYenemigo;
var posXenemigo;

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
                const newPj = document.getElementsByClassName("cell");
                newPj[count].style.backgroundImage = 'url(./img/pj.png)';
            } else if (map[i][j] == 0) {
                const newPj = document.getElementsByClassName("cell");
                newPj[count].style.backgroundImage = '';
            } else if (map[i][j] == 2) {
                const newPj = document.getElementsByClassName("cell");
                newPj[count].style.backgroundImage = 'url(./img/moneda.png)';
            } else if (map[i][j] == 3) {
                const newPj = document.getElementsByClassName("cell");
                newPj[count].style.backgroundImage = 'url(./img/llave.png)';
            } else if (map[i][j] == 4) {
                posYenemigo = i;
                posXenemigo = j;
                const newPj = document.getElementsByClassName("cell");
                newPj[count].style.backgroundImage = 'url(./img/boss0.png)';
            } else if (map[i][j] == 9) {
                const newPj = document.getElementsByClassName("cell");
                newPj[count].style.backgroundImage = 'url(./img/escAbierta.png)';
            }
            count++;
        }
    }
}

var direccion = '';
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
            }
            if (map[posY + next1][posX + next2] == 3) {
                llave.style.display = "block";
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
            }
            if (map[posY - next1][posX - next2] == 3) {
                llave.style.display = "block";
            }
            map[posY][posX] = 0;
            map[posY - next1][posX - next2] = 5;
            recorrerMapa();
        }
    }
}


// ENEMIGO
function movimientoEnemigo() {
    if (posY < posYenemigo && map[posYenemigo - 1][posXenemigo] == 0) {
        moverCeldaEnemigo('-', 1, 0);
    }else if (posX < posXenemigo && map[posYenemigo][posXenemigo - 1] == 0) {
        moverCeldaEnemigo('-', 0, 1);
    }else if (posY > posYenemigo && map[posYenemigo + 1][posXenemigo] == 0) {
        moverCeldaEnemigo('+', 1, 0);
    }else if (posX > posXenemigo && map[posYenemigo][posXenemigo + 1] == 0) {
        moverCeldaEnemigo('+', 0, 1);
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