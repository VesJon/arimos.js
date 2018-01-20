import Phaser from 'phaser'
import globals from './globals'

export default class extends Phaser.State {
  create () {
    this.spacebar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    this.label = this.game.add.text(this.game.width / 2, this.game.height / 2, 'Score: ' + this.game.globals.score + '\nGAME OVER\nPress SPACE to restart', { font: '22px Lucida Console', fill: '#fff', align: 'center' });   
    this.label.anchor.setTo(0.5, 0.5)
  }
  update () {
    this.game.globals.score = 0
    this.game.globals.level = 1
    if (this.spacebar.isDown) this.game.state.start('Game')
  }
}
