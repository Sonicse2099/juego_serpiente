const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");

const TAMANIO_CELDA = 25;

dibujarTodo();


function limpiarCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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
}



