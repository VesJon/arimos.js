import Phaser from 'phaser'
import globals from './globals'
// import WebFont from 'webfontloader'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#EDEEC9'
  }

  preload () {
    this.load.tilemap('tilemap', 'assets/tiles/tileMap.json', null, Phaser.Tilemap.TILED_JSON)
    this.load.image('tiles', 'assets/tiles/tiles.png')
    this.load.image('knight', 'assets/images/knight17x21.png')
    this.load.spritesheet('bat', 'assets/images/32x32-bat-sprite_4.png', 32, 32)
    this.load.image('sword', 'assets/images/sword9x25.png')
    this.load.bitmapFont('nokia', 'assets/nokia16black.png', 'assets/nokia16black.xml')
  }
  create () {
    this.game.globals = Object.assign({}, globals)
  }

  render () {
    this.state.start('Splash')
  }
}
