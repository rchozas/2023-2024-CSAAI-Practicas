//-- Elementos del DOM
const canvas = document.getElementById("ctiro");

//-- Acceder al botón de disparo
const btnLanzar = document.getElementById("btnLanzar");
//-- Acceder al botón de iniciar
const btnIniciar = document.getElementById("btnIniciar");

//-- Obtener el contexto del canvas 2d
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;

//-- Coordenadas iniciales del proyectil
let xop = 5;
let yop = 345;
let xp = xop;
let yp = yop;

//-- Coordenadas iniciales del objetivo
let xomin = 200;
let xomax = 770;
let xo = 500; //getRandomXO(xomin,xomax);
let yo = 370;

//-- Dibujar el proyectil
dibujarP(xop, yop, 50, 50, "green"); // Pintar el proyectil

//-- Dibujar el objetivo
dibujarO(xo,yo); // Pintar el objetivo
//-- Velocidad del proyectil
let velp = 5;


//-- Función principal de actualización
function lanzar() 
{
  //-- Implementación del algoritmo de animación:

  //-- 1) Actualizar posición de los elementos
    //xp = xp + velp;

    //-- Condición de rebote en extremos verticales del canvas
    if (xp < 0 || xp >= (canvas.width - 20) ) {
        //rebote_sound.currentTime = 0;
        //rebote_sound.play();
        velp = -velp;
    }

    //-- Condición de rebote en extremos horizontales del canvas
    if (yp <= 0 || yp > 80) {
        //rebote_sound.currentTime = 0;
        //rebote_sound.play();
        velp = -velp;
    }

    //-- Actualizar la posición
    xp = xp + velp;
    yp = yp + velp;
    //x = x + velx;
    //y = y + vely;


  //-- 2) Borrar el canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //-- 3) Pintar los elementos en el canvas
  dibujarP(xp, yp, 50, 50, "blue"); // Pintar el proyectil
  dibujarO(xo,yo); // Pintar el objetivo

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

//-- Función de retrollamada del botón de disparo
btnLanzar.onclick = () => {
    lanzar();
}
//-- Función de retrollamada del botón de inicio
btnIniciar.onclick = () => {
    //--REINICIAR
    location.reload();
    //--DIBUJAR PROYECTIL
    dibujarP(xop, yop, 50, 50, "green"); // Pintar el proyectil

    
    
}