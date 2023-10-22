const Book = require('../models/book')

// Create and save a new book
exports.create = (req, res) => {
  const Books = req.body // on récupère le body de la requête

  const book = new Book({
    title: Books.title,
    author: Books.author,
    type: Books.type
  })
  book.save() // sauvegarde le book dans la base de données
    .then(data => {
      res.send(data)
    }).catch(err => {
      res.status(500).send({
        message: err.message
      })
    })
}

// Retrieve and return all books from the database.
exports.findAll = (req, res) => {
  Book.find() // récupère tous les modèles de books de la base de données
    .then(books => {
      res.send(books)
    }).catch(err => {
      res.status(500).send({
        message: err.message
      })
    })
}

// Find a single book with a bookId
exports.findOne = (req, res) => {
  Book.findById(req.params.id) // récupère un modèle de book de la base de données
    .then(book => {
      if (!book) {
        return res.status(404).send({
          message: 'book not found with id' + req.params.id
        })
      }
      res.send(book)
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'book not found with id' + req.params.id
        })
      }
      return res.status(500).send({
        message: 'Error retrieving book with id' + req.params.id
      })
    })
}

// Update a book identified by the bookId in the request
exports.update = (req, res) => {
  // Find book and update it with the request body
  Book.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    author: req.body.author,
    type: req.body.type
  }, {
    new: true
  })
    .then(book => {
      if (!book) {
        return res.status(404).send({
          message: 'book not found with id' + req.params.id
        })
      }
      res.send(book)
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'book not found with id' + req.params.id
        })
      }
      return res.status(500).send({
        message: 'Error updating book with id' + req.params.id
      })
    })
}

// Delete a book with the specified bookId in the request
exports.delete = (req, res) => {
  console.log('delete')
  Book.findByIdAndRemove(req.params.id)
    .then(book => {
      if (!book) {
        return res.status(404).send({
          message: 'book not found with id' + req.params.id
        })
      }
      res.send({
        message: 'book deleted successfully!'
      })
    }).catch(err => {
      if (err.kind === 'ObjectId' || err.title === 'NotFound') {
        return res.status(404).send({
          message: 'book not found with id' + req.params.id
        })
      }
      return res.status(500).send({
        message: 'Could not delete book with id' + req.params.id
      })
    })
}
