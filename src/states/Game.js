/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../sprites/player'
import {createBats} from '../sprites/bat'
import Snake from '../sprites/snake'
import {hitBat, hitSnake} from '../sprites/collisionFuncs'
import {setupText} from '../texts/index'
import {createSoundEffects} from '../sprites/audio'
import axios from 'axios'
import {portal} from '../sprites/portals'

export default class extends Phaser.State {
  init () {}
  preload () {}
  create () {
    // setup fx
    createSoundEffects(this, this.game)
    // setup world
    this.game.physics.startSystem(Phaser.Physics.ARCADE)
    this.map = this.game.add.tilemap('tilemap')
    this.map.addTilesetImage('tiles', 'tiles')
    this.groundLayer = this.map.createLayer('TileLayer')
    this.map.setCollisionBetween(17, 20)
    // setup player
    this.player = new Player({
      game: this.game,
      x: 410,
      y: 175,
      asset: 'knight'
    })
    this.game.add.existing(this.player)
    this.player.body.bounce.set(1)
    this.player.events.onKilled.add(() => {
      this.fx.play('death')
      this.player.sword.destroy()
      console.log(this.game.globals.score)
      const data = {
        secret: '34iadf0ivdsf9043uut480qsdkffmvi40ru0w9ef',
        initials: 'JAR',
        score: this.game.globals.score
      }
      axios.post('/scores', data)
        .then(res => console.log(res.body))
      // game over splash screen
    })

    // add texts
    setupText(this.game, this)
    // add enemies
    this.batsGroup = this.game.add.group()
    this.game.generateEnemies = (game) => {
      this.batsGroup.removeAll(true)
      const bats = createBats(this.game, 3 + this.game.globals.level)
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
      this.player.damage(3)
      this.fx.play('meow')
      this.healthText.text = `Health: ${this.player.health}`
    }, () => {
      return !this.game.physics.arcade.overlap(this.player.sword, this.snake)
    })

    hitSnake(this.game, this.player, this.snake, this.scoreText, this.fx)

    // this.game.physics.arcade.collide(this.snake, this.player.sword)
    this.game.physics.arcade.moveToXY(this.snake, this.player.x, this.player.y, 600, 3000)
    // bats
    this.batsGroup.children.forEach(bat => {
      hitBat(this.game, this.player, bat, this.scoreText, this.fx)
    })
    this.game.physics.arcade.collide(this.player, this.batsGroup.children, () => {
      this.player.damage(1)
      this.fx.play('meow')
      this.healthText.text = `Health: ${this.player.health}`
    }, () => {
      return !this.game.physics.arcade.overlap(this.player.sword, this.batsGroup.children)
    })

    if (this.player.y < 5) {
      this.fx_steps.play()
      setTimeout(() => {
        this.fx_steps.play()
        setTimeout(() => {
          this.fx_steps.play()
          setTimeout(() => {
            this.fx_steps.play()
          }, 300)
        }, 300)
      }, 300)
      this.game.generateEnemies(this.game)
      this.player.body.position.set(137, 247)
      this.game.globals.level++
      this.levelText.text = `Level: ${this.game.globals.level}`
    }
    // Portal
    portal(this.game, this.player, this.snake, this.levelText)
    if (this.player.health <= 0) this.game.state.start('GameOver')
  }

  render () {
    if (__DEV__) {
    }
  }
}

var random = function random(min, max) {
  return Math.random() * (max - min) + min
}
