<script setup>
import { onMounted, ref } from 'vue'
import { Application, Assets, Sprite } from 'pixi.js'
import Pokemon from '@/sprites/Pokemon'
import { CANVAS_SIZES, CELL_SIZES } from '@/const'

import '@pixi/gif'

const initBackground = async (app) => {
  const backgroundImage = (await import('@/assets/sprites/Road.png'))?.default
  const backgroundTexture = await Assets.load({
    alias: 'background',
    src: backgroundImage,
  })

  const height = CELL_SIZES.height
  const width = CELL_SIZES.width
  const countX = CANVAS_SIZES.width / width
  const countY = CANVAS_SIZES.height / height
  for (let indexY = 0; indexY < countY; indexY++) {
    for (let indexX = 0; indexX < countX; indexX++) {
      const background = new Sprite(backgroundTexture)
      background.width = width
      background.height = height
      background.y = indexY * height
      background.x = indexX * width
      app.stage.addChild(background)
    }
  }
}

const start = async () => {
  const app = new Application()
  await app.init({
    width: CANVAS_SIZES.width,
    height: CANVAS_SIZES.height,
    backgroundColor: '#fff',
  })

  await initBackground(app)

  const arcanine = new Pokemon({
    image: (await import('@/assets/sprites/Arcanine.png'))?.default,
    width: CELL_SIZES.width * 2,
    height: CELL_SIZES.height * 2,
  })
  await arcanine.load()
  app.stage.addChild(arcanine.sprite)
  if (canvasRef.value) {
    canvasRef.value.appendChild(app.canvas)

    const switchFrequency = 4
    let elapsedTime = 0
    app.ticker.add(option => {
      elapsedTime += option.deltaMS / 1000
      const switchInterval = 1 / switchFrequency
      if (elapsedTime >= switchInterval) {
        arcanine.run()
        elapsedTime = 0
      }
    })
  }
}

const canvasRef = ref(null)

onMounted(() => {
  start()
})
</script>

<template>
  <div ref="canvasRef"></div>
</template>

<style lang="less" scoped>
</style>
