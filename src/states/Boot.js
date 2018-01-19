import Phaser from 'phaser'
// import WebFont from 'webfontloader'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#EDEEC9'
    // this.fontsReady = false
    // this.fontsLoaded = this.fontsLoaded.bind(this)
  }

  preload () {
    // WebFont.load({
    //   google: {
    //     families: ['Bangers']
    //   },
    //   active: this.fontsLoaded
    // })

    // let text = this.add.text(this.world.centerX, this.world.centerY, 'loading fonts', { font: '16px Arial', fill: '#dddddd', align: 'center' })
    // text.anchor.setTo(0.5, 0.5)

    // this.load.image('loaderBg', './assets/images/loader-bg.png')
    // this.load.image('loaderBar', './assets/images/loader-bar.png')
    this.load.tilemap('tilemap', 'assets/tiles/tileMap.json', null, Phaser.Tilemap.TILED_JSON)
    this.load.image('tiles', 'assets/tiles/tiles.png')
    // this.load.tilemap('tilemap', 'assets/tiles/tileMap2.json', null, Phaser.Tilemap.TILED_JSON)
    // this.load.image('tiles', 'assets/tiles/tileMap2.png')
    this.load.image('knight', 'assets/images/knight17x21.png')
    this.load.spritesheet('bat', 'assets/images/32x32-bat-sprite_4.png', 32, 32)
    this.load.image('sword', 'assets/images/sword9x25.png')
  }

  render () {
    this.state.start('Splash')
  }

  fontsLoaded () {
    this.fontsReady = true
  }
}
