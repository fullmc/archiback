const mongoose = require('mongoose'); 

const BooksSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true},
    author: { type: String, required: true, unique: false},
    type: { type: String, required: true, unique: false},
});


module.exports = mongoose.model('Books', BooksSchema);
