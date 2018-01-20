
export const hitBat = (game, player, enemy, scoreText, fx) => {
  game.physics.arcade.overlap(player.sword, enemy, (sword, enemy) => {
    enemy.isDying = true
    fx.play('squit')
    enemy.visible = false
    game.globals.score++
    scoreText.text = `Score: ${game.globals.score}`
    setTimeout(() => {
      enemy.visible = true
      setTimeout(() => {
        enemy.visible = false
        setTimeout(() => {
          enemy.visible = true
          setTimeout(() => {
            enemy.visible = false
            setTimeout(() => {
              enemy.kill()
            }, 300)
          }, 300)
        }, 300)
      }, 300)
    }, 300)
  }, (sword, enemy) => {
    return !enemy.isDying
  })
}

export const hitSnake = (game, player, snake, scoreText, fx) => {
  game.physics.arcade.collide(player.sword, snake, (sword, snake) => {
    if (snake.health < 0) {
      snake.isDying = true
      fx.play('squit')
      snake.visible = false
      game.globals.score++
      scoreText.text = `Score: ${game.globals.score}`
      setTimeout(() => {
        snake.visible = true
        setTimeout(() => {
          snake.visible = false
          setTimeout(() => {
            snake.visible = true
            setTimeout(() => {
              snake.visible = false
              setTimeout(() => {
                snake.kill()
              }, 300)
            }, 300)
          }, 300)
        }, 300)
      }, 300)
    } else {
      fx.play('boss hit')
      snake.health = snake.health - 3
    }
  }, (sword, snake) => {
    return !snake.isDying
  })
}
