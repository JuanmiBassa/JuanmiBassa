function comenzarJuego() {

}

const map = [
    [0, 0, 1, 1, 1],
    [1, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [1, 1, 1, 0, 0],
    [1, 0, 0, 0, 0]
];

const mapElement = document.getElementById("map");
const playerElement = document.getElementById("player");

for (let i = 0; i < map.length; i++) {
    const row = map[i];
    for (let j = 0; j < row.length; j++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        if (row[j] === 1) {
            cell.style.backgroundColor = "black";
        }
        mapElement.appendChild(cell);
    }
    mapElement.appendChild(document.createElement("br"));
}

document.addEventListener('keydown', (event) => {
    const playerX = parseInt(playerElement.style.marginLeft) / 50;
    const playerY = parseInt(playerElement.style.marginTop) / 50;
    var keyValue = event.key;
    if (keyValue == 'ArrowUp' && map[playerY - 1][playerX] === 0) {
        playerElement.style.marginTop = (playerY - 1) * 50 + "px";
    }
    if (keyValue == 'ArrowLeft' && map[playerY][playerX - 1] === 0) {
        playerElement.style.marginLeft = (playerX - 1) * 50 + "px";
    }
    if (keyValue == 'ArrowDown'&& map[playerY + 1][playerX] === 0) {
        playerElement.style.marginTop = (playerY + 1) * 50 + "px";
    }
    if (keyValue == 'ArrowRight' && map[playerY][playerX + 1] === 0) {
        playerElement.style.marginLeft = (playerX + 1) * 50 + "px";
    }
});