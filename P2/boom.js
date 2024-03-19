//-- Elementos de la gui
const gui = {
    display : document.getElementById("display"),
    start : document.getElementById("start"),
    stop : document.getElementById("stop"),
    reset : document.getElementById("reset"),
    numeros: document.querySelector(".numeros"),
    clave1 : document.getElementById("clave1"),
    clave2 : document.getElementById("clave2"),
    clave3 : document.getElementById("clave3"),
    clave4 : document.getElementById("clave4"),
}

console.log("Ejecutando JS...");

//-- Array que almacena números secretos
const secretkey = [];

//-- Generar números aleatorios con un valor máximo
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function nueva_clave(){
    for(let = 1; i<=4; i++) {
        let keynum = getRandomInt(10); //-- de 0 a 9
        let clave = gui['clave' + i];
        clave.textContent = "*";
        clave.style.color = "red";
        secretkey.push(keynum.toString());
    }
}
//-- Generamos números secretos y los almacenamos en un array
for (let i = 0; i < 10; i++) {
    let rnum = getRandomInt(9);
    secretkey.push(rnum.toString());
}

//-- Mostramos el contenido del array de números secretos en la consola
for (let j = 0; j < secretkey.length; j++) {
    console.log( j + ' Secret Key ' + secretkey[j]);
}



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