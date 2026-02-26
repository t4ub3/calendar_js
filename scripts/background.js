const rootStyles = getComputedStyle(document.documentElement);

const mutedTealLight = rootStyles.getPropertyValue('--muted-teal-light').trim();
const slateGrey = rootStyles.getPropertyValue('--slate-grey').trim();
const linen = rootStyles.getPropertyValue('--linen').trim();
const platinumLight = rootStyles.getPropertyValue('--platinum-light').trim();
const platinum = rootStyles.getPropertyValue('--platinum').trim();


const columns = 100;
const canvas = document.getElementById("background-canvas");
const width = window.innerWidth;
const height = window.innerHeight;
const ctx = canvas.getContext("2d");
const cellSize = width / columns;
const rows = Math.floor(height / cellSize);

const delay = 1000;
let lastTime = 0;
const animationDuration = 1000;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const grid = Array.from({ length: columns }, () => new Array(rows));

function initGrid() {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            var rndBool = Math.random() < 0.3;
            grid[i][j] = rndBool;
            var color = rndBool ? platinumLight : platinum;
            ctx.fillStyle = color;
            ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
        }
    }
}

function draw(timestamp) {
    if (timestamp - lastTime > delay) {
        lastTime = timestamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        updateGrid()
    }
    requestAnimationFrame(draw);
}

function updateGrid() {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            var state = checkNewState(grid[i][j], i, j);
            grid[i][j] = state;
            var color = state ? platinumLight : platinum;
            console.log(color);
            ctx.fillStyle = color;
            ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);

        }
    };
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

            if (grid[nx][ny]) {
                count++;
            }
        }
    }
    return count;
}

initGrid();
requestAnimationFrame(draw);

