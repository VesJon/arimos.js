import Phaser from 'phaser'
// import globals from './globals'

export default class extends Phaser.State {
  create () {
    document.getElementById("1").type = 'text'
    document.getElementById("2").type = 'text'
    document.getElementById("3").type = 'text'
    document.getElementsByClassName('submit-button')[0].style.display = 'inline-block'
    this.spacebar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    this.label = this.game.add.text(this.game.width / 2, this.game.height / 2, 'Score: ' + this.game.globals.score + '\nGAME OVER\nPress SPACE to restart', { font: '22px pixel', fill: '#fff', align: 'center' })
    this.label.anchor.setTo(0.5, 0.5)
  }
  update () {
    this.game.globals.score = 0
    this.game.globals.level = 1
    if (this.spacebar.isDown) {
      document.getElementById("1").type = 'hidden'
      document.getElementById("2").type = 'hidden'
      document.getElementById("3").type = 'hidden'
      document.getElementsByClassName('submit-button')[0].style.display = 'none'
      this.game.state.start('Game')
    }
  }
}
