const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const auth = require('../middleware/auth');

// Create a new book
router.post('/',auth, bookController.create); // Create a new book
router.get('/', bookController.findAll); // Retrieve all books
router.get('/:id', bookController.findOne); // Retrieve a single book with id
router.put('/:id', bookController.update); // update a book with id
router.delete('/:id', bookController.delete); // delete a book with id

module.exports = router;