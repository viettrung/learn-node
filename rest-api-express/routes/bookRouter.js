const express = require('express')
const booksController = require('../controlers/booksController')

function routes(Book) {
	const bookRouter = express.Router()
	const controller = booksController(Book)

	bookRouter.route('/books')
		.post(controller.post)
		.get(controller.get)

	bookRouter.use('/books/:bookId', (req, res, next) => {
		Book.findById(req.params.bookId, (err, book) => {
			if (err) {
				return res.send(err)
			}
			if (book) {
				req.book = book
				return next()
			}
			return res.sendStatus(404)
		})
	})

	bookRouter.route('/books/:bookId')
		.get((req, res) => {
			const book = req.book.toJSON()
			book.links = {
				filterByGenrer: `http://${req.headers.host}/api/books?genre=${encodeURI(book.genre)}`
			}
			res.json(book)
		})
		.put((req, res) => {
			const { book } = req // i.e. book = req.book
			book.title = req.body.title
			book.genre = req.body.genre
			book.author = req.body.author
			book.read = req.body.read

			book.save(err => {
				if (err) {
					res.send(err)
				}
				return res.json(book)
			})
		})
		.patch((req, res) => {
			const { book } = req
			const { body } = req

			if (body._id) {
				delete body._id
			}

			Object.entries(body).forEach(item => {
				const key = item[0]
				const value = item[1]
				book[key] = value
			})
			book.save(err => {
				if (err) {
					res.send(err)
				}
				return res.json(book)
			})
		})
		.delete((req, res) => {
			req.book.remove(err => {
				if (err) {
					res.send(err)
				}
				res.sendStatus(204)
			})
		})

	return bookRouter
}


module.exports = routes