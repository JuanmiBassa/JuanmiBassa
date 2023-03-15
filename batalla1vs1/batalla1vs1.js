const coliseo1 = document.querySelector("#coliseo");
const coliseo2 = document.querySelector("#coliseoElegir");
const btnElegir = document.querySelector("#btnElegir");

var vidaPj1 = document.querySelector("#vidapj1");
var dañoPj1 = document.querySelector("#dañopj1");
var vidaPj2 = document.querySelector("#vidapj2");
var dañoPj2 = document.querySelector("#dañopj2");

var pj1 = document.querySelector("#pj1");
var bot = document.querySelector("#bot");

const elegirCaballero = document.querySelector("#btnCaballero");
const elegirIslamico = document.querySelector("#btnIslamico");
const elegirZombie = document.querySelector("#btnZombie");
const elegirEsqueleto = document.querySelector("#btnEsqueleto");

const comenzar = document.querySelector("#comenzar");
const habilidades = document.querySelector("#habilidades");
const atacar = document.querySelector("#atacar");
const defender = document.querySelector("#defender");
const meditar = document.querySelector("#meditar");

const acciones = document.querySelector("#acciones");
var accionPJ1 = document.querySelector("#accionPJ1");
var accionPJ2 = document.querySelector("#accionPJ2");

const final = document.querySelector("#final");
const victoria = document.querySelector("#victoria");
const derrota = document.querySelector("#derrota");

let refresh = document.getElementById('refresh');
refresh.addEventListener('click', _ => {
    location.reload();
})

btnElegir.addEventListener("click", () => {
    coliseo2.style.display = "block";
    coliseo1.style.display = "none";
});

var jugador = {
    vida: 1,
    daño: 0
}

var enemigo = {
    vida: 1,
    daño: 0
}

function comenzarJuego() {
    const enemigos = ["caballero", "islamico", "zombie", "esqueleto"];
    var enemigoRandom = enemigos[Math.floor(Math.random() * enemigos.length)];
    if (enemigoRandom == "caballero") {
        statsBot(1500, 80, 'url(./img/caballero.png)');
    } else if (enemigoRandom == "islamico") {
        statsBot(1150, 120, 'url(./img/islamico.png)');
    } else if (enemigoRandom == "zombie") {
        statsBot(2000, 55, 'url(./img/zombie.png)');
    } else if (enemigoRandom == "esqueleto") {
        statsBot(2420, 40, 'url(./img/esqueleto.png)');
    }
}

elegirCaballero.addEventListener("click", () => {
    statsPJ(1500, 80, 'url(./img/caballero.png)');
});

elegirIslamico.addEventListener("click", () => {
    statsPJ(1150, 120, 'url(./img/islamico.png)');
});

elegirZombie.addEventListener("click", () => {
    statsPJ(2000, 55, 'url(./img/zombie.png)');
});

elegirEsqueleto.addEventListener("click", () => {
    statsPJ(2420, 40, 'url(./img/esqueleto.png)');
});

comenzar.addEventListener("click", () => {
    if (jugador.vida > 1) {
        habilidades.style.display = "flex";
        comenzar.style.display = "none";
        btnElegir.style.display = "none";
    }
});

var habRandomBot;

atacar.addEventListener("click", () => {
    habilidadBot();
    if (habRandomBot == "atacar") {
        accionPJ2.innerHTML = "ATAQUE";
        vidaPj2.innerHTML = enemigo.vida - jugador.daño;
        enemigo.vida -= jugador.daño;
        vidaPj1.innerHTML = jugador.vida - enemigo.daño;
        jugador.vida -= enemigo.daño;
    } else if (habRandomBot == "defender") {
        accionPJ2.innerHTML = "DEFENSA";
        enemigo.vida += 100;
        vidaPj2.innerHTML = enemigo.vida;
    } else if (habRandomBot == "meditar") {
        accionPJ2.innerHTML = "MEDITAR";
        vidaPj2.innerHTML = enemigo.vida - jugador.daño;
        enemigo.vida -= jugador.daño;
        enemigo.daño += 10;
        dañoPj2.innerHTML = enemigo.daño;
    }
    acciones.style.display = "flex";
    accionPJ1.innerHTML = "ATAQUE";
    if (jugador.vida < 1) {
        lose();
    } else if (enemigo.vida < 1) {
        win();
    }
});

defender.addEventListener("click", () => {
    habilidadBot();
    if (habRandomBot == "atacar") {
        accionPJ2.innerHTML = "ATAQUE";
        jugador.vida += 100;
        vidaPj1.innerHTML = jugador.vida;
    } else if (habRandomBot == "defender") {
        accionPJ2.innerHTML = "DEFENSA";
    } else if (habRandomBot == "meditar") {
        accionPJ2.innerHTML = "MEDITAR";
        enemigo.daño += 10;
        dañoPj2.innerHTML = enemigo.daño;
    }
    acciones.style.display = "flex";
    accionPJ1.innerHTML = "DEFENSA";
});

meditar.addEventListener("click", () => {
        habilidadBot();
        if (habRandomBot == "atacar") {
            accionPJ2.innerHTML = "ATAQUE";
            vidaPj1.innerHTML = jugador.vida - enemigo.daño;
            jugador.vida -= enemigo.daño;
            jugador.daño += 10;
            dañoPj1.innerHTML = jugador.daño;
        } else if (habRandomBot == "defender") {
            accionPJ2.innerHTML = "DEFENSA";
            jugador.daño += 10;
            dañoPj1.innerHTML = jugador.daño;
        } else if (habRandomBot == "meditar") {
            accionPJ2.innerHTML = "MEDITAR";
            enemigo.daño += 10;
            dañoPj2.innerHTML = enemigo.daño;
            jugador.daño += 10;
            dañoPj1.innerHTML = jugador.daño;
        }
        acciones.style.display = "flex";
        accionPJ1.innerHTML = "MEDITAR";
        if (jugador.vida < 1) {
            lose();
        } else if (enemigo.vida < 1) {
            win();
        }
});

function statsPJ(vida, daño, url) {
    jugador.vida = vida;
    jugador.daño = daño;
    pj1.style.backgroundImage = url;
    vidaPj1.innerHTML = jugador.vida;
    dañoPj1.innerHTML = jugador.daño;
    coliseo2.style.display = "none";
    coliseo1.style.display = "block";
}

function statsBot(vida, daño, url) {
    enemigo.vida = vida;
    enemigo.daño = daño;
    bot.style.backgroundImage = url;
    vidaPj2.innerHTML = enemigo.vida;
    dañoPj2.innerHTML = enemigo.daño;
}

function lose() {
    final.style.display = "flex";
    derrota.style.display = "flex";
    atacar.style.display = "none";
    defender.style.display = "none";
    meditar.style.display = "none";
}

function win() {
    final.style.display = "flex";
    victoria.style.display = "flex";
    atacar.style.display = "none";
    defender.style.display = "none";
    meditar.style.display = "none";
}

function habilidadBot() {
    const hab = ["atacar", "defender", "meditar"];
    habRandomBot = hab[Math.floor(Math.random() * hab.length)];
}

