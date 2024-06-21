import { Assets, Sprite, Rectangle, Texture } from 'pixi.js'

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

export default class Pokemon {
  image = null
  sprite = null
  texture = null

  width = 64
  height = 64

  x = 0
  y = 0

  animationIndex = 0
  directionIndex = Direction.Bottom

  textureCache = new Map()

  executor = null

  constructor(option) {
    this.image = option.image
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
        this.animationIndex * this.width,
        this.directionIndex * this.height,
        this.width,
        this.height,
      ),
    })
    this.textureCache.set(key, texture)
    return texture
  }

  async load() {
    this.sprite = new Sprite()
    this.sprite.x = this.x
    this.sprite.y = this.y
    this.texture = await Assets.load(this.image)
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
        if (this.directionIndex === Direction.Top) {
          this.sprite.y -= this.height / 16
        } else if (this.directionIndex === Direction.Bottom) {
          this.sprite.y += this.height / 16
        } else if (this.directionIndex === Direction.Left) {
          this.sprite.x -= this.width / 16
        } else {
          this.sprite.x += this.width / 16
        }
      }
      if (presetIndex >= preset.length - 1) {
        presetIndex = 0
      } else {
        presetIndex += 1
      }
    }
  }

  changeAction(action) {
    this.executor = this.getPresetExecutor(action)
  }

  run() {
    this.executor()
  }
}
