export const createSoundEffects = (state, game) => {
  state.fx = game.add.audio('sfx')
  state.fx.allowMultiple = true
  state.fx.addMarker('alien death', 1, 1.0)
  state.fx.addMarker('boss hit', 3, 0.5)
  state.fx.addMarker('escape', 4, 3.2)
  state.fx.addMarker('meow', 8, 0.5)
  state.fx.addMarker('numkey', 9, 0.1)
  state.fx.addMarker('ping', 10, 1.0)
  state.fx.addMarker('death', 12, 4.2)
  state.fx.addMarker('shot', 17, 1.0)
  state.fx.addMarker('squit', 19, 0.3)
}
