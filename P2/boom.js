//-- Elementos de la gui
const gui = {
    display : document.getElementById("display"),
    start : document.getElementById("start"),
    stop : document.getElementById("stop"),
    reset : document.getElementById("reset"),
    numeros: document.querySelector(".numeros")
}



console.log("Ejecuitando JS...");

//-- Función para generar números aleatorios
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const keynums = document.getElementsByClassName("key");
const secretkey = [];
var vkey = 0; 

function new_keys() {

    for (let key of keynums) {
        let keyv = getRandomInt(9);
        key.value = "*";
        key.style.color = "red";
        secretkey.push(keyv.toString()); 
    }

}

function checkKey(btnum) {
    i=0;
    for (let key of keynums) {
        
        if (secretkey[i] == btnum && key.value == "*") {
            key.value = secretkey[i];
            key.style.color = "#1af01a";
            break;
        }    

        i+=1;
    }
}
console.log("Ejecutando JS...");

//-- Definir un objeto cronómetro
const crono = new Crono(gui.display);

//---- Configurar las funciones de retrollamada

//-- Arranque del cronometro
gui.start.onclick = () => {
    console.log("Start!!");
    crono.start();
}
  
//-- Detener el cronómetro
gui.stop.onclick = () => {
    console.log("Stop!");
    crono.stop();
}

//-- Reset del cronómetro
gui.reset.onclick = () => {
    console.log("Reset!");
    crono.reset();
}
//-- Iniciar el cronómetro al pulsar cualquier botón dentro de .numeros
gui.numeros.querySelectorAll(".digito").forEach(button => {
    button.onclick = () => {
        console.log("Start!!");
        crono.start();
    }
})