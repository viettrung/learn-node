const mongoose = require('mongoose')
const express = require('express')

const app = express()
const bookRouter = express.Router()

const PORT = process.env.PORT || 8080
const db_link = 'mongodb://mongo:27017/bookAPI'

const book = require('./models/bookModel')

mongoose.connect(db_link, (err) => {
  if (err) {
    console.error('Error occur while connecting DB: ', err);
  } else {
    console.log('DB connection established successfully!')
  }
})

bookRouter.route('/books')
  .get((req, res) => {

    const query = {}
    if (req.query.title) {
      query.title = req.query.title
    }

    book.find(query, (err, books) => {
      if (err) {
        return res.send(err)
      }

      return res.send(books)
    })

  })

app.use('/api', bookRouter)

app.get('/', (req, res) => {
  res.send(`
    <h1>Docker + Node</h1>
    <span>A match made in the cloud</span>
  `)
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`)
})
