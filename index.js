// init server express
const express = require('express');
const app = express();
const port = 3000;
const pkmRouter = require('./router/pkmRouter');
const authRouter = require('./router/authRouter');
const jwt = require('jsonwebtoken');
// init mongoose
const mongoose = require('mongoose');

// Connection à la base de données
mongoose.connect('mongodb+srv://mc:Devinci2023@cluster0.wfrhh43.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB !')) // 'then' = quand ça marche
    .catch(err => console.error(err + 'Could not connect to MongoDB ')); // 'catch'np = quand ça marche pas

// init cors
const cors = require('cors');
app.use(cors());

// init body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//router sur lequel il va afficher les infos
app.use('/pkm', pkmRouter);
app.use('/auth', authRouter);

// init server
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// app.get('/token', function(req, res){
//   const token = jwt.sign({username:'ado'}, 'supersecret',{expiresIn: 120});
//   res.send(token)
// })

// app.get('/', function(req, res){
//   var token = req.query.token;
//   jwt.verify(token, 'supersecret', function(err, decoded){
//     if(!err){
//       var secrets = {'accountNumber' : '938291239','pin' : '11289','account' : 'Finance'};
//       res.json(secrets);
//     } else {
//       res.send(err);
//     }
//   })
// })

// listen server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

