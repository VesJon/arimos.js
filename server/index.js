const express = require('express')
const app = express()
const path = require('path')

app.use(express.static(path.join(__dirname, '..', 'www')))

app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'www/index.html'))
})

app.listen(3000)
