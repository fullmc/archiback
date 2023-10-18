const express = require('express');
const router = express.Router();
const userAuth = require('../controllers/userAuth');
const auth = require('../middleware/auth');

router.post('/',auth, userAuth.create); // Create a new auth
router.get('/', userAuth.findAll); // Retrieve all auths
router.delete('/:id',userAuth.delete);
router.post('/login', userAuth.login);
// router.put('/:id', userAuth.update);
// router.get('/:id', auth ,userAuth.findOne);

module.exports = router;