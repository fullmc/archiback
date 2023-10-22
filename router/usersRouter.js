const express = require('express')
const router = express.Router()
const user = require('../controllers/users')
const auth = require('../middleware/auth')

router.post('/', user.create) // Create a new auth
router.get('/', user.findAll)// Retrieve all auths
router.delete('/:id', auth, user.delete)
router.post('/login', user.login)
router.post('/logout', user.logout)
router.delete('/', auth, user.deleteAll)
// router.put('/:id', user.update);
// router.get('/:id', auth ,user.findOne);

module.exports = router
