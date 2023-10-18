const mongoose = require('mongoose'); 

const BooksSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true},
    author: { type: String, required: true, unique: true},
    type: { type: String, required: true,},
});


module.exports = mongoose.model('Books', BooksSchema);
