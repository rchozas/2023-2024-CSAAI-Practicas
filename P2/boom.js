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
    for (let i = 1; i <= 4; i++) {  // generar clave 4 digitos
        let keynum = getRandomInt(10); //-- num de 0 a 9
        let clave = gui['clave' + i];
        clave.textContent = "*";
        clave.style.color = "red";
        secretkey.push(keynum.toString());
    }
}
// func para comparar número pulsado con la clave secreta 
function checkKey(btnum) { //botón núm pulsado
    let found = false;
    for (let i = 0; i < secretkey.length; i++) {
        if (secretkey[i] == btnum && gui['clave' + (i + 1)].textContent == "*") {
            gui['clave' + (i + 1)].textContent = secretkey[i];
            gui['clave' + (i + 1)].style.color = "yellow";
            found = true;
            break;
        }
    }
    // Mostrar la clave actualizada
    let currentKey = secretkey.map((val, index) => gui['clave' + (index + 1)].textContent).join("");
    console.log("Clave actual:", currentKey);

    // Verificar si se ha descubierto la clave completa
    if (currentKey.indexOf("*") === -1) {
        console.log("¡Clave ok! Deteniendo cronómetro...");
        crono.stop(); // Detener el cronómetro
        finDeJuego(); // Mostrar mensaje de fin de juego
    }
}

function finDeJuego() {
    // Obtener el elemento del mensaje de fin de juego
    const mensajeFinDeJuego = document.getElementById("fin");
    // Mostrar el mensaje de fin de juego al terminar juego
    mensajeFinDeJuego.style.display = "block";
    
}
/*//-- Generamos números secretos y los almacenamos en un array
for (let i = 0; i < 10; i++) {
    let rnum = getRandomInt(9);
    secretkey.push(rnum.toString());
}

//-- Mostramos el contenido del array de números secretos en la consola
for (let j = 0; j < secretkey.length; j++) {
    console.log( j + ' Secret Key ' + secretkey[j]);
}*/

//-- Generar nueva clave y mostrarla
nueva_clave();
console.log("Clave generada(forma aleatoria):", secretkey.join(""));

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
        let btnum = button.textContent;
        console.log("Start!!");
        crono.start();
        checkKey(btnum);
    }
})