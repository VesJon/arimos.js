import 'pixi'
import 'p2'
import Phaser from 'phaser'

import BootState from './states/Boot'
import SplashState from './states/Splash'
import GameState, {formData} from './states/Game'
import GameOver from './states/GameOver'
import axios from 'axios'

import config from './config'

class Game extends Phaser.Game {
  constructor () {
    const docElement = document.documentElement
    const width = docElement.clientWidth > config.gameWidth ? config.gameWidth : docElement.clientWidth
    const height = docElement.clientHeight > config.gameHeight ? config.gameHeight : docElement.clientHeight

    super(width, height, Phaser.CANVAS, 'content', null)

    this.state.add('Boot', BootState, false)
    this.state.add('Splash', SplashState, false)
    this.state.add('Game', GameState, false)
    this.state.add('GameOver', GameOver, false)

    // with Cordova with need to wait that the device is ready so we will call the Boot state in another file
    if (!window.cordova) {
      this.state.start('Boot')
    }
  }
}
window.game = new Game()

const form = document.getElementsByClassName('initialInput')[0]
form.onsubmit = (event) => {
  event.preventDefault()
  const first = document.getElementById("1")
  const second = document.getElementById("2")
  const third = document.getElementById("3")
  const initials = first.value + second.value + third.value
  axios.post('/scores', {
    secret: formData.secret,
    score: formData.score,
    initials
  })
    .then(() => {
      window.game.state.start('Game')
      document.getElementById("1").type = 'hidden'
      document.getElementById("2").type = 'hidden'
      document.getElementById("3").type = 'hidden'
      document.getElementsByClassName('submit-button')[0].style.display = 'none'
    })
    .catch(console.error)
}

if (window.cordova) {
  var app = {
    initialize: function () {
      document.addEventListener(
        'deviceready',
        this.onDeviceReady.bind(this),
        false
      )
    },

    // deviceready Event Handler
    //
    onDeviceReady: function () {
      this.receivedEvent('deviceready')

      // When the device is ready, start Phaser Boot state.
      window.game.state.start('Boot')
    },

    receivedEvent: function (id) {
    }
  }

  app.initialize()
}
