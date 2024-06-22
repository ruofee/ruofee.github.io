import { Assets, Sprite, Rectangle, Texture } from 'pixi.js'
import random from 'lodash.random'
import { CANVAS_SIZES } from '@/const'

export const Action = {
  Stay: 'stay',
  Move: 'move',
}

export const Direction = {
  Bottom: 0,
  Left: 1,
  Right: 2,
  Top: 3,
}

const presets = {
  [Action.Stay]: [0, 1],
  [Action.Move]: [0, 1, 2, 3],
}

const image = {
  width: 64,
  height: 64,
}

export default class Pokemon {
  image = null
  sprite = null
  texture = null

  width = 0
  height = 0

  x = 0
  y = 0

  animationIndex = 0
  directionIndex = Direction.Bottom

  textureCache = new Map()

  executor = null

  constructor(option) {
    this.image = option.image
    this.width = option.width
    this.height = option.height
    this.changeAction(Action.Move)
  }

  get currentTexture() {
    const key = `${this.directionIndex}-${this.animationIndex}`
    const cache = this.textureCache.get(key)
    if (cache) {
      return cache
    }
    const texture = new Texture({
      source: this.texture,
      frame: new Rectangle(
        this.animationIndex * image.width,
        this.directionIndex * image.height,
        image.width,
        image.height,
      ),
    })
    this.textureCache.set(key, texture)
    return texture
  }

  async load() {
    if (this.sprite) {
      return
    }
    this.texture = await Assets.load(this.image)
    this.sprite = new Sprite()
    this.sprite.x = this.x
    this.sprite.y = this.y
    this.sprite.width = this.width
    this.sprite.height = this.height
    this.sprite.interactive = true
    this.sprite.buttonMode = true
    this.sprite.on('click', () => {
      this.randomRun()
    })
  }

  renderTexture() {
    this.sprite.texture = this.currentTexture
  }

  getPresetExecutor(action) {
    const preset = presets[action]
    let presetIndex = 0
    return () => {
      this.animationIndex = preset[presetIndex]
      this.renderTexture()
      if (action === Action.Move) {
        let y = this.sprite.y
        let x = this.sprite.x
        if (this.directionIndex === Direction.Top) {
          y -= this.height / 8
        } else if (this.directionIndex === Direction.Bottom) {
          y += this.height / 8
        } else if (this.directionIndex === Direction.Left) {
          x -= this.width / 8
        } else {
          x += this.width / 8
        }
        if (x > CANVAS_SIZES.width - this.width || x < 0 || y < 0 || y > CANVAS_SIZES.height - this.height) {
          this.randomRun()
        } else {
          this.sprite.x = x
          this.sprite.y = y
        }
      }
      if (presetIndex >= preset.length - 1) {
        presetIndex = 0
      } else {
        presetIndex += 1
      }
    }
  }

  changeDirection() {
    let _preset = [...presets[Action.Move]]
    if (this.sprite.x === 0) {
      _preset.splice(_preset.findIndex(direction => direction === Direction.Left), 1)
    } else if (this.sprite.x === CANVAS_SIZES.width - this.width) {
      _preset.splice(_preset.findIndex(direction => direction === Direction.Right), 1)
    }
    if (this.sprite.y === 0) {
      _preset.splice(_preset.findIndex(direction => direction === Direction.Top), 1)
    } else if (this.sprite.y === CANVAS_SIZES.height - this.height) {
      _preset.splice(_preset.findIndex(direction => direction === Direction.Bottom), 1)
    }
    _preset = _preset.filter(direction => direction !== this.directionIndex)
    const index = _preset.length - 1 < 0 ? 0 : random(0, _preset.length - 1)
    this.directionIndex = _preset[index]
  }

  changeAction(action) {
    this.executor = this.getPresetExecutor(action)
  }

  randomRun() {
    const index = random(0, 1)
    this.changeDirection()
    if (index === 0) {
      this.changeAction(Action.Stay)
    } else {
      this.changeAction(Action.Move)
    }
  }

  run() {
    this.executor()
  }
}
