## Welcome to Ruofee's GitHub Pages

| 标题          |                                          |                                          |
| ----------- | ---------------------------------------- | ---------------------------------------- |
| canvas_像素小鸟 | [演示](https://ruofee.github.io/example/flappy_bird.html) | [查看代码](https://github.com/ruofee/canvas_flappy_bird) |
| canvas_画板   | [演示](https://ruofee.github.io/example/canvas_painter.html) | [查看代码](https://github.com/ruofee/canvas_painter) |
| cavnas_烟花   | [演示](https://ruofee.github.io/example/canvas_firework.html) | [查看代码](https://github.com/ruofee/canvas_firework) |



待解的小问题:

- 之前没接触移动端, 这次试着在移动端打开烟花演示网页,

  先是在chrome中使用移动端调试查看了, 显示正常

  之后分别使用iphone6的safari, 微信端, UC打开演示网页, canvas完全显示不出来, 经过调试之后发现只要把canvas标签原来的id(myCanvas)换成mycanvas, my_Canvas, my_canvas, 然后js中节点查找id就显示正常, 完全不知道这算哪门子问题啊...js中节点查找class, 只要命名规范则显示正常