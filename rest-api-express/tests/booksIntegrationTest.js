require('should')

const request = require('supertest')
const mongoose = require('mongoose')

process.env = {
  ENV: "TEST",
  PORT: 8080
}

const app = require('../server.js')

const Book = mongoose.model('Book')
const agent = request.agent(app)

describe('Book CRUD test', () => {
  it('should allow a book to be posted and return read and _id', (done) => {
    const bookReq = {
      title: "My book",
      author: "John",
      genre: "Fiction"
    }

    agent.post('/api/books')
    .send(bookReq)
    .expect(200)
    .end((err, result) => {
      console.log(result.body)

      result.body.read.should.not.equal('false')
      result.body.should.have.property('_id')
      done()
    })

    afterEach((done) => {
      Book.deleteMany({}).exec()
      done()
    })

    after((done) => {
      mongoose.connection.close()
      app.server.close(done())
    })

  })
})