const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");

const TAMANIO_CELDA = 25;

const serpiente = [
    {x: 0, y: 5},
    {x: 0, y: 6},
    {x: 0, y: 7},
    {x: 0, y: 8},
    {x: 0, y: 9}
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

function pintarSerpiente() {
    for (let i = 0; i < serpiente.length; i++) {
        if (i === 0) {
            pintarParte(serpiente[i].x, serpiente[i].y, "#facc15"); // amarillo
        } else {
            pintarParte(serpiente[i].x, serpiente[i].y, "#ef4444"); // rojo
        }
    }
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

function dibujarTodo() {
    limpiarCanvas();
    dibujarTablero();
    pintarSerpiente();
}

dibujarTodo();



