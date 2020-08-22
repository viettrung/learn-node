const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

var dbLink = ''
if (process.env.ENV === "TEST") {
  dbLink = 'mongodb://mongo:27017/bookAPI_TEST'
} else {
  dbLink = 'mongodb://mongo:27017/bookAPI'
}

const PORT = process.env.PORT || 8080

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const Book = require('./models/bookModel')
const bookRouter = require('./routes/bookRouter')(Book)

mongoose.connect(dbLink, (err) => {
  if (err) {
    console.error('Error occur while connecting DB: ', err);
  } else {
    console.log('DB connection established successfully!')
  }
})

app.use('/api', bookRouter)

app.get('/', (req, res) => {
  res.send(`
    <h1>Docker + Node</h1>
    <span>A match made in the cloud</span>
  `)
})

app.server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`)
})

module.exports = app