const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");
let direccionActual = "derecha";
let intervaloSerpiente;
const TAMANIO_CELDA = 25;
let comida = generarPosicionComida();

function iniciarJuego() {
    clearInterval(intervaloSerpiente);
    intervaloSerpiente = setInterval(moverSerpiente, 150);
}

function pausarJuego() {
    clearInterval(intervaloSerpiente);
}

const serpiente = [
    {x: 5, y: 12},
    {x: 4, y: 12},
    {x: 3, y: 12}
];

function limpiarCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function pintarParte(lineaX, lineaY, color) {
    const x = lineaX * TAMANIO_CELDA;
    const y = lineaY * TAMANIO_CELDA;

    ctx.fillStyle = color;
    ctx.fillRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);

    ctx.strokeStyle = "#111827";
    ctx.strokeRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);
}

function generarPosicionComida() {
    const celdasX = canvas.width / TAMANIO_CELDA;
    const celdasY = canvas.height / TAMANIO_CELDA;
    return {
        x: Math.floor(Math.random() * celdasX),
        y: Math.floor(Math.random() * celdasY)
    };
}

function pintarComida() {
    pintarParte(comida.x, comida.y, "#22c55e");
}

function atrapaComida() {
    const cabeza = serpiente[0];
    if (cabeza.x === comida.x && cabeza.y === comida.y) {
        return true;
    }
    return false;
}

function pintarSerpiente() {
    for (let i = 0; i < serpiente.length; i++) {
        if (i === 0) {
            pintarParte(serpiente[i].x, serpiente[i].y, "#facc15");
        } else {
            pintarParte(serpiente[i].x, serpiente[i].y, "#ef4444");
        }
    }
}

function moverSerpiente() {
    if (direccionActual === "derecha") moverDerecha();
    else if (direccionActual === "izquierda") moverIzquierda();
    else if (direccionActual === "arriba") moverArriba();
    else if (direccionActual === "abajo") moverAbajo();

    if (atrapaComida()) {
        const puntajeEl = document.getElementById("puntaje");
        puntajeEl.textContent = parseInt(puntajeEl.textContent) + 1;

        const cola = serpiente[serpiente.length - 1];
        serpiente.push({ x: cola.x, y: cola.y });

        comida = generarPosicionComida();
    }

    dibujarTodo();
}

function dibujarTablero() {
    ctx.strokeStyle = "#1e293b";
    ctx.lineWidth = 0.5;
    for (let x = 0; x <= canvas.width; x += TAMANIO_CELDA) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    for (let y = 0; y <= canvas.height; y += TAMANIO_CELDA) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

function moverDerecha() {
    const cabeza = serpiente[0];
    const nuevaCabeza = { x: cabeza.x + 1, y: cabeza.y };
    serpiente.unshift(nuevaCabeza);
    serpiente.pop();
}

function moverIzquierda() {
    const cabeza = serpiente[0];
    const nuevaCabeza = { x: cabeza.x - 1, y: cabeza.y };
    serpiente.unshift(nuevaCabeza);
    serpiente.pop();
}

function moverArriba() {
    const cabeza = serpiente[0];
    const nuevaCabeza = { x: cabeza.x, y: cabeza.y - 1 };
    serpiente.unshift(nuevaCabeza);
    serpiente.pop();
}

function moverAbajo() {
    const cabeza = serpiente[0];
    const nuevaCabeza = { x: cabeza.x, y: cabeza.y + 1 };
    serpiente.unshift(nuevaCabeza);
    serpiente.pop();
}

function cambiarDireccion(direccion) {
    if (direccion === "derecha" && direccionActual === "izquierda") return;
    if (direccion === "izquierda" && direccionActual === "derecha") return;
    if (direccion === "arriba" && direccionActual === "abajo") return;
    if (direccion === "abajo" && direccionActual === "arriba") return;

    direccionActual = direccion;
}

function dibujarTodo() {
    limpiarCanvas();
    dibujarTablero();
    pintarComida();
    pintarSerpiente();
}

dibujarTodo();



