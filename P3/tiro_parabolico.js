//-- Elementos del DOM
//-- Obtención del canvas y de los elementos HTML a usar
const canvas = document.getElementById("ctiro");

const display = document.getElementById("display");
const range = document.getElementById("range");
const range_disp = document.getElementById("range_disp");
const display_disp = document.getElementById("display_disp");

const range_velocidad = document.getElementById("range_velocidad");
const range_vel2 = document.getElementById("range_vel2");
const display_veloc = document.getElementById("display_veloc");



//-- Acceder al botón de disparo
const btnLanzar = document.getElementById("btnLanzar");
//-- Acceder al botón de inicio
const btnIniciar = document.getElementById("btnIniciar");

//-- Obtener el contexto del canvas 2d
const ctx = canvas.getContext("2d");

//-- Definir dimensiones del canvas
canvas.width = 800;
canvas.height = 400;
//-- Declaración de variables y objetos
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
let velp = 2;

//-- Función principal de actualización
function lanzar() 
{
  //-- Implementación del algoritmo de animación:

  //-- 1) Actualizar posición de los elementos
  xp = xp + velp;

  //-- 2) Borrar el canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //-- 3) Pintar los elementos en el canvas
  dibujarO(xo,yo); // Pintar el objetivo
  dibujarP(xp, yp, 50, 50, "blue"); // Pintar el proyectil

  //-- 4) Repetir
  requestAnimationFrame(lanzar);
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
}
//-- función para pintar el objetivo
function dibujarO(x,y) {

    //-- Pintando el objetivo
    ctx.beginPath();

    //-- Dibujar un circulo: coordenadas x,y del centro
    //-- Radio, Angulo inicial y angulo final
    ctx.arc(x, y, 25, 0, 2 * Math.PI);
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;
    ctx.fillStyle = 'red';

    //-- Dibujar el relleno
    ctx.fill()    

    //-- Dibujar el trazo
    ctx.stroke();

    ctx.closePath();
}



//-- Deslizador ángulo de disparo
range.oninput = () => {
    range_disp.innerHTML = range.value;
}
range.onchange = () => {
    display_disp.innerHTML = range.value;
}
//-- Deslizador velocidad de disparo
range_velocidad.oninput = () => {
    range_vel2.innerHTML = range_velocidad.value;
}
range_velocidad.onchange = () => {
    display_veloc.innerHTML = range_velocidad.value;
}



//-lanzar();

//-- Definir un objeto cronómetro
/*const crono = new Crono(gui.display);

//-- Arranque del cronometro
gui.start.onclick = () => {
    console.log("Start!!");
    crono.start();
}*/
//-- Función de retrollamada del botón de disparo
btnLanzar.onclick = () => {
    lanzar();
    crono.start();
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
}