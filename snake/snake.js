const pacmanImg = document.querySelector("#pacman");
const enemigoImg = document.querySelector("#enemigo");

var Pacman = {
    X: 0,
    Y: 0,
    vel: 20,
};

var Enemigo = {
    X: 560,
    Y: 560,
    vel: 1,
};

function comenzarJuego() {
    Enemigo.X = Enemigo.X + Enemigo.vel;
    enemigoImg.style.marginLeft = `${Enemigo.X}px`;
    Enemigo.Y = Enemigo.Y + Enemigo.vel;
    enemigoImg.style.marginTop = `${Enemigo.Y}px`;
}

document.addEventListener('keydown', (event) => {
    var keyValue = event.key;
    if (keyValue == 'W' || keyValue == 'w' || keyValue == 'ArrowUp') {
        if (Pacman.Y > 0) {
            Pacman.Y = Pacman.Y - Pacman.vel;
            pacmanImg.style.marginTop = `${Pacman.Y}px`;
            pacmanImg.style.transform = `rotate(270deg)`;
        }
    }
    if (keyValue == 'A' || keyValue == 'a' || keyValue == 'ArrowLeft') {
        if (Pacman.X > 0) {
            Pacman.X = Pacman.X - Pacman.vel;
            pacmanImg.style.marginLeft = `${Pacman.X}px`;
            pacmanImg.style.transform = `rotate(180deg)`;
        }
    }
    if (keyValue == 'S' || keyValue == 's' || keyValue == 'ArrowDown') {
        if (Pacman.Y < 580) {
            Pacman.Y = Pacman.Y + Pacman.vel;
            pacmanImg.style.marginTop = `${Pacman.Y}px`;
            pacmanImg.style.transform = `rotate(90deg)`;
        }
    }
    if (keyValue == 'D' || keyValue == 'd' || keyValue == 'ArrowRight') {
        if (Pacman.X < 580) {
            Pacman.X = Pacman.X + Pacman.vel;
            pacmanImg.style.marginLeft = `${Pacman.X}px`;
            pacmanImg.style.transform = `rotate(0deg)`;
        }
    }
});

var distX;
var distY;
function movEnemigo() {
    distX = Enemigo.X - Pacman.X;
    distY = Enemigo.Y - Pacman.Y;
    if (Pacman.X < Enemigo.X && distX > distY) { // Se mueve en 'A'
        Enemigo.X = Enemigo.X - Enemigo.vel;
        enemigoImg.style.marginLeft = `${Enemigo.X}px`;
        enemigoImg.style.transform = `rotate(180deg)`;
    } else if (Pacman.X > Enemigo.X && distX < distY) { // Se mueve en 'D'
        enemigoImg.style.transform = `rotate(0deg)`;
        Enemigo.X = Enemigo.X + Enemigo.vel;
        enemigoImg.style.marginLeft = `${Enemigo.X}px`;
    } else if (Pacman.Y < Enemigo.Y) { // Se mueve en 'W'
        Enemigo.Y = Enemigo.Y - Enemigo.vel;
        enemigoImg.style.marginTop = `${Enemigo.Y}px`;
        enemigoImg.style.transform = `rotate(270deg)`;
    } else if (Pacman.Y > Enemigo.Y) { // Se mueve en 'S'
        Enemigo.Y = Enemigo.Y + Enemigo.vel;
        enemigoImg.style.marginTop = `${Enemigo.Y}px`;
        enemigoImg.style.transform = `rotate(90deg)`;
    }
} setInterval(movEnemigo, 10);

if (Pacman.X == Enemigo.X && Pacman.Y == Enemigo.Y) {
    console.log("Has perdido");
}

/*
function habilidadBot() {
    const hab = ["atacar", "defender", "meditar"];
    habRandomBot = hab[Math.floor(Math.random() * hab.length)];
}*/

var numImagen = 0;
function animPacman() {
    if (numImagen == 0) {
        pacmanImg.style.backgroundImage = 'url(./img/Muck1.png)';
        numImagen = 1;
    } else if (numImagen == 1) {
        pacmanImg.style.backgroundImage = 'url(./img/Muck2.png)';
        numImagen = 2;
    } else if (numImagen == 2) {
        pacmanImg.style.backgroundImage = 'url(./img/Muck0.png)';
        numImagen = 0;
    }
} setInterval(animPacman, 100);

function animEnemigo() {
    if (numImagen == 0) {
        enemigoImg.style.backgroundImage = 'url(./img/boss1.png)';
        numImagen = 1;
    } else if (numImagen == 1) {
        enemigoImg.style.backgroundImage = 'url(./img/boss2.png)';
        numImagen = 2;
    } else if (numImagen == 2) {
        enemigoImg.style.backgroundImage = 'url(./img/boss0.png)';
        numImagen = 0;
    }
} setInterval(animEnemigo, 100);