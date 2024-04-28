// Variables de trabajo
const canvas = document.getElementById('networkCanvas');
const ctx = canvas.getContext('2d');

let redAleatoria;
let nodoOrigen = 0, nodoDestino = 0;
let rutaMinimaConRetardos;

const nodeRadius = 40;
const numNodos = 5;
const nodeConnect = 2;
const nodeRandomDelay = 1000;
const pipeRandomWeight = 100; // No hay retardo entre nodos 100

// Localizando elementos en el DOM
const btnCNet = document.getElementById("btnCNet");
const btnMinPath = document.getElementById("btnMinPath");
function updateDisplay(numNodos, tiempoTotal) {
  const nodosDisplay = document.querySelector('.nodos');
  const tiempoDisplay = document.querySelector('.timer');

  nodosDisplay.textContent = `${numNodos} Nodos`;
  tiempoDisplay.textContent = `Tiempo Total: ${Math.floor(tiempoTotal)} sec`;
}


// Clase para representar un nodo en el grafo
class Nodo {

  constructor(id, x, y, delay) {
    this.id = id; // Identificador del nodo
    this.x = x; // Coordenada X del nodo
    this.y = y; // Coordenada Y del nodo
    this.delay = delay; // Retardo del nodo en milisegundos
    this.conexiones = []; // Array de conexiones a otros nodos
  }
  
  // Método para agregar una conexión desde este nodo a otro nodo con un peso dado
  conectar(nodo, peso) {
    this.conexiones.push({ nodo, peso });
  }
  // Método para saber si un nodo está en la lista de conexiones de otro
  isconnected(idn) {

    let isconnected = false;

    this.conexiones.forEach(({ nodo: conexion, peso }) => {      
      if (idn == conexion.id) {
        //console.log("id nodo conectado:" + conexion.id);
        isconnected = true;
      }      
    });
    
    return isconnected;
  }
  // Método para saber la distancia entre dos nodos
  node_distance(nx, ny) {

    var a = nx - this.x;
    var b = ny - this.y;
        
    return Math.floor(Math.sqrt( a*a + b*b ));

  }
  // Método para encontrar el nodo más alejado
  far_node( nodos ) {

    let distn = 0;
    let cnode = this.id;
    let distaux = 0;
    let pos = 0;
    let npos = 0;

    for (let nodo of nodos) {
      distaux = this.node_distance(nodo.x, nodo.y);
  
      if (distaux != 0 && distaux > distn) {
        distn = distaux;
        cnode = nodo.id;
        npos = pos;
      }

      pos += 1;
    }
  
    return {pos: npos, id: cnode, distance: distn,};

  }
  // Método para encontrar el nodo más cercano
  close_node( nodos ) {

    let far_node = this.far_node( nodos );
    let cnode = far_node.id;
    let distn = far_node.distance;
    let distaux = 0;
    let pos = 0;
    let npos = 0;    
  
    for (let nodo of nodos) {
      distaux = this.node_distance(nodo.x, nodo.y);
  
      if (distaux != 0 && distaux <= distn) {
        distn = distaux;
        cnode = nodo.id;
        npos = pos;
      }

      pos += 1;
    }
  
    return {pos:npos, id: cnode, distance: distn,}
  
  }

}
  
// Función para generar una red aleatoria con nodos en diferentes estados de congestión
function crearRedAleatoriaConCongestion(numNodos, numConexiones) {
  
  const nodos = [];
  let x = 0, y = 0, delay = 0;
  let nodoActual = 0, nodoAleatorio = 0, pickNode = 0, peso = 0;
  let bSpace = false;

  const xs = Math.floor(canvas.width / numNodos);
  const ys = Math.floor(canvas.height / 2 );
  const xr = canvas.width - nodeRadius;
  const yr = canvas.height - nodeRadius;
  let xp = nodeRadius;
  let yp = nodeRadius;
  let xsa = xs;
  let ysa = ys;

  // Generamos los nodos
  for (let i = 0; i < numNodos; i++) {

    //var random_boolean = Math.random() < 0.5;
    if (Math.random() < 0.5) {
      yp = nodeRadius;
      ysa = ys;
    } 
    else {
      yp = ys;
      ysa = yr;
    }

    x = randomNumber(xp, xsa); // Generar coordenada x aleatoria
    y = randomNumber(yp, ysa); // Generar coordenada y aleatoria

    xp = xsa;
    xsa = xsa + xs;

    if ( xsa > xr && xsa <= canvas.width ) {
      xsa = xr;
    }

    if ( xsa > xr && xsa < canvas.width ) {
      xp = nodeRadius;
      xsa = xs;
    }    

    delay = generarRetardo(); // Retardo aleatorio para simular congestión
    nodos.push(new Nodo(i, x, y, delay)); // Generar un nuevo nodo y añadirlo a la lista de nodos de la red
  }
  // Conectamos los nodos
  // Seleccionamos los nodos más cercanos teniendo en cuenta la distancia
  // Seleccionamos tantos nodos como indica la variable numConexiones
  // El nodo será candidato siempre que no estén ya conectados
  for (let nodo of nodos) {
    //console.log("id: " + nodo.id + " distancia al nodo: " + nodo.node_distance(nodos[0].x, nodos[0].y));
 
     const clonedArray = [...nodos];
 
     for (let j = 0; j < numConexiones; j++) {
       let close_node = nodo.close_node(clonedArray);
       //console.log(close_node);
 
       if (!nodo.isconnected(close_node.id) && !clonedArray[close_node.pos].isconnected(nodo.id)) {
         // Añadimos una nueva conexión
         // Con el nodo más cercano y la distancia a ese nodo como el peso de la conexión
         nodo.conectar(clonedArray[close_node.pos], close_node.distance);
       }
 
       // Eliminamos el nodo seleccionado del array clonado para evitar que 
       // vuelva a salir elegido con splice.
       // 0 - Inserta en la posición que le indicamos.
       // 1 - Remplaza el elemento, y como no le damos un nuevo elemento se queda vacío.      
       clonedArray.splice(close_node.pos, 1);
     }
 
   }

  return nodos;
}

// Función para generar un retardo aleatorio entre 0 y 1000 ms
function generarRetardo() {
  return Math.random() * nodeRandomDelay;
}

// Generar un número aleatorio dentro de un rango
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}


function nodoIsInMinPath(nodoId) {
    if (!rutaMinimaConRetardos) return false; // Si la ruta mínima no está definida, el nodo no está en la ruta
    return rutaMinimaConRetardos.some(nodo => nodo.id === nodoId);
}
// Dibujar la red en el canvas
function drawNet(nnodes) {
    // Dibujamos las conexiones entre nodos
    nnodes.forEach(nodo => {
        nodo.conexiones.forEach(({ nodo: conexion, peso }) => {
            ctx.beginPath();
            ctx.moveTo(nodo.x, nodo.y);
            ctx.lineTo(conexion.x, conexion.y);
            ctx.lineWidth = 3; // Grosor de las líneas
            ctx.strokeStyle = 'greenyellow';
            ctx.stroke();

            ctx.font = 'bold 16px Arial';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            pw = "N" + nodo.id + " pw " + peso;
            const midX = Math.floor((nodo.x + conexion.x) / 2);
            const midY = Math.floor((nodo.y + conexion.y) / 2);
            ctx.fillText(pw, midX, midY);
        });
    });

    // Dibujamos los nodos
    nnodes.forEach(nodo => {
        ctx.beginPath();
        ctx.arc(nodo.x, nodo.y, nodeRadius, 0, 2 * Math.PI);
        if (nodoIsInMinPath(nodo.id)) {
            ctx.fillStyle = 'rgb(118, 206, 59)'; // Si el nodo está en la ruta mínima, dibujarlo en verde
        } else {
            ctx.fillStyle = 'rgb(231, 224, 224)'; // Si no, dibujarlo en gris
        }
        ctx.fill();
        ctx.stroke();
        ctx.font = '12px Arial';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        nodoDesc = "N" + nodo.id + " Delay " + Math.floor(nodo.delay);
        ctx.fillText(nodoDesc, nodo.x, nodo.y + 5);
    });
}

  
  
// Función de calback para generar la red de manera aleatoria
btnCNet.onclick = () => {

  // Generar red de nodos con congestión creada de manera aleatoria redAleatoria
  // Cada nodo tendrá un delay aleatorio para simular el envío de paquetes de datos
  redAleatoria = crearRedAleatoriaConCongestion(numNodos, nodeConnect);

  // Limpiamos el canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dibujar la red que hemos generado
  drawNet(redAleatoria);

  // Actualizar el display con el número de nodos
  updateDisplay(numNodos, 0); // El tiempo total se establece como 0 al generar la red
  // Mostrar mensaje en el display
  const mensajeDisplay = document.querySelector('.mensaje');
  mensajeDisplay.textContent = "Red generada correctamente";
  

}
const sonidoalerta = new Audio('adv.mp3');
btnMinPath.onclick = () => {
    // Verificar si la red ha sido generada previamente
    if (!redAleatoria) {
      const mensajeDisplay = document.querySelector('.mensaje');
      mensajeDisplay.textContent = "⚠️Red NO generada⚠️ Debe generar primero la RED";
      sonidoalerta.play();
      return; // Salir de la función si la red no está generada
    }
  
    // Supongamos que tienes una red de nodos llamada redAleatoria y tienes nodos origen y destino
    nodoOrigen = redAleatoria[0]; // Nodo de origen
    nodoDestino = redAleatoria[numNodos - 1]; // Nodo de destino
  
    // Calcular la ruta mínima entre el nodo origen y el nodo destino utilizando Dijkstra con retrasos
    rutaMinimaConRetardos = dijkstraConRetardos(redAleatoria, nodoOrigen, nodoDestino);
    console.log("Ruta mínima con retrasos:", rutaMinimaConRetardos);
  
    // Calcular el tiempo total
    const tiempoTotal = rutaMinimaConRetardos.reduce((total, { delay }) => total + delay, 0) ; // Convertir a segundos
  
    // Actualizar el display con el tiempo total
    updateDisplay(numNodos, tiempoTotal);
    // Volver a dibujar la red para reflejar la ruta mínima
    drawNet(redAleatoria);
    
  }
  