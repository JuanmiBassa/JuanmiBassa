const mapElement = document.getElementById("map");
const playerElement = document.getElementById("player");

function comenzarJuego() {
    recorrerMapa();
}

// 0 camino, 1 pared, 5 personaje
// [y][x]
var map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 2, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 5, 0, 2, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 2, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1],
    [1, 0, 2, 0, 1, 0, 0, 0, 0, 1, 0, 2, 0, 0, 1, 0, 0, 0, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

var posY;
var posX;

// Cargar mapa
for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
        var cell = document.createElement("div");
        cell.classList.add("cell");
        mapElement.appendChild(cell);
        if (map[i][j] == 1) {
            cell.style.backgroundColor = "blue";
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
                console.log(newPj[count]);
                newPj[count].style.backgroundColor = "red";
                newPj[count].style.backgroundImage = 'url(./img/enemigo1.png)';
            } else if (map[i][j] == 0) {
                const newPj = document.getElementsByClassName("cell");
                newPj[count].style.backgroundColor = "transparent";
                newPj[count].style.backgroundImage = '';
            } else if (map[i][j] == 2) {
                const newPj = document.getElementsByClassName("cell");
                newPj[count].style.backgroundColor = "transparent";
                newPj[count].style.backgroundImage = 'url(./img/moneda.png)';
            }
            count++;
        }
    }
}

var direccion = 'w';
document.addEventListener('keydown', (event) => {
    var keyValue = event.key;
    if (keyValue == 'ArrowUp') {
        direccion = 'w';
    }
    if (keyValue == 'ArrowLeft') {
        direccion = 'a';
    }
    if (keyValue == 'ArrowDown') {
        direccion = 's';
    }
    if (keyValue == 'ArrowRight') {
        direccion = 'd';
    }
});

function movimiento() {
        if (map[posY-1][posX] == 0 || map[posY-1][posX] == 2) {
            if (direccion == 'w') {
            map[posY][posX] = 0;
            map[posY-1][posX] = 5;
            recorrerMapa();
        }
        }
    if (direccion == 'a') {
        if (map[posY][posX-1] == 0 || map[posY][posX-1] == 2) {
            map[posY][posX] = 0;
            map[posY][posX-1] = 5;
            recorrerMapa();
        }
    }
    if (direccion == 's') {
        if (map[posY+1][posX] == 0 || map[posY+1][posX] == 2) {
            map[posY][posX] = 0;
            map[posY+1][posX] = 5;
            recorrerMapa();
        }
    }
    if (direccion == 'd') {
        if (map[posY][posX+1] == 0 || map[posY][posX+1] == 2) {
            map[posY][posX] = 0;
            map[posY][posX+1] = 5;
            recorrerMapa();
        }
    }
} setInterval(movimiento, 300);