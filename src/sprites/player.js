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
    this.sword = this.game.add.sprite(0, 0, 'sword')
    this.addChild(this.sword)
    if (this.cursors.down.isDown) {
      this.body.velocity.y = 200
      this.sword.anchor.setTo(2, 2.5) // down sword
      this.sword.angle+=180
    }
    if (this.cursors.up.isDown) {
      this.body.velocity.y = -200
      this.sword.anchor.setTo(-2, 0.5) // top sword

    }
    if (this.cursors.left.isDown) {
      this.body.velocity.x = -150
      this.sword.anchor.setTo(3, 0.5) // left sword
      this.sword.angle-=90 // wasd
    } else if (this.cursors.right.isDown) {
      this.body.velocity.x = 150
      this.sword.anchor.setTo(-3, 2) // right sword
      this.sword.angle+=90
    }
  }
}
