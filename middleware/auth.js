const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.Authorization; // on récupère le token dans le header de la requête
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // on le décode
    const userId = decodedToken.userId; // on récupère l'id utilisateur
    if (req.body.userId && req.body.userId !== userId) { // si l'id utilisateur est différent de celui du token
      throw 'Invalid user ID';
    } else {
      next(); // sinon on passe au prochain middleware
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
}