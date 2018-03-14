let myCanvas = document.getElementById('myCanvas')
let ctx = myCanvas.getContext('2d')

function userRandom(min, max) {
  return ((max - min) * Math.random() + min)
}

function Canvas(width, height) {
  this.width = width
  this.height = height
}

function City(width, height, src) {
  this.width = width
  this.height = height
  this.image = new Image()
  this.image.src = src
}
City.prototype.draw = function () {
  ctx.drawImage(this.image, 0, this.height, this.width, this.height)
}

function Night(width, height) {
  this.width = width
  this.height = height
}
Night.prototype.draw = function () {
  ctx.beginPath()
  ctx.fillStyle = '#00000063'
  ctx.rect(0, 0, this.width, this.height)
  ctx.fill()
  ctx.closePath()
}

function Star(width, height, n) {
  this.width = width
  this.height = height
  this.n = n + 1
  this.stars = []
}
Star.prototype.initialization = function () {
  let n = this.n
  while (--n) {
    this.stars.push({
      x: this.width*userRandom(0, n)/n,
      y: this.height*userRandom(0, n)/n
    })
  }
}
Star.prototype.draw = function () {
  ctx.fillStyle = 'white'
  for (let star of this.stars) {
    ctx.beginPath()
    ctx.arc(star.x, star.y, 1, 0, 2*Math.PI)
    ctx.fill()
    ctx.closePath()
  }
}

function Fragment(x, y, g, color) {
  this.x = x
  this.y = y
  this.g = g
  this.color = color
  this.v = userRandom(1, 2)
  this.angle = 2 * Math.PI  * Math.random()
  this.vX = Math.cos(this.angle) * this.v
  this.vY = Math.sin(this.angle) * this.v
  this.size = Math.random()
}
Fragment.prototype.go = function () {
  this.x += this.vX
  this.y -= this.vY

  this.vY -= 0.04

  this.vX *= this.g
  this.vY *= this.g
}
Fragment.prototype.draw = function () {
  ctx.fillStyle = this.color
  ctx.beginPath()
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
  ctx.fill()
  ctx.closePath()
  this.go()
}

function Firework(x, y, X, Y, color, speed) {
  this.x = x
  this.y = y
  this.X = X
  this.Y = Y
  this.speed = speed
  this.state = true
  this.boom = false
  this.color = color
  this.k = (this.X - this.x)/(this.y - this.Y)
  this.fragments = []
  this.time = 9
}
Firework.prototype.fly = function () {
  if (this.y > this.Y + this.speed) {
    this.y = this.y - this.speed
    this.x = this.x + this.speed * this.k
  } else if (this.y > this.Y) {
    this.y = this.Y
    this.x = this.X
  } else {
    this.boom = true
    let fragmentsNumber = parseInt(userRandom(15, 20))
    while (fragmentsNumber--) {
      let fragment = new Fragment(this.X, this.Y, 0.98, this.color)
      this.fragments.push(fragment)
    }
  }
}
Firework.prototype.flower = function () {
  if (this.time) {
    for (let fragment of this.fragments) {
      fragment.draw()
    }
    this.time--
  } else {
    this.state = false
  }
}
Firework.prototype.draw = function () {
  ctx.fillStyle = this.color
  if (!this.boom) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, 1.6, 0, 2*Math.PI)
    ctx.fill()
    ctx.closePath()
    this.fly()
  } else if (this.state) {
    this.flower()
  }
}