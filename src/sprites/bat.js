import Phaser from 'phaser'

export default class Bat extends Phaser.Sprite {
  constructor ({game, x, y, asset}) {
    super(game, x, y, asset)
    this.animations.add('flap', [1, 2, 3], true)
    this.game.physics.enable(this)
    this.body.collideWorldBounds = true
  }

  update () {
    this.animations.play('flap', 4)
  }
}

export const createBats = (game, number) => {
  const bats = []
  for (let i = 0; i < number; i++) {
    bats.push(new Bat({
      game,
      x: random(),
      y: random(),
      asset: 'bat'
    }))
  }
  return bats
}

const random = () => {
  return Math.random() * 250
}
