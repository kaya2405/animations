const canvasWidth = 100
const canvasHeight = 100

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

canvas.width = canvasWidth
canvas.height = canvasHeight

let resolution = 10
let cols = canvasWidth / resolution
let rows = canvasHeight / resolution
let grid = make2DArray(cols, rows)

function make2DArray(cols, rows) {
    let arr = new Array(cols)
    for (let c = 0; c < arr.length; c++) {
        arr[c] = new Array(rows)
    }
    return arr
}

function initialize() {
    for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
            grid[c][r] = Math.round(Math.random())
        }
    }
}

function render() {
    canvas.width = canvasWidth
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * resolution
            let y = j * resolution
            if (grid[i][j] == 1) {
                ctx.rect(x, y, resolution, resolution)
                ctx.fill()
            }
        }
    }
}

function update() {
    let next = make2DArray(cols, rows);

    for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {

            let state = grid[c][r]
            let neighbors = countNeighbors(grid, c, r)

            if (state == 0 && neighbors == 3) {
                next[c][r] = 1
            } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
                next[c][r] = 0
            } else {
                next[c][r] = state
            }
        }
    }
    grid = next
}

function countNeighbors(grid, x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let col = (x + i + cols) % cols;
            let row = (y + j + rows) % rows;
            sum += grid[col][row];
        }
    }
    sum -= grid[x][y]
    return sum
}

function draw() {
    update()
    render()
}

initialize()
draw()

