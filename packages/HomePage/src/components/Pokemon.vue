<script setup>
import { onMounted, ref } from 'vue'
import { Application } from 'pixi.js'
import Pokemon from '@/sprites/Pokemon'

const start = async () => {
  const app = new Application()
  await app.init({
    width: 500,
    height: 200,
    backgroundColor: '#fff',
  })
  const arcanine = new Pokemon({
    image: (await import('@/assets/sprites/Arcanine.png'))?.default,
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
