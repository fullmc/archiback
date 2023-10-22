const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = (req, res, next) => {
  try { // attention à l'indentation ici ! sinon ça passe pas
    const token = req.headers.cookie.split('=')[1]; // on récupère le token dans les cookies
    const decodedToken = jwt.verify(token, 'TOKEN'); // on le décode
    User.findById(decodedToken.userId) // on récupère l'id utilisateur
    .then(() => {
      next();
    }).catch((error) => {
      res.status(401).send({
        error: error
      });
    });
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
}

