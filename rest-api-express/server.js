const express = require('express')

const app = express()
const bookRouter = express.Router()
const PORT = process.env.PORT || 8080

bookRouter.route('/books')
  .get((req, res) => {
    const response = {hello: 'This is my API'}
    res.json(response)
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
