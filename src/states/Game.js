/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../sprites/player'
import {createBats} from '../sprites/bat'
import {setupText} from '../texts/index'

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
    this.player.body.bounce.set(1)
    // add texts
    setupText(this.game, this)


    this.batsGroup = this.game.add.group()
    this.game.generateEnemies = (game) => {
      this.batsGroup.removeAll(true)
      const bats = createBats(this.game, 3)
      this.batsGroup.addMultiple(bats)
    }
  }
  update () {
    this.game.physics.arcade.collide(this.player, this.groundLayer)
    this.batsGroup.children.forEach(bat => {
      this.game.physics.arcade.overlap(this.player.sword, bat, (sword, bat) => {
        bat.isDying = true
        bat.visible = false
        this.game.globals.score++
        this.scoreText.text = `Score: ${this.game.globals.score}`
        setTimeout(() => {
          bat.visible = true
          setTimeout(() => {
            bat.visible = false
            setTimeout(() => {
              bat.visible = true
              setTimeout(() => {
                bat.visible = false
                setTimeout(() => {
                  bat.kill()
                  this.isKilling = false
                }, 300)
              }, 300)
            }, 300)
          }, 300)
        }, 300)
      }, (sword, bat) => {
        return !bat.isDying
      })
    })
    this.game.physics.arcade.collide(this.player, this.batsGroup.children, () => {
      this.player.damage(1)
      this.healthText.text = `Health: ${this.player.health}`
    }, () => {
      return !this.game.physics.arcade.overlap(this.player.sword, this.batsGroup.children)
    })
    if (this.player.y < 5) {
      this.game.generateEnemies(this.game)
      this.player.body.position.set(137, 247)
      this.game.globals.level++
      this.levelText.text = `Level: ${this.game.globals.level}`
    }
  }
  render () {
    if (__DEV__) {
      //this.game.debug.spriteInfo(this.player, 200,200)
      // this.game.debug.body(this.player.sword)
      // this.game.debug.spriteBounds(this.player)
      // this.batsGroup.children.forEach(bat => this.game.debug.spriteBounds(bat))
    }
  }
}
