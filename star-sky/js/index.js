import { ctx, canvas } from './lib'

const xRange = {
    min: 10,
    max: canvas.width - 10
}
const yRange = {
    min: 10,
    max: canvas.height - 10
}
const vRange = {
    min: 0.5,
    max: 10.0
}

let t1 = new Date()
function loopIteration() {
    const t2 = Date.now()
    const dt = t2 - t1
    t1 = t2

    update(dt)
    render()

    requestAnimationFrame(loopIteration)
}

let points = [
    // { x: 20, y: 10, width: 10, height: 10, v: { x: 2.6, y: 1.6 } },
    // { x: 30, y: 10, width: 10, height: 10, v: { x: 1.0, y: 1.0 } },
    // { x: 40, y: 10, width: 10, height: 10, v: { x: 2.6, y: 3.6 } },
]

function initialize() {
    const n = 60
    for (let i = 0; i < n; ++i) {
        points.push(createPoint(xRange, yRange))
    }
}

function update() {
    for (let p = 0; p < points.length; ++p) {
        collidePoint(points[p], canvas)
    }
}

function render() {
    ctx.fillStyle = 'rgba(256, 256, 256, 256)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // for (let p = 0, point; p < points.length; ++p) {
    //     point = points[p]
    //     ctx.fillStyle = 'rgb(180, 0, 0)'
    //     ctx.fillRect(point.x, point.y, point.width, point.height)
    // }

    // let point = points[0]
    // ctx.strokeStyle = 'rgb(0, 180, 0)'
    // ctx.beginPath()
    // ctx.moveTo(point.x, point.y)
    // for (let p = 1; p < points.length; ++p) {
    //     point = points[p]
    //     ctx.lineTo(point.x, point.y)
    // }
    // point = points[0]
    // ctx.lineTo(point.x, point.y)
    // ctx.stroke()

    for (let p = 0, a, b, c; p < points.length; p+=3) {
        a = points[p]
        b = points[p + 1]
        c = points[p + 2]
        drawTriangle(a, b, c)
    }
}

function main() {
    initialize()

    requestAnimationFrame(loopIteration)
}
main()

function collidePoint(point, canvas) {
    if (point.x < 0) point.v.x = -point.v.x
    if (point.x > canvas.width) point.v.x = -point.v.x
    if (point.y < 0) point.v.y = -point.v.y
    if (point.y > canvas.height) point.v.y = -point.v.y

    point.x += point.v.x
    point.y += point.v.y
}

function createPoint(xRange, yRange) {
    return {
        x: randomRange(xRange.min, xRange.max),
        y: randomRange(yRange.min, yRange.max),
        // width: 10,
        // height: 10,
        v: createV(vRange),//{x: , y: }
        color: randomColor()
    }
}

function createV(vRange) {//alpha 0-360
    const alpha = toRadians(randomRange(0.0, 360.0))
    const length = randomRange(vRange.min, vRange.max)

    return {
        x: Math.cos(alpha) * length,
        y: Math.sin(alpha) * length,
    }
}

function toRadians(grad) {
    return grad * (Math.PI / 180.0)
}

function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function drawTriangle(a, b, c) {
    ctx.strokeStyle = a.color

    ctx.beginPath()
    ctx.moveTo(a.x, a.y)
    ctx.lineTo(b.x, b.y)
    ctx.lineTo(c.x, c.y)
    ctx.closePath()
    ctx.stroke()
}

function randomColor() {
    return `rgb(${randomRange(0, 255)}, ${randomRange(0, 255)}, ${randomRange(0, 255)})`
}
