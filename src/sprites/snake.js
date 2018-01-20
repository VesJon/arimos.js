import Phaser from 'phaser'

export default class Snake extends Phaser.Sprite {
  constructor ({game, x, y, asset}) {
    super(game, x, y, asset)
    this.animations.add('down', [0, 1, 2, 3], true)
    this.animations.add('left', [4, 5, 6, 7], true)
    this.animations.add('right', [8, 9, 10, 11], true)
    this.animations.add('up', [12, 13, 14, 15], true)
    this.game.physics.enable(this)
    this.body.collideWorldBounds = true
    this.health = 100
    this.body.immovable = true
  }

  update () {
    switch (true) {
      case this.previousPosition.y > this.y:
        this.animations.play('up', 4)
        break
      case this.previousPosition.x < this.x:
        this.animations.play('right', 4)
        break
      case this.previousPosition.y < this.y:
        this.animations.play('down', 4)
        break
      case this.previousPosition.x > this.x:
        this.animations.play('left', 4)
        break
      default:
        this.animations.play('down', 4)
    }
  }
}
