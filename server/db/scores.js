const Sequelize = require('sequelize')
const db = require('./index')

const Scores = db.define('scores', {
  initials: {
    type: Sequelize.STRING,
    defaultValue: 'AAA',
    validate: {
      len: [3]
    }
  },
  score: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  }
})

module.exports = Scores
