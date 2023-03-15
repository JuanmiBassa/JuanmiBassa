const clonar = document.querySelector("#clonar");
const body = document.querySelector("body");
const contenido = document.querySelector(".contenido");
const letra = document.querySelector(".letra");
var texto = document.querySelector("#texto");
const error = document.querySelector("#error");
const letraAcertar = document.querySelector("#letraAcertar");
const incognita = document.querySelector("#incognita");
const textVidas = document.querySelector("#vidas");

var letraRandom = "";
var vidas = 10;
var haTerminado = false;

function comenzarJuego() {
    const letras = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L",
        "M", "N", "Ñ", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "Ç"];
    letraRandom = letras[Math.floor(Math.random() * letras.length)];
    letraAcertar.innerHTML = letraRandom;
    textVidas.innerHTML = `Vidas restantes: ${vidas}`;
}

const filtro = /^[A-Za-zñÑçÇ]+$/;

texto.addEventListener("keyup", () => {
    if (vidas > 0 && haTerminado == false) {
        if (texto.value.length > 1) {
            error.innerHTML = "Máximo un caracter";
            clonar.setAttribute("disabled", "");
        } else if (texto.value.length == 1) {
            if (!(texto.value.match(filtro))) {
                error.innerHTML = "Solo se permiten letras";
                clonar.setAttribute("disabled", "");
            } else {
                clonar.removeAttribute("disabled", "");
                error.innerHTML = "";
                if (event.keyCode === 13) {
                    enviarLetra();
                }
            }
        } else {
            clonar.setAttribute("disabled", "");
        }
    } else {
        error.innerHTML = "Reinicia para volver a jugar";
        clonar.setAttribute("disabled", "");
    }
});

clonar.addEventListener("click", () => {
    enviarLetra();
});

function enviarLetra() {
    texto.value = texto.value.toUpperCase();
    if (letraRandom == texto.value) {
        contenido.style.backgroundColor = "Green";
        textVidas.innerHTML = `Has ganado crack`;
        textVidas.style.color = "Green";
        clonar.setAttribute("disabled", "");
        letraAcertar.style.display = "flex";
        incognita.style.display = "none";
        haTerminado = true;
    } else {
        contenido.style.backgroundColor = "Red";
        clonar.setAttribute("disabled", "");
        vidas = vidas - 1;
        textVidas.innerHTML = `Vidas restantes: ${vidas}`;
    }
    if (vidas == 0) {
        clonar.setAttribute("disabled", "");
        letraAcertar.style.display = "flex";
        incognita.style.display = "none";
        textVidas.innerHTML = `Perdedor`;
        textVidas.style.color = "Red";
    }
    letra.innerHTML = texto.value;
    var clon = contenido.cloneNode(true);
    document.querySelector("#intentos").appendChild(clon);
    texto.value = "";
}

let refresh = document.getElementById('refresh');
refresh.addEventListener('click', _ => {
    location.reload();
})