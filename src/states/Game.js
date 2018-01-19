/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../sprites/player'
import {createBats} from '../sprites/bat'
import Snake from '../sprites/snake'
import {hitBat, hitSnake} from '../sprites/collisionFuncs'

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
    this.snake = new Snake({
      game: this.game,
      x: 60,
      y: 60,
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
    hitSnake(this.game, this.player, this.snake)
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
    //   this.game.debug.body(this.snake)
    //  this.game.debug.spriteBounds(this.snake)
    //  this.game.debug.spriteBounds(this.player.sword)
    //  this.game.debug.body(this.player.sword)
      // this.batsGroup.children.forEach(bat => this.game.debug.spriteBounds(bat))
    }
  }
  setupText () {
    this.scoreText = this.createText(675, 20, 'left', `Score: ${this.game.globals.score}`)
    this.levelText = this.createText(675, 110, 'center', `Level: ${this.game.globals.level}`)
    this.healthText = this.createText(675, 200, 'right', `Health: 100`)
  }

  createText (x, y, align, text) {
    return this.game.add.bitmapText(x, y, 'nokia', text, 0)
  }
}
