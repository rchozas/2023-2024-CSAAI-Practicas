//-- Elementos del DOM
//-- Obtención del canvas y de los elementos a usar
const canvas = document.getElementById("ctiro");

/*const display = document.getElementById("display");*/
const range = document.getElementById("range");
const range_disp = document.getElementById("range_disp");
const display_disp = document.getElementById("display_disp");

const range_velocidad = document.getElementById("range_velocidad");
const range_vel2 = document.getElementById("range_vel2");
const display_veloc = document.getElementById("display_veloc");


const gui = {
    display : document.getElementById("display"),
    start : document.getElementById("start"),
    stop : document.getElementById("stop"),
    reset : document.getElementById("reset"),
};

//-- Acceder al botón de disparo
const btnLanzar = document.getElementById("btnLanzar");

//-- Acceder al botón de inicio
const btnIniciar = document.getElementById("btnIniciar");

//-- Obtener el contexto del canvas 2d
const ctx = canvas.getContext("2d");

//-- Definir dimensiones del canvas
canvas.width = 800;
canvas.height = 400;

//-- Coordenadas iniciales del proyectil (sp esquina inf izq)
let xop = 5;
let yop = 345;
let xp = xop;
let yp = yop;

//-- Coordenadas iniciales del objetivo
let xomin = 200;
let xomax = 770;
/*let xo = 500; */
let xo = getRandomXo(xomin,xomax);
let yo = 370;

//-- Función para obtener la posición del objetivo de forma aleatoria
function getRandomXo(min, max) {
    return Math.random() * (max - min) + min;
}
//-- Dibujar el proyectil
dibujarP(xop, yop, 50, 50, "grey"); // Pintar el proyectil

//-- Dibujar el objetivo
dibujarO(xo,yo); // Pintar el objetivo

//-- Velocidad del proyectil
//let velp = 2;

//-- Sonidos del juego
const sonidoProyectil = new Audio('explosion.mp3'); /*Sonido del proyectil*/
const sonidoacierto = new Audio('ganar.mp3'); /*Sonido acierto*/
const sonidogameover = new Audio('gameover.mp3'); /*Sonido Game Over*/

function lanzar() {
    sonidoProyectil.play(); /* reproducir sonido del proyectil*/
    
    const angle = parseFloat(range_disp.innerHTML); // Ángulo en grados
    const velocidad = parseFloat(range_velocidad.value); // Velocidad en unidades por segundo
    
    // Componentes de la velocidad inicial
    const v0x = velocidad * Math.cos(angle * Math.PI / 180); // Componente horizontal de la velocidad inicial
    const v0y = velocidad * Math.sin(angle * Math.PI / 180); // Componente vertical de la velocidad inicial

    // Tiempo
    let t = 0;

    // Gravedad (m/s^2)
    const g = 9.8; 

    // Animación
    function animar() {
        // Actualizar posición del proyectil
        xp += v0x;
        yp -= (v0y - 0.5 * g * t * t); // Ecuación de movimiento para y en un tiro parabólico

        // Incrementar tiempo
        t += 0.1;

        // Borrar el canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Dibujar objetivo
        dibujarO(xo, yo);

        // Dibujar proyectil
        dibujarP(xp, yp, 30, 30, "blue");

        // Comprobar si el proyectil ha alcanzado el objetivo
        const distanciaAlObjetivo = Math.sqrt((xp - xo) ** 2 + (yp - yo) ** 2);
        if (distanciaAlObjetivo <= 45) { // Radio del objetivo
            alert("¡Objetivo alcanzado!"); // El proyectil ha alcanzado el objetivo
            sonidoacierto.play(); /*Reproducir sonido acierto */
            console.log("¡Objetivo alcanzado! --> Acierto");
            crono.stop();
            finDeJuego(); // Mostrar mensaje de fin de juego
            return;
        } else if (xp >= canvas.width) { // Si el proyectil llega al final del canvas
            alert("¡MALA PUNTERIA!"); // El proyectil no alcanzó el objetivo
            sonidogameover.play(); /*Reproducir sonido FALLO*/
            console.log("¡Objetivo NO alcanzado! --> FALLO");
            crono.stop();
            finDeJuego(); // Mostrar mensaje de fin de juego
            return;
        } else {
            // Si no ha alcanzado el objetivo ni llegado al final del canvas, continuar animando
            requestAnimationFrame(animar);
        }
    }

    // Iniciar la animación
    animar();
}
function finDeJuego() {
    // Obtener el elemento del mensaje de fin de juego
    const mensajeFinDeJuego = document.getElementById("fin");
    // Mostrar el mensaje de fin de juego al terminar juego
    mensajeFinDeJuego.style.display = "block";
    console.log("Mensaje de fin de juego --> ¿Acierto o Fallo? (diferente sonido)");
    
}
//-- función para pintar el proyectil
function dibujarP(x,y,lx,ly,color) {

    //-- Pintando el proyectil
    ctx.beginPath();

    //-- Definir un rectángulo de dimensiones lx x ly,
    ctx.rect(x, y, lx, ly);

    //-- Color de relleno del rectángulo
    ctx.fillStyle = color;

    //-- Mostrar el relleno
    ctx.fill();

    //-- Mostrar el trazo del rectángulo
    ctx.stroke();

    ctx.closePath();
    //console.log("Dibujo del proyectil OK!");
}
//-- función para pintar el objetivo
function dibujarO(x,y) {

    //-- Pintando el objetivo
    ctx.beginPath();

    //-- Dibujar un circulo: coordenadas x,y del centro
    //-- Radio, Angulo inicial y angulo final
    ctx.arc(x, y, 25, 0, 2 * Math.PI);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.fillStyle = 'brown';

    //-- Dibujar el relleno
    ctx.fill();    

    //-- Dibujar el trazo
    ctx.stroke();
    ctx.closePath();
    //console.log("Dibujo de objetivo OK!!");

}
//-- Deslizador ángulo de disparo
range.oninput = () => {
    range_disp.innerHTML = range.value;
    console.log("Actualización del ángulo de disparo");
}
range.onchange = () => {
    display_disp.innerHTML = range.value;
    console.log("Cambio del ángulo de disparo");
}
//-- Deslizador velocidad de disparo
range_velocidad.oninput = () => {
    range_vel2.innerHTML = range_velocidad.value;
    console.log("Actualización de la velocidad de disparo");
}
range_velocidad.onchange = () => {
    display_veloc.innerHTML = range_velocidad.value;
    console.log("Cambio de la velocidad de disparo");
}
                    
//-- Definir un objeto cronómetro
const crono = new Crono(gui.display);

//-- Función de retrollamada del botón de disparo
btnLanzar.onclick = () => {
    lanzar();
    crono.start();
    console.log("Inicio del lanzamiento");
}
//-- Función de retrollamada del botón iniciar
btnIniciar.onclick = () => {
    //-- Reiniciar
    location.reload();
    //-- Dibujar el proyectil
    dibujarP(xop, yop, 50, 50, "green"); // Pintar el proyectil
    
    //juego posición de inicio--> timer 0.0.0
    crono.stop();
    crono.reset();
    //console.log("Reinicio del juego");
}