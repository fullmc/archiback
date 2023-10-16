const express = require('express');
const PKM = require('../models/pkm');

//Create and save a new pkm
exports.create = (req, res) => {
  const postPkm = req.body; // on récupère le body de la requête 

  const pkm = new PKM({
    name: postPkm.name,
    type: postPkm.type,
    level: postPkm.level,
  }); 
  pkm.save() // sauvegarde le pkm dans la base de données
    .then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
};

// Retrieve and return all pkms from the database.
exports.findAll = (req, res) => {
  PKM.find() // récupère tous les modèles de pkms de la base de données
    .then(pkms => {
      res.send(pkms);
    }).catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
};

// Find a single pkm with a pkmId
exports.findOne = (req, res) => {
  PKM.findById(req.params.id) // récupère un modèle de pkm de la base de données
    .then(pkm => {
      if (!pkm) {
        return res.status(404).send({
          message: "pkm not found with id " + req.params.id
        });
      }
      res.send(pkm);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "pkm not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Error retrieving pkm with id " + req.params.id
      });
    });
};

// Update a pkm identified by the pkmId in the request
exports.update = (req, res) => {
  // Find pkm and update it with the request body
  PKM.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    type: req.body.type,
    level: req.body.level,
  }, {
    new: true
  })
    .then(pkm => {
      if (!pkm) {
        return res.status(404).send({
          message: "pkm not found with id " + req.params.id
        });
      }
      res.send(pkm);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "pkm not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Error updating pkm with id " + req.params.id
      });
    });
}

// Delete a pkm with the specified pkmId in the request
exports.delete = (req, res) => {
  console.log("delete");
  PKM.findByIdAndRemove(req.params.id)
    .then(pkm => {
      if (!pkm) {
        return res.status(404).send({
          message: "pkm not found with id " + req.params.id
        });
      }
      res.send({
        message: "pkm deleted successfully!"
      });
    }).catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: "pkm not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Could not delete pkm with id " + req.params.id
      });
    });
}
