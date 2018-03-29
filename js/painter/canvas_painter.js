//画布1
let canvas = document.getElementById('Canvas')
let ctx = canvas.getContext('2d')

//画布2
let canvas_over = document.getElementById('Canvasover')
let ctx_over = canvas_over.getContext('2d')

//画布配置
let width = 900
let height = 500
canvas.width = width
canvas.height = height
canvas_over.width = width
canvas_over.height = height

//工具定义
let pen = {
  point: 1,
  color: '#030303'
}
let eraser = {
  point: 1
}

let tool = 0 //0: 初始状态 1: pen 2: eraser
let down = false
let img_pen = new Image()
let img_eraser = new Image()
img_pen.src = '../image/painter/pen.png'
img_eraser.src = '../image/painter/eraser.png'

let wrap = document.getElementsByClassName('wrap')[0]
let header = document.getElementById('header')
let clear = document.getElementById('clear')
let save = document.getElementById('save')
let tool_pen = document.getElementById('pen')
let tool_eraser = document.getElementById('eraser')
let x1 = document.getElementById('1x')
let x2 = document.getElementById('2x')
let x4 = document.getElementById('4x')
let x6 = document.getElementById('6x')
let red = document.getElementById('red')
let orange = document.getElementById('orange')
let yellow = document.getElementById('yellow')
let green = document.getElementById('green')
let cyan = document.getElementById('cyan')
let blue = document.getElementById('blue')
let purple = document.getElementById('purple')

//事件集合
clear.onclick = () => {
  ctx.clearRect(0, 0, width, height)
}
save.onclick = () => {
  alert('请右键画布并选择\'图片另存为\'')
}

tool_pen.onclick = () => {
  tool = 1
  header.className = 'fa fa-pencil fa-2x'
  canvas.style.cursor = 'none'
}
tool_eraser.onclick = () => {
  tool = 2
  header.className = 'fa fa-eraser fa-2x'
  canvas.style.cursor = 'none'
}

x1.onclick = () => {
  switch (tool) {
    case 0:
      alert('未选中工具')
      break
    case 1:
      pen.point = 1
      break
    case 2:
      eraser.point = 1
      break
  }
}
x2.onclick = () => {
  switch (tool) {
    case 0:
      alert('未选中工具')
      break
    case 1:
      pen.point = 2
      break
    case 2:
      eraser.point = 2
      break
  }
}
x4.onclick = () => {
  switch (tool) {
    case 0:
      alert('未选中工具')
      break
    case 1:
      pen.point = 4
      break
    case 2:
      eraser.point = 4
      break
  }
}
x6.onclick = () => {
  switch (tool) {
    case 0:
      alert('未选中工具')
      break
    case 1:
      pen.point = 6
      break
    case 2:
      eraser.point = 6
      break
  }
}

red.onclick = () => {
  switch (tool) {
    case 0:
      alert('未选中钢笔工具')
      break
    case 1:
      pen.color = 'red'
      break
    case 2:
      alert('橡皮擦不能选中颜色')
      break
  }
}
orange.onclick = () => {
  switch (tool) {
    case 0:
      alert('未选中钢笔工具')
      break
    case 1:
      pen.color = 'orange'
      break
    case 2:
      alert('橡皮擦不能选中颜色')
      break
  }
}
yellow.onclick = () => {
  switch (tool) {
    case 0:
      alert('未选中钢笔工具')
      break
    case 1:
      pen.color = 'yellow'
      break
    case 2:
      alert('橡皮擦不能选中颜色')
      break
  }
}
green.onclick = () => {
  switch (tool) {
    case 0:
      alert('未选中钢笔工具')
      break
    case 1:
      pen.color = 'green'
      break
    case 2:
      alert('橡皮擦不能选中颜色')
      break
  }
}
cyan.onclick = () => {
  switch (tool) {
    case 0:
      alert('未选中钢笔工具')
      break
    case 1:
      pen.color = 'cyan'
      break
    case 2:
      alert('橡皮擦不能选中颜色')
      break
  }
}
blue.onclick = () => {
  switch (tool) {
    case 0:
      alert('未选中钢笔工具')
      break
    case 1:
      pen.color = 'blue'
      break
    case 2:
      alert('橡皮擦不能选中颜色')
      break
  }
}
purple.onclick = () => {
  switch (tool) {
    case 0:
      alert('未选中钢笔工具')
      break
    case 1:
      pen.color = 'purple'
      break
    case 2:
      alert('橡皮擦不能选中颜色')
      break
  }
}

canvas.onmousemove = (e) => {
  switch (tool) {
    case 0:
      break
    case 1:
      (() => {
        ctx_over.clearRect(0, 0, width, height)
        ctx_over.drawImage(img_pen, e.clientX - canvas_over.offsetLeft, e.clientY - canvas_over.offsetTop, 30, 30)
      })()
      break
    case 2:
      (() => {
        ctx_over.clearRect(0, 0, width, height)
        ctx_over.drawImage(img_eraser, e.clientX - canvas_over.offsetLeft, e.clientY - canvas_over.offsetTop, 30, 30)
      })()
      break
  }
}

canvas.onmousedown = () => {
  down = true
  ctx.beginPath()
  canvas.onmousemove = (e) => {
    if (down) {
      switch (tool) {
        case 0:
          break
        case 1:
          (() => {
            ctx_over.clearRect(0, 0, width, height)
            ctx_over.drawImage(img_pen, e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop, 30, 30)
            ctx.strokeStyle = pen.color
            ctx.lineWidth = pen.point
            ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop)
            ctx.stroke()
          })()
          break
        case 2:
          (() => {
            ctx_over.clearRect(0, 0, width, height)
            ctx_over.drawImage(img_eraser, e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop, 30, 30)
            ctx.clearRect(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop, eraser.point * 4, eraser.point * 4)
          })()
          break
      }
    } else {
      switch (tool) {
        case 0: 
          break
        case 1:
          (() => {
            ctx_over.clearRect(0, 0, width, height)
            ctx_over.drawImage(img_pen, e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop, 30, 30)
          })()
          break
        case 2:
          (() => {
            ctx_over.clearRect(0, 0, width, height)
            ctx_over.drawImage(img_eraser, e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop, 30, 30)
          })()
          break
      }
      return false
    }
  }
}

document.body.onmouseup = () => {
  if (down) {
    down = false
    ctx.closePath()
  }
}