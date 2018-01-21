export const portal = (game, player, snake, levelText, stepsSound) => {
  playStepsSound(stepsSound)
  if (player.y < 5) {
    game.generateEnemies(game)
    player.body.position.set(414, 342)
    game.globals.level++
    snake.revive()
    levelText.text = `Level: ${game.globals.level}`
  }
  if (player.x < 218 && (player.y > 170 || player.y < 182)) {
    game.generateEnemies(game)
    player.body.position.set(562, 170)
    game.globals.level++
    snake.revive()
    levelText.text = 'Level: ' + game.globals.level
  }
  if (player.x > 604 && (player.y > 170 || player.y < 182)) {
    game.generateEnemies(game)
    player.body.position.set(256, 170)
    game.globals.level++
    snake.revive()
    levelText.text = 'Level: ' + game.globals.level
  }
  if (player.y > 360) {
    game.generateEnemies(game)
    player.body.position.set(423, 32)
    game.globals.level++
    snake.revive()
    levelText.text = 'Level: ' + game.globals.level
  }
}

const playStepsSound = (stepsSound) => {
  stepsSound.play()
  setTimeout(() => {
    stepsSound.play()
    setTimeout(() => {
      stepsSound.play()
      setTimeout(() => {
        stepsSound.play()
      }, 300)
    }, 300)
  }, 300)
}
