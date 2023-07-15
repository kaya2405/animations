const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
let w = canvas.width = innerWidth
let h = canvas.height = innerHeight
let points = []
const point = {
    color: 'rgb(255,251,216)',
    radius: 2,
    count: 80,
    speed: 0.5,
    lineLength: 210,
    lineWidth: '0.5',
    life() {
        return Math.random() * 60 * 8
    },
    calcSpeed() {
        return Math.random() * (this.speed * 2) - this.speed
    },
    randomX() {
        return Math.random() * w
    },
    randomY() {
        return Math.random() * h
    }
}

window.onresize = () => {
    w = canvas.width = innerWidth
    h = canvas.height = innerHeight
}

class Point {
    x = point.randomX()
    y = point.randomY()
    vx = point.calcSpeed()
    vy = point.calcSpeed()
    life = point.life()

    changePosition() {
        this.x + this.vx > w && this.vx > 0 || this.x + this.vx < 0 && this.vx < 0 ? this.vx *= -1 : this.vx
        this.y + this.vy > h && this.vy > 0 || this.y + this.vy < 0 && this.vy < 0 ? this.vy *= -1 : this.vy
        this.x += this.vx
        this.y += this.vy
    }

    draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, point.radius, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fillStyle = point.color
        ctx.fill()
    }

    calculateLife() {
        if (this.life < 1) {
            this.x = point.randomX()
            this.y = point.randomY()
            this.vx = point.calcSpeed()
            this.vy = point.calcSpeed()
            this.life = point.life()
        }
        this.life--
    }
}

function reDrawBackground() {
    ctx.fillStyle = 'rgb(0,12,45)'
    ctx.fillRect(0, 0, w, h)
}

function drawLines() {
    let x1, y1, x2, y2, length, opacity
    for (let p1 in points) {
        for (let p2 in points) {
            x1 = points[p1].x
            y1 = points[p1].y
            x2 = points[p2].x
            y2 = points[p2].y

            length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)//формула диагонали

            if (length < point.lineLength) {
                opacity = 1 - length / point.lineLength
                ctx.lineWidth = point.lineWidth
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`

                ctx.beginPath()
                ctx.moveTo(x1, y1)
                ctx.lineTo(x2, y2)
                ctx.closePath()
                ctx.stroke()
            }
        }
    }
}

function reDrawpoints() {
    for (let p in points) {
        points[p].calculateLife()
        points[p].changePosition()
        points[p].draw()
    }
}

function loop() {
    reDrawBackground()
    reDrawpoints()
    drawLines()
    requestAnimationFrame(loop)
}

function init() {
    for (let i = 0; i < point.count; i++) {
        points.push(new Point)
    }
    loop()
}

init()
