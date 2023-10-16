const express = require('express');
const router = express.Router();
const pkmAuth = require('../controllers/pkmAuth');

// Create a new auth
router.post('/', pkmAuth.create); // Create a new auth
router.get('/', pkmAuth.findAll); // Retrieve all auths
router.delete('/:id', pkmAuth.delete);
router.post('/login', pkmAuth.login);
// router.get('/:id', auth ,pkmAuth.findOne);

module.exports = router;