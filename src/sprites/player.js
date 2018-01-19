import Phaser from 'phaser'

export default class Player extends Phaser.Sprite {
  constructor ({game, x, y, asset}) {
    super(game, x, y, asset)
    this.game = game
    this.game.physics.enable(this)
    this.body.collideWorldBounds = true
    this.cursors = this.game.input.keyboard.createCursorKeys()
    this.health = 100
  }

  update () {
    switch (true) {
      case this.y < 5:
        this.game.generateEnemies(this.game)
        this.body.position.set(137, 247)
        break
      case this.cursors.down.isDown:
        this.body.velocity.y = 200
        break
      case this.cursors.up.isDown:
        this.body.velocity.y = -200
        break
      case this.cursors.left.isDown:
        this.body.velocity.x = -150
        break
      case this.cursors.right.isDown:
        this.body.velocity.x = 150
        break
      default:
        this.body.velocity.x = 0
        this.body.velocity.y = 0
        break
    }
  }
}
