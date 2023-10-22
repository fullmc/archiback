const express = require('express')
const router = express.Router()
const bookController = require('../controllers/bookController')
const auth = require('../middleware/auth')

// Create a new book
router.post('/', auth, bookController.create) // Create a new book
router.get('/', bookController.findAll) // Retrieve all books
router.get('/:id', bookController.findOne) // Retrieve a single book with id
router.put('/:id', auth, bookController.update) // update a book with id
router.delete('/:id', auth, bookController.delete) // delete a book with id
router.delete('/', auth, bookController.deleteAll) // delete all books

module.exports = router
