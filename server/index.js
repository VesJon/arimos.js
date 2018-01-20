if (!process.env.SECRET) {
  const SECRET = require('../secrets')
  process.env.SECRET = SECRET
}
const express = require('express')
const app = express()
const path = require('path')
const db = require('./db')
const Scores = require('./db/scores')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, '..', 'www')))

app.get('/scores', (req, res, next) => {
  Scores.findAll()
    .then(scores => res.send(scores))
})

app.post('/scores', (req, res, next) => {
  if (!req.body || !req.body.secret || !req.body.initials || !req.body.score) {
    res.sendStatus(403)
  } else if (req.body.secret === process.env.SECRET) {
    Scores.create({
      initials: req.body.initials,
      score: req.body.score
    }).then(score => res.sendStatus(200))
  } else {
    res.sendStatus(403)
  }
})

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'www/index.html'))
})

db.sync()
  .then(app.listen(3000, () => console.log('Listening on 3000')))
