let objCanvas = new Canvas(300, 400)
let city = new City(objCanvas.width, objCanvas.height/2, '../image/firework/city.png')
let night = new Night(objCanvas.width, objCanvas.height)
let star = new Star(objCanvas.width, objCanvas.height, 50)
let fireworks = []

myCanvas.width = objCanvas.width
myCanvas.height = objCanvas.height



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
  let firework = new Firework(objCanvas.width/2 - 1, objCanvas.height, e.pageX - myCanvas.offsetLeft, e.pageY - myCanvas.offsetTop, color, 5)
  fireworks.push(firework)
}

star.initialization()

function index() {
  // ctx.clearRect(0, 0, objCanvas.width, objCanvas.height)
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