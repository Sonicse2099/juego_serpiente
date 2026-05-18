const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");
let direccionActual = "derecha";
let intervaloSerpiente;
const TAMANIO_CELDA = 25;
let velocidad = 150;
let comida = generarPosicionComida();

function iniciarJuego() {
    clearInterval(intervaloSerpiente);
    document.getElementById("estado").textContent = "🏃 Jugando";
    intervaloSerpiente = setInterval(moverSerpiente, velocidad);
}

function pausarJuego() {
    clearInterval(intervaloSerpiente);
    document.getElementById("estado").textContent = "⏸️ Pausado";
}

function reiniciarJuego() {
    clearInterval(intervaloSerpiente);
    serpiente.length = 0;
    serpiente.push({x:5,y:12},{x:4,y:12},{x:3,y:12});
    direccionActual = "derecha";
    document.getElementById("puntaje").textContent = "0";
    document.getElementById("estado").textContent = "Listo";
    document.getElementById("mensaje").textContent = "Presiona iniciar para comenzar.";
    comida = generarPosicionComida();
    dibujarTodo();
}

const serpiente = [
    {x: 5, y: 12},
    {x: 4, y: 12},
    {x: 3, y: 12}
];

function limpiarCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Cabeza: Sonic emoji
function pintarCabeza(lineaX, lineaY) {
    const x = lineaX * TAMANIO_CELDA;
    const y = lineaY * TAMANIO_CELDA;
    ctx.font = `${TAMANIO_CELDA + 2}px Arial`;
    ctx.textBaseline = "top";
    ctx.fillText("🦔", x, y);
}

// Cuerpo: anillos dorados
function pintarAnillo(lineaX, lineaY) {
    const x = lineaX * TAMANIO_CELDA;
    const y = lineaY * TAMANIO_CELDA;
    const cx = x + TAMANIO_CELDA / 2;
    const cy = y + TAMANIO_CELDA / 2;
    const radio = TAMANIO_CELDA / 2 - 2;

    ctx.beginPath();
    ctx.arc(cx, cy, radio, 0, Math.PI * 2);
    ctx.strokeStyle = "#FFD700";
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cx, cy, radio - 3, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,215,0,0.15)";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(cx - 2, cy - 2, radio * 0.3, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.35)";
    ctx.fill();
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

// Comida: anillo brillante
function pintarComida() {
    const cx = comida.x * TAMANIO_CELDA + TAMANIO_CELDA / 2;
    const cy = comida.y * TAMANIO_CELDA + TAMANIO_CELDA / 2;
    const radio = TAMANIO_CELDA / 2 - 1;

    ctx.shadowColor = "#FFD700";
    ctx.shadowBlur = 14;

    ctx.beginPath();
    ctx.arc(cx, cy, radio, 0, Math.PI * 2);
    ctx.strokeStyle = "#FFD700";
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cx, cy, radio - 4, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,215,0,0.5)";
    ctx.fill();

    ctx.shadowBlur = 0;
}

function atrapaComida() {
    const cabeza = serpiente[0];
    return cabeza.x === comida.x && cabeza.y === comida.y;
}

function pintarSerpiente() {
    for (let i = 0; i < serpiente.length; i++) {
        if (i === 0) pintarCabeza(serpiente[i].x, serpiente[i].y);
        else pintarAnillo(serpiente[i].x, serpiente[i].y);
    }
}

function verificarColision() {
    const cabeza = serpiente[0];
    const celdasX = canvas.width / TAMANIO_CELDA;
    const celdasY = canvas.height / TAMANIO_CELDA;
    return cabeza.x < 0 || cabeza.x >= celdasX || cabeza.y < 0 || cabeza.y >= celdasY;
}

function moverSerpiente() {
    if (direccionActual === "derecha") moverDerecha();
    else if (direccionActual === "izquierda") moverIzquierda();
    else if (direccionActual === "arriba") moverArriba();
    else if (direccionActual === "abajo") moverAbajo();

    if (verificarColision()) {
        clearInterval(intervaloSerpiente);
        document.getElementById("estado").textContent = "💀 GAME OVER";
        document.getElementById("mensaje").textContent = "¡Sonic chocó! Presiona Reiniciar.";
        return;
    }

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
    ctx.strokeStyle = "#0d2d4d";
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
    const c = serpiente[0];
    serpiente.unshift({x: c.x+1, y: c.y});
    serpiente.pop();
}
function moverIzquierda() {
    const c = serpiente[0];
    serpiente.unshift({x: c.x-1, y: c.y});
    serpiente.pop();
}
function moverArriba() {
    const c = serpiente[0];
    serpiente.unshift({x: c.x, y: c.y-1});
    serpiente.pop();
}
function moverAbajo() {
    const c = serpiente[0];
    serpiente.unshift({x: c.x, y: c.y+1});
    serpiente.pop();
}

function cambiarDireccion(direccion) {
    if (direccion === "derecha" && direccionActual === "izquierda") return;
    if (direccion === "izquierda" && direccionActual === "derecha") return;
    if (direccion === "arriba" && direccionActual === "abajo") return;
    if (direccion === "abajo" && direccionActual === "arriba") return;
    direccionActual = direccion;
}

// EXTRA: control con teclado (flechas)
document.addEventListener("keydown", function(e) {
    if (e.key === "ArrowRight") cambiarDireccion("derecha");
    else if (e.key === "ArrowLeft") cambiarDireccion("izquierda");
    else if (e.key === "ArrowUp") cambiarDireccion("arriba");
    else if (e.key === "ArrowDown") cambiarDireccion("abajo");
});

function dibujarTodo() {
    limpiarCanvas();
    dibujarTablero();
    pintarComida();
    pintarSerpiente();
}

dibujarTodo();



