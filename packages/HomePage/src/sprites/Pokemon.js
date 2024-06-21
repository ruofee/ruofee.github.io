import { Assets, Sprite, Rectangle, Texture } from 'pixi.js'

export default class Pokemon {
  image = null
  sprite = null
  texture = null

  width = 64
  height = 64

  animationIndex = 0
  directionIndex = 0

  constructor(option) {
    this.image = option.image
  }

  async load() {
    this.texture = await Assets.load(this.image)
    this.sprite = new Sprite()
  }

  render() {
    const croppedTexture = new Texture({
      source: this.texture,
      frame: new Rectangle(this.animationIndex * this.width, this.directionIndex * this.height, this.width, this.height),
    })
    this.sprite.texture = croppedTexture
  }

  run() {
    this.render()
    if (this.animationIndex < 3) {
      this.animationIndex += 1
    } else {
      this.animationIndex = 0
      this.directionIndex += 1
    }
    if (this.directionIndex > 3) {
      this.directionIndex = 0
      this.animationIndex = 0
    }
  }
}
