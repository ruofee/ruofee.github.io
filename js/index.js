let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
let ball = []

canvas.width = document.body.clientWidth - 4
canvas.height = document.body.clientHeight - 4

function randomBall(x, y) {
  return Math.random() * (y - x) + x
}

for (let i = 0; i < 7; i++) {
  ball[i] = {
    x: randomBall(0, canvas.width),
    y: randomBall(0, canvas.height),
    speedX: randomBall(-5, 5),
    speedY: randomBall(-5, 5),
    r: randomBall(10, 30),
    process: function () {
                if (this.x < canvas.width && this.x > 0 && this.y < canvas.height && this.y > 0) {
                  this.x = this.x + this.speedX
                  this.y = this.y + this.speedY
                } else {
                  if (this.x < 0 || this.x > canvas.width) {
                    this.speedX = -this.speedX
                    this.x = this.x + this.speedX
                    this.y = this.y + this.speedY
                  } else {
                    this.speedY = -this.speedY
                    this.x = this.x + this.speedX
                    this.y = this.y + this.speedY
                  }
                }
             }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  for (let i in ball) {
    ctx.beginPath()
    ctx.fillStyle = '#d8d8d8'
    ctx.arc(ball[i].x, ball[i].y, ball[i].r, 0, 2*Math.PI)
    ctx.fill()
    ctx.closePath()
    ball[i].process()
  }
  window.requestAnimationFrame(draw)
}

window.onresize = () => {
  canvas.width = document.body.clientWidth - 4
  canvas.height = document.body.clientHeight - 4
}

window.requestAnimationFrame(draw)