const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = (req, res, next) => {
  try { // attention à l'indentation ici ! sinon ça passe pas
    const token = req.headers.authorization.split(' ')[1]; // on récupère le token dans le header de la requête
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // on le décode
    User.findById(decodedToken.userId) // on récupère l'id utilisateur
    .then(() => {
      next();
    }).catch((error) => {
      res.status(401).send({
        error: "caca"
      });
    });
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
}
