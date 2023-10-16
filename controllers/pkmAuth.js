const auth = require('../models/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.create = (req, res) => {
  const user = req.body; // on récupère le body de la requête 

  const authentification = new auth({
    email: user.email,
    password: user.password,
  }); 
  // crypter le mot de passe jwt

  bcrypt.hash(authentification.password, 10)
    .then(hash => {
      authentification.password = hash;
      console.log(hash);
      console.log(authentification);
      authentification.save() // sauvegarde le pkm dans la base de données
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
  auth.find() // récupère tous les modèles de pkms de la base de données
    .then(auths => {
      res.send(auths);
    }).catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
};

exports.delete = (req, res) => {
  console.log("delete");
  auth.findByIdAndRemove(req.params.id)
    .then(auth => {
      if (!auth) {
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
  auth.findOne({ email: req.body.email })
      .then(user => {
          if (!user) {
              return res.status(401).json({ error: 'Utilisateur non trouvé !' });
          }
          console.log("BODY", req.body);
          console.log("user", user);

          bcrypt.compare(req.body.password, user.password) // on compare le mot de passe entré avec le hash enregistré dans la base de données
              .then(valid => {
                console.log("valid", valid);
                  if (!valid) {
                      return res.status(401).json({ error: 'Mot de passe incorrect !' });
                  }
                  res.status(200).json({ // si le mot de passe est bon, on renvoie un objet JSON avec un userId et un token
                      userId: user._id,
                      token: jwt.sign(
                          { userId: user._id },
                          'RANDOM_TOKEN_SECRET',
                          { expiresIn: '24h' }
                      )
                  });
              })
              .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};

