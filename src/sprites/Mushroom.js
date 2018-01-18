import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.anchor.setTo(0.5)
    this.game = game
    this.inputEnabled = true
  }

  update () {
    const cursors = this.game.input.keyboard.createCursorKeys()
    this.body.velocity.x = 0

    if (cursors.left.isDown) {
      //  Move to the left
      this.body.velocity.x = -150
    } else if (cursors.right.isDown) {
      //  Move to the right
      this.body.velocity.x = 150
    } else if (cursors.up.isDown) {
      this.body.velocity.y = -150
    } else if (cursors.down.isDown) {
      this.body.velocity.y = 150
    } else {
      this.body.stop()
    }
  }
}
