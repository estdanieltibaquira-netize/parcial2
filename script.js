
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

/**
 * Dibuja una línea con Bresenham
 * @param {number} x0
 * @param {number} y0
 * @param {number} x1
 * @param {number} y1
 * @param {string} color
 */
function bresenhamLine(x0, y0, x1, y1, color = "#000") {

    let dx = Math.abs(x1 - x0);
    let dy = Math.abs(y1 - y0);

    let sx = (x0 < x1) ? 1 : -1;
    let sy = (y0 < y1) ? 1 : -1;

    let err = dx - dy;

    while (true) {
        plotPixel(x0, y0, color);

        if (x0 === x1 && y0 === y1) break;

        let e2 = 2 * err;

        if (e2 > -dy) {
            err -= dy;
            x0 += sx;
        }

        if (e2 < dx) {
            err += dx;
            y0 += sy;
        }
    }
}

// prueba línea
bresenhamLine(50, 50, 200, 200);
/**
 * Calcula posiciones sobre la circunferencia
 */
function getOrbitalPositions(r, n) {
    let posiciones = [];

    for (let i = 0; i < n; i++) {
        let angulo = (2 * Math.PI / n) * i;

        let x = centerX + r * Math.cos(angulo);
        let y = centerY + r * Math.sin(angulo);

        posiciones.push({x: x, y: y});
    }

    return posiciones;
}

/**
 * Genera vértices de un polígono
 */
function getPolygonVertices(cx, cy, lados, radio) {
    let vertices = [];

    for (let i = 0; i < lados; i++) {
        let angulo = (2 * Math.PI / lados) * i;

        let x = cx + radio * Math.cos(angulo);
        let y = cy + radio * Math.sin(angulo);

        vertices.push({x: x, y: y});
    }

    return vertices;
}

function drawPolygon(vertices) {

    for (let i = 0; i < vertices.length; i++) {

        let p1 = vertices[i];
        let p2 = vertices[(i + 1) % vertices.length];

        bresenhamLine(
            Math.round(p1.x),
            Math.round(p1.y),
            Math.round(p2.x),
            Math.round(p2.y)
        );
    }
}
