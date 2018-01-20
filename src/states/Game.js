/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../sprites/player'
import {createBats} from '../sprites/bat'
import Snake from '../sprites/snake'
import {hitBat, hitSnake} from '../sprites/collisionFuncs'
import {setupText} from '../texts/index'
import {portal} from '../sprites/portals'

export default class extends Phaser.State {
  init () {}
  preload () {}
  create () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE)
    this.map = this.game.add.tilemap('tilemap')
    this.map.addTilesetImage('tiles', 'tiles')
    this.groundLayer = this.map.createLayer('TileLayer')
    this.map.setCollisionBetween(17, 20)
    this.player = new Player({
      game: this.game,
      x: 410,
      y: 175,
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
    this.snake = new Snake({
      game: this.game,
      x: random(256, 574),
      y: random(32, 342),
      asset: 'snake'
    })
    this.game.add.existing(this.snake)
  }
  update () {
    this.game.physics.arcade.collide(this.player, this.groundLayer)
    // snake
    this.game.physics.arcade.collide(this.snake, this.player, () => {
      this.player.damage(5)
      this.healthText.text = `Health: ${this.player.health}`
    }, () => {
      return !this.game.physics.arcade.overlap(this.player.sword, this.snake)
    })
    hitSnake(this.game, this.player, this.snake, this.scoreText)
    // this.game.physics.arcade.collide(this.snake, this.player.sword)
    this.game.physics.arcade.moveToXY(this.snake, this.player.x, this.player.y, 600, 3000)
    // bats
    this.batsGroup.children.forEach(bat => {
      hitBat(this.game, this.player, bat, this.scoreText)
    })
    this.game.physics.arcade.collide(this.player, this.batsGroup.children, () => {
      this.player.damage(1)
      this.healthText.text = `Health: ${this.player.health}`
    }, () => {
      return !this.game.physics.arcade.overlap(this.player.sword, this.batsGroup.children)
    })
    // Portal
    portal(this.game, this.player, this.snake, this.levelText)
    if (this.player.health <= 0) this.game.state.start('GameOver')
  }
  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.player, 200,200)
    //   this.game.debug.body(this.snake)
    //  this.game.debug.spriteBounds(this.snake)
    //  this.game.debug.spriteBounds(this.player.sword)
    //  this.game.debug.body(this.player.sword)
      // this.batsGroup.children.forEach(bat => this.game.debug.spriteBounds(bat))
    }
  }
}

var random = function random(min, max) {
  return Math.random() * (max - min) + min
}
