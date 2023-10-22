const USER = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.create = (req, res) => {
  const user = req.body; // on récupère le body de la requête 

  const authentification = new USER({
    email: user.email,
    password: user.password,
  }); 

  // crypter le mot de passe jwt
  bcrypt.hash(authentification.password, 10) // on utilise bcrypt pour hasher le mot de passe 
    .then(hash => {
      authentification.password = hash; // on remplace le mot de passe par le hash directement après l'avoir reçu
      authentification.save() // on sauvegarde le user dans la base de données dès que le mot de passe est hashé
        .then(data => {
          res.send(data);
        }).catch(err => {
          res.status(500).send({
            message: err.message
          });
        });
    }
    ).catch(err => {
      res.status(500).send({
        message: err.message
      });
    }
    );
};

exports.findAll = (req, res) => {
  USER.find() // récupère tous les users
    .then(USERS => {
      res.send(USERS);
    }).catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
};

exports.delete = (req, res) => {
  USER.findByIdAndRemove(req.params.id)
    .then(USER => {
      if (!USER) {
        return res.status(404).send({
          message: "user not found with id " + req.params.id
        });
      }
      res.send({
        message: "user deleted successfully!"
      });
    }).catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: "user not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Could not delete user with id " + req.params.id
      });
    });
}

// on exporte la fonction login qui va permettre de connecter un utilisateur existant
exports.login = (req, res, next) => {
  // on cherche l'utilisateur dans la base de données
  USER.findOne({ email: req.body.email })
      .then(user => {
          if (!user) {
              return res.status(401).json({ error: 'Utilisateur non trouvé !' });
          }
          
          // on vérifie le mot de passe en comparant le hash de la base de données avec celui de la requête
          bcrypt.compare(req.body.password, user.password) 
              .then(valid => {
                  if (!valid) {
                      return res.status(401).json({ error: 'Mot de passe incorrect !' });
                  } 
                  // si le mot de passe est bon, on renvoie un objet JSON avec un userId et un token
              })
                  const token = jwt.sign({ userId: user._id }, 'TOKEN',{ expiresIn: '24h' })
                  res.cookie('TOKEN', token, { maxAge: 900000, httpOnly: true, Secure: true, });
                  res.status(200).json({
                    userId: user._id,
                    token: token, // on envoie le token dans un cookie, maxAge est le temps de validité du cookies
                })

      }).catch(error => res.status(500).json({ error }));
};

exports.logout = (req, res) => {
  res.status(200).clearCookie('TOKEN').json({ message: "Déconnexion réussie" });
};