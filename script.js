
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
