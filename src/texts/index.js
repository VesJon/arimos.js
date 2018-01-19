export const setupText = (game, state) => {
  state.scoreText = createText(game, 675, 20, `Score: ${game.globals.score}`)
  state.levelText = createText(game, 675, 110, `Level: ${game.globals.level}`)
  state.healthText = createText(game, 675, 200, `Health: 100`)

  game.globals.highScores.sort((a, b) => b.score - a.score)
  state.highScores = game.globals.highScores.forEach((score, index) => {
    if (index === 0) {
      createText(game, 20, 20, 'High Scores')
    }
    createText(game, 20, 20 + ((index + 1) * 90), `${score.player} ${score.score}`)
  })
}

const createText = (game, x, y, text) => {
  return game.add.bitmapText(x, y, 'nokia', text, 0)
}
