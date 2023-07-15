const scene = document.getElementsByClassName('layers')[0]
const layers = scene.children
// const depth = [0.1, 0.2, 0.3, 0.4, 0.6, 0.6, 0.7, 0.8, 1]
const depth = [0.03, 0.06, 0.1, 0.13, 0.18, 0.2, 0.22, 0.25, 0.3]

let windowWidth = null
let windowHeight = null
let windowCenterX = null
let windowCenterY = null

let inputX = 0
let inputY = 0

let scrollY = window.scrollY
let offsetX = 0
let offsetY = 0

updateDimensions()
startAnimation()

function updateDimensions() {
    windowWidth = window.innerWidth
    windowHeight = window.innerHeight
    windowCenterX = windowWidth / 2
    windowCenterY = windowHeight / 2
}

function startAnimation() {
    window.addEventListener('resize', updateDimensions)
    scene.addEventListener('mousemove', onMouseMove)
    window.requestAnimationFrame(onAnimationFrame)
}

function onMouseMove(e) {
    const clientX = e.clientX
    const clientY = e.clientY

    if (windowCenterX && windowCenterY) {
        inputX = (clientX - windowCenterX) / windowCenterX
        inputY = (clientY - windowCenterY) / windowCenterY
    }
}

function onAnimationFrame() {
    const positionX = inputX * windowWidth / 10
    const positionY = inputY * windowHeight / 10 + window.scrollY / windowCenterY * 1.5

    offsetX += (positionX - offsetX) * 0.1//0.01
    offsetY += (positionY - offsetY) * 0.1//0.01

    for (let i = 0; i < layers.length; ++i) {
        const layer = layers[i]
        const layerDepth = depth[i] || 0.2
        const xOffset = offsetX * layerDepth * -1
        const yOffset = offsetY * layerDepth * -1

        setPosition(layer, xOffset, yOffset)
    }
    window.requestAnimationFrame(onAnimationFrame)
}

function setPosition(el, x, y) {
    let ox = x.toFixed(1)
    let oy = y.toFixed(1)
    console.log(`translate(${ox}px, ${oy}px) scale(1.1)`)

    el.style.transform = `translate(${ox}px, ${oy}px) scale(1.1)`

    // el.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px)' + 'scale(1.1)'
}

