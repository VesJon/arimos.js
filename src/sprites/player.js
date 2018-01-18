import Phaser from 'phaser'

export default class Player extends Phaser.Sprite {
  constructor ({game, x, y, asset}) {
    super(game, x, y, asset)
    this.game = game
    this.game.physics.enable(this)
    this.body.collideWorldBounds = true
    this.cursors = this.game.input.keyboard.createCursorKeys()
  }

  update () {
    this.body.velocity.x = 0
    this.body.velocity.y = 0
    if (this.cursors.down.isDown) {
      this.body.velocity.y = 200
    }
    if (this.cursors.up.isDown) {
      this.body.velocity.y = -200
    }
    if (this.cursors.left.isDown) {
      this.body.velocity.x = -150
    } else if (this.cursors.right.isDown) {
      this.body.velocity.x = 150
    }
  }
}
