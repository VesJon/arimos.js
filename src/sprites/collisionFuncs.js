
export const hitBat = (game, player, bat, scoreText) => {
  game.physics.arcade.overlap(player.sword, bat, (sword, bat) => {
    bat.isDying = true
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

export const hitSnake = (game, player, snake) => {
  game.physics.arcade.collide(player.sword, snake, (sword, snake) => {
    if (snake.health < 0) {
      snake.kill()
    }
    snake.health = snake.health - 3
    console.log(snake.health)
  })
}
