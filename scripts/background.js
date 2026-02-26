const rootStyles = getComputedStyle(document.documentElement);

const platinumDark  = { r:208, g:211, b:213 };
const platinumLight = { r:238, g:241, b:242 };


const columns = 50;
const canvas = document.getElementById("background-canvas");
const width = window.innerWidth;
const height = window.innerHeight;
const ctx = canvas.getContext("2d");
const cellSize = Math.round(width / columns);
const rows = Math.round(height / cellSize);

const generationDelay = 2000;
const animationDuration = 1500;

const dpr = window.devicePixelRatio || 1;

canvas.width  = window.innerWidth  * dpr;
canvas.height = window.innerHeight * dpr;

canvas.style.width  = window.innerWidth  + "px";
canvas.style.height = window.innerHeight + "px";

ctx.scale(dpr, dpr);

let currentGrid = Array.from({ length: columns }, () => new Array(rows));
let nextGrid    = Array.from({ length: columns }, () => new Array(rows));

function initGrid() {
    for (let i = 0; i < currentGrid.length; i++) {
        for (let j = 0; j < currentGrid[i].length; j++) {
            var rndBool = Math.random() < 0.3;
            currentGrid[i][j] = rndBool;
            var color = rndBool ? platinumLight : platinumDark;
            ctx.fillStyle = color;
            ctx.fillRect(i * cellSize, j * cellSize, cellSize + 1, cellSize + 1);
        }
    }
}

function computeNextGrid() {
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            nextGrid[i][j] = checkNewState(currentGrid[i][j], i, j);
        }
    }
}

function drawGrid(progress) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {

            let from = currentGrid[i][j] ? 1 : 0;
            let to   = nextGrid[i][j]    ? 1 : 0;

            let transitionFactor = from + (to - from) * progress;

            let r = platinumDark.r  + (platinumLight.r  - platinumDark.r)  * transitionFactor;
            let g = platinumDark.g  + (platinumLight.g  - platinumDark.g)  * transitionFactor;
            let b = platinumDark.b  + (platinumLight.b  - platinumDark.b)  * transitionFactor;

            ctx.fillStyle = `rgb(${r|0},${g|0},${b|0})`;

            ctx.fillRect(
                i * cellSize,
                j * cellSize,
                cellSize + 1,
                cellSize + 1
            );
        }
    }
}

let lastGenerationTime = 0;
let transitionStart = 0;

function loop(timestamp) {

    if (timestamp - lastGenerationTime > generationDelay) {

        [currentGrid, nextGrid] = [nextGrid, currentGrid];

        computeNextGrid();

        transitionStart = timestamp;
        lastGenerationTime = timestamp;
    }

    let progress = Math.min(
        (timestamp - transitionStart) / animationDuration,
        1
    );

    drawGrid(progress);

    requestAnimationFrame(loop);
}

function checkNewState(currentState, i, j) {
    let aliveNeighbours = countNeighbors(i, j);
    if (aliveNeighbours === 2) {
        return currentState;
    } else if (aliveNeighbours === 3) {
        return true;
    }
    return false;
}

function wrap(value, max) {
    return (value + max) % max;
}

function countNeighbors(x, y) {
    let count = 0;
    for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {

            if (dx === 0 && dy === 0) continue;

            const nx = wrap(x + dx, columns);
            const ny = wrap(y + dy, rows);

            if (currentGrid[nx][ny]) {
                count++;
            }
        }
    }
    return count;
}


initGrid();
computeNextGrid();
requestAnimationFrame(loop);

