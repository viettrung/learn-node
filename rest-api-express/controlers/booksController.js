function bookController(Book) {
    function post(req, res) {
        const book = new Book(req.body)
        book.save()
        return res.status(201).json(book)
    }

    function get(req, res) {
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
    }

    return {post, get}
}

module.exports = bookController