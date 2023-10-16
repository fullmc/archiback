const mongoose = require('mongoose'); 

const userSchema = new mongoose.Schema({
   email: { type: String, required: true, unique: true},
   password: { type: String, required: true},
   userId: { type: String, required: true},
});

module.exports = mongoose.model('auth', userSchema);