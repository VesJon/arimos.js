import Phaser from 'phaser'

export class Snake extends Phaser.sprite() {
  constructor ({game, x, y, asset}) {
    super(game, x, y, asset)
    this.animations.add('slither', [9, 10, 11], true)
    this.game.physics.enable(this)
    this.body.collideWorldBounds = true
    this.body.immovable = true
  }

  update () {
    this.animations.play('move', 4)
    this.body.velocity.x += 100
    this.body.velocity.y += 50
  }
}
