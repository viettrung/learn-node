const express = require('express')

function routes(Book) {
	const bookRouter = express.Router()

	bookRouter.route('/books')
		.post((req, res) => {
			const book = new Book(req.body)
			book.save()
			return res.status(201).json(book)
		})
		.get((req, res) => {
			const query = {}
			if (req.query.title) {
				query.title = req.query.title
			}

			Book.find(query, (err, books) => {
				if (err) {
					return res.send(err)
				}

				return res.send(books)
			})

		})

	bookRouter.route('/books/:bookId')
		.get((req, res) => {
			Book.findById(req.params.bookId, (err, book) => {
				if (err) {
					return res.send(err)
				}
				return res.send(book)
			})
		})
		.put((req, res) => {
			Book.findById(req.params.bookId, (err, book) => {
				if (err) {
					return res.send(err)
				}

				book.title = req.body.title
				book.genre = req.body.genre
				book.author = req.body.author
				book.read = req.body.read
				book.save()
				return res.send(book)
			})
		})

		return bookRouter
}


module.exports = routes