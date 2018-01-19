import Phaser from 'phaser'

export default class Bat extends Phaser.Sprite {
  constructor ({game, x, y, asset}) {
    super(game, x, y, asset)
    this.animations.add('flap', [1, 2, 3], true)
    this.game.physics.enable(this)
    this.body.collideWorldBounds = true
    this.body.immovable = true
  }

  update () {
    this.animations.play('flap', 4)
    this.body.velocity.x = random(100) * randomSign()
    this.body.velocity.y = random(100) * randomSign()
  }
}

export const createBats = (game, number) => {
  const bats = []
  for (let i = 0; i < number; i++) {
    bats.push(new Bat({
      game,
      x: random(230, 640),
      y: random(32, 448),
      asset: 'bat'
    }))
  }
  return bats
}

const random = (min, max) => {
  return Math.random() * (max - min) + min
}

const randomSign = () => {
  let sign = Math.random()
  if (sign > 0.5) return 1
  else return -1
}
