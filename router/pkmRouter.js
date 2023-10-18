const express = require('express');
const router = express.Router();
const pkmController = require('../controllers/pkmController');
const auth = require('../middleware/auth');

// Create a new pkm
router.post('/',auth, pkmController.create); // Create a new pkm
router.get('/', pkmController.findAll); // Retrieve all pkms
router.get('/:id', pkmController.findOne); // Retrieve a single pkm with id
router.put('/:id', pkmController.update); // update a pkm with id
router.delete('/:id', pkmController.delete); // delete a pkm with id

module.exports = router;