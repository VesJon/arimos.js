/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../sprites/player'
import {createBats} from '../sprites/bat'

export default class extends Phaser.State {
  init () {}
  preload () {}
  create () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE) // has to be called in Game.js ???? whyy tho
    this.map = this.game.add.tilemap('tilemap')
    this.map.addTilesetImage('tiles', 'tiles')
    this.groundLayer = this.map.createLayer('TileLayer')// must match layer name
    this.map.setCollisionBetween(17, 20)
    this.player = new Player({
      game: this.game,
      x: 200,
      y: 200,
      asset: 'knight'
    })
    this.game.add.existing(this.player)
    this.setupText()
    this.player.body.bounce.set(1)

    this.batsGroup = this.game.add.group()
    this.game.generateEnemies = (game) => {
      this.batsGroup.removeAll(true)
      const bats = createBats(this.game, 3)
      this.batsGroup.addMultiple(bats)
    }
  }
  update () {
    this.game.physics.arcade.collide(this.player, this.groundLayer)
    this.game.physics.arcade.collide(this.player, this.batsGroup, () => this.player.damage(1))
    this.bats = createBats(this.game, 3)
    this.bats.forEach(bat => this.game.add.existing(bat))
    this.game.physics.arcade.collide(this.player.sword, this.bats)
  }
  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.player, 200,200)
      //this.game.debug.spriteInfo(this.player.sword, 128,128)
    }
  }

  setupText () {
    this.scoreText = this.createText(100, 20, 'left', `Score: ${this.game.globals.score}`)
    this.level = this.createText(200, 20, 'center', `Level: ${this.game.globals.level}`)
    this.health = this.createText(0, 20, 'right', `Health: ${this.player.health}`)
  }

  createText (x, y, align, text) {
    return this.game.add.bitmapText(x, y, 'nokia', text, 0)
  }
}
