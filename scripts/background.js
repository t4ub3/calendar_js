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

function checkNewStateOld(currentState, i, j) {
    let neighbours = new Array();
    if (i === 0 && j === 0) {
        neighbours.push(...[grid[i][j + 1], grid[i + 1][j], grid[i + 1][j + 1]]);
    } else if (i === 0 && j === rows - 1) {
        neighbours.push(...[grid[i][j - 1], grid[i + 1][j], grid[i + 1][j - 1]]);
    } else if (i === columns - 1 && j === 0) {
        neighbours.push(...[grid[i - 1][j], grid[i - 1][j + 1], grid[i][j + 1]]);
    } else if (i === columns - 1 && j === rows - 1) {
        neighbours.push(...[grid[i][j - 1], grid[i - 1][j], grid[i - 1][j - 1]]);
    } else if (i === 0) {
        neighbours.push(...[grid[i][j + 1], grid[i + 1][j], grid[i + 1][j + 1], grid[i][j - 1], grid[i + 1][j - 1]]);
    } else if (i === columns - 1) {
        neighbours.push(...[grid[i][j + 1], grid[i - 1][j], grid[i - 1][j + 1], grid[i][j - 1], grid[i - 1][j - 1]]);
    } else if (j === 0) {
        neighbours.push(...[grid[i][j + 1], grid[i + 1][j + 1], grid[i - 1][j + 1], grid[i - 1][j], grid[i + 1][j]]);
    } else if (j === rows - 1) {
        neighbours.push(...[grid[i][j - 1], grid[i + 1][j - 1], grid[i - 1][j - 1], grid[i - 1][j], grid[i + 1][j]]);
    } else {
        neighbours.push(...[
            grid[i - 1][j + 1],
            grid[i - 1][j],
            grid[i - 1][j + 1],
            grid[i][j - 1],
            grid[i][j + 1],
            grid[i + 1][j - 1],
            grid[i + 1][j],
            grid[i + 1][j + 1],
        ])
    };
    let aliveNeighbours = 0;
    neighbours.forEach(item => {
        if (item === true) {
            aliveNeighbours++;
        }
    })
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

initGrid();
requestAnimationFrame(draw);



/* GPT SOLUTION FOR WRAPPING


function wrap(value, max) {
  return (value + max) % max;
}

function countNeighbors(grid, x, y, width, height) {
  let count = 0;

  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {

      if (dx === 0 && dy === 0) continue;

      const nx = wrap(x + dx, width);
      const ny = wrap(y + dy, height);

      count += grid[ny][nx];
    }
  }

  return count;
}

function nextGeneration(grid, width, height) {
  const newGrid = [];

  for (let y = 0; y < height; y++) {
    newGrid[y] = [];

    for (let x = 0; x < width; x++) {
      const neighbors = countNeighbors(grid, x, y, width, height);
      const alive = grid[y][x];

      if (alive) {
        newGrid[y][x] = neighbors === 2 || neighbors === 3 ? 1 : 0;
      } else {
        newGrid[y][x] = neighbors === 3 ? 1 : 0;
      }
    }
  }

  return newGrid;
}



*/

