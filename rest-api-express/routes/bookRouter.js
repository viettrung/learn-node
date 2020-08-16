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
		.get((req, res) => res.json(req.book))
		.put((req, res) => {
			const { book } = req
			book.title = req.body.title
			book.genre = req.book.genre
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
			const {book} = req
			const {body} = req

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

	return bookRouter
}


module.exports = routes