let canvas = new Canvas(300, 400)
let city = new City(canvas.width, canvas.height/2, '../image/firework/city.png')
let night = new Night(canvas.width, canvas.height)
let star = new Star(canvas.width, canvas.height, 50)
let fireworks = []

myCanvas.width = canvas.width
myCanvas.height = canvas.height



myCanvas.onclick = (e) => {
  let color = parseInt(userRandom(1, 4.99999999))
  switch (color) {
    case 1: color = '#ef0707'
    break
    case 2: color = '#e0ef07'
    break
    case 3: color = '#4e5ed2'
    break
    case 4: color = '#d215bb'
    break
  }
  let firework = new Firework(canvas.width/2 - 1, canvas.height, e.pageX - myCanvas.offsetLeft, e.pageY - myCanvas.offsetTop, color, 5)
  fireworks.push(firework)
}

star.initialization()

function index() {
  // ctx.clearRect(0, 0, canvas.width, canvas.height)
  night.draw()
  star.draw()
  city.draw()

  for (let i in fireworks) {
    if (fireworks[i].state) {
      fireworks[i].draw()
    } else {
      fireworks.splice(i, 1)
    }
  }
  window.requestAnimationFrame(index)  
}

window.requestAnimationFrame(index)