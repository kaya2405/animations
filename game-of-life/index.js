const size = 50
let htmlElements = []
let cells = []
const EMPTY = 0
const ALIVE = 1
let generationCount = 0

function createField() {
    const table = document.getElementById('field')

    for (let y = 0; y < size; ++y) {
        const tr = document.createElement('tr')

        const tdElements = []
        cells.push(new Array(size).fill(EMPTY))
        htmlElements.push(tdElements)
        table.appendChild(tr)
        for (var x = 0; x < size; x++) {
            const td = document.createElement('td')

            tdElements.push(td)
            tr.appendChild(td)
        }
    }
}

function draw() {
    for (let y = 0; y < size; ++y) {
        for (let x = 0; x < size; ++x) {
            let atr = 'cell ' + (cells[y][x] == 1 ? 'filled' : 'empty')
                htmlElements[y][x].setAttribute('class', atr)
        }
    }
}

function countNeighbours(x, y) {
    let count = 0;
    for (let dy = -1; dy < 2; ++dy) {
        for (let dx = -1; dx < 2; ++dx) {
            const nx = (x + dx + size) % size
            const ny = (y + dy + size) % size
            count += cells[ny][nx]
        }
    }
    return count - cells[y][x]
}

function newGeneration() {//новое поколение
    ++generationCount
    const newCells = []
    for (var i = 0; i < size; ++i) {
        newCells.push(new Array(size).fill(EMPTY))
    }
    for (let y = 0; y < size; ++y) {
        for (let x = 0; x < size; ++x) {
            let neighbour = countNeighbours(x, y)
            if (cells[y][x] == EMPTY && neighbour == 3) {
                newCells[y][x] = ALIVE
            }
            if (cells[y][x] == ALIVE && (neighbour == 2 || neighbour == 3)) {
                newCells[y][x] = ALIVE
            }
        }
    }
    cells = newCells
    draw()
}

function init() {
    createField()
    for (let i = 0; i < Math.floor(size * size * 0.3); i++) {
        do {
            let x = Math.floor(Math.random() * size)
            let y = Math.floor(Math.random() * size)
            if (cells[y][x] == EMPTY) {
                cells[y][x] = ALIVE
                break
            }
        } while (true)
    }
    draw()
}
init()

let speed = 100
let intervalID
function goLife() {
    intervalID = setInterval(newGeneration, speed)
    play.setAttribute('disabled', true)
}
function pauseLife() {
    clearInterval(intervalID)
    play.removeAttribute('disabled')

}

const step = document.getElementById('step')
const play = document.getElementById('play')
const pause = document.getElementById('pause')
const generation = document.getElementById('generation')

generation.textContent = generationCount

step.addEventListener('click', newGeneration)
play.addEventListener('click', goLife)
pause.addEventListener('click', pauseLife)
