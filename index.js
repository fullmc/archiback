// init server express
const express = require('express');
const app = express();
const port = 3000;

// init mongoose
const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://mc:Devinci2023@cluster0.wfrhh43.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB !')) // 'then' = quand ça marche
    .catch(err => console.error(err + 'Could not connect to MongoDB ')); // 'catch'np = quand ça marche pas

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

