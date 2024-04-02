//-- Declaración de variables y objetos
//-- Coordenadas iniciales del proyectil
let xop = 5;
let yop = 345;
let xp = xop;
let yp = yop;

const display = document.getElementById("display");
const display2 = document.getElementById("displayveloc");
const display3 = document.getElementById("displaydisp");


//-- Obtención del canvas y de los elementos HTML a usar
const canvas = document.getElementById("ctiro");
const ctx = canvas.getContext("2d");
//-- Definir dimensiones del canvas
canvas.width = 800;
canvas.height = 400;
/*
//-- Función principal de actualización
function update() 
{
  //-- Implementación del algoritmo de animación:

  //-- 1) Actualizar posición de los elementos

  //-- 2) Borrar el canvas

  //-- 3) Pintar los elementos en el canvas

  //-- 4) Repetir
  requestAnimationFrame(update);
}
*/
//-- Otras funciones....


//-- Hay que llamar a update la primera vez
update();
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

//-- Dibujar el proyectil
dibujarP(xop, yop, 50, 50, "green"); // Pintar el proyectil


//-- Función principal de actualización
function lanzar() 
{
  //-- Implementación del algoritmo de animación:

  //-- 1) Actualizar posición de los elementos

  //-- 2) Borrar el canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //-- 3) Pintar los elementos en el canvas
  dibujarP(xp, yp, 50, 50, "blue"); // Pintar el proyectil

  //-- 4) Repetir
  requestAnimationFrame(lanzar);
}
lanzar();

//-- Definir un objeto cronómetro
const crono = new Crono(gui.display);

//-- Arranque del cronometro
gui.start.onclick = () => {
    console.log("Start!!");
    crono.start();
}