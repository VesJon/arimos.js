/* globals __DEV__ */
import Phaser from 'phaser'
// import Knight from '../sprites/knight'

export default class extends Phaser.State {
  init () {}
  preload () {}
  create () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE) // has to be called in Game.js ???? whyy tho
    this.map = this.game.add.tilemap('tilemap')
    this.map.addTilesetImage('tiles', 'tiles')
    this.groundLayer = this.map.createLayer('TileLayer')// must match layer name
    this.groundLayer.scale.setTo(this.game.width / (32 * 15), this.game.height / (32 * 10))// resizes tile map to fit
    this.groundLayer.resizeWorld()
    // this.cursors = this.game.input.keyboard.createCursorKeys()
    // this.setupKnight()
    this.p = this.game.add.sprite(32, 32, 'knight')
    this.game.physics.enable(this.p)
    this.p.body.collideWorldBounds = true
    this.cursors = this.game.input.keyboard.createCursorKeys()
  }
  // setupKnight () {
  //   this.knight = new Knight(
  //     this.game,
  //     this.game.world.centerX,
  //     this.game.world.height - 100
  //   )
  //   this.game.add.existing(this.paddle)
  // }
  update () {
    this.game.physics.arcade.collide(this.p, this.groundLayer)
    this.p.body.velocity.x = 0
    this.p.body.velocity.y = 0
    if (this.cursors.down.isDown) {
      this.p.body.velocity.y = 200
    }
    if (this.cursors.up.isDown) {
      this.p.body.velocity.y = -200
    }
    if (this.cursors.left.isDown) {
      this.p.body.velocity.x = -150
    }
    else if (this.cursors.right.isDown)
    {
        this.p.body.velocity.x = 150

    }

}
  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.groundLayer, 32, 32)
    }
  }
}
