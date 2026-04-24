
// CONFIGURACIÓN INICIAL

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let centerX = canvas.width / 2;
let centerY = canvas.height / 2;

// FUNCIÓN PARA PINTAR PIXEL
/**
 * Dibuja un pixel en el canvas
 * @param {number} x
 * @param {number} y
 * @param {string} color
 */
function plotPixel(x, y, color = "#000") {
    ctx.fillStyle = color;
    ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
}
/**
 * Dibuja una circunferencia usando el algoritmo de punto medio
 * @param {number} cx
 * @param {number} cy
 * @param {number} r
 * @param {string} color
 */
function midpointCircle(cx, cy, r, color = "#999") {

    let x = 0;
    let y = r;
    let p = 1 - r;

    while (x <= y) {

        // 8 octantes
        plotPixel(cx + x, cy + y, color);
        plotPixel(cx - x, cy + y, color);
        plotPixel(cx + x, cy - y, color);
        plotPixel(cx - x, cy - y, color);
        plotPixel(cx + y, cy + x, color);
        plotPixel(cx - y, cy + x, color);
        plotPixel(cx + y, cy - x, color);
        plotPixel(cx - y, cy - x, color);

        x++;

        if (p < 0) {
            p += 2 * x + 1;
        } else {
            y--;
            p += 2 * (x - y) + 1;
        }
    }
}

// prueba
midpointCircle(centerX, centerY, 100);
