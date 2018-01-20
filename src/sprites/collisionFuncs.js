
export const hitBat = (game, player, bat, scoreText, fx) => {
  game.physics.arcade.overlap(player.sword, bat, (sword, bat) => {
    bat.isDying = true
    fx.play('squit')
    bat.visible = false
    game.globals.score++
    scoreText.text = `Score: ${game.globals.score}`
    setTimeout(() => {
      bat.visible = true
      setTimeout(() => {
        bat.visible = false
        setTimeout(() => {
          bat.visible = true
          setTimeout(() => {
            bat.visible = false
            setTimeout(() => {
              bat.kill()
            }, 300)
          }, 300)
        }, 300)
      }, 300)
    }, 300)
  }, (sword, bat) => {
    return !bat.isDying
  })
}

export const hitSnake = (game, player, snake, fx) => {
  game.physics.arcade.collide(player.sword, snake, (sword, snake) => {
    if (snake.health < 0) {
      snake.kill()
    }
    fx.play('shot')
    snake.health = snake.health - 3
  })
}
